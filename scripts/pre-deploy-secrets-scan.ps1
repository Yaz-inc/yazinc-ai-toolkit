# Pre-deploy secrets scan - deploy-secrets-zero-exposure skill
# Usage: powershell -File pre-deploy-secrets-scan.ps1 [-Path .] [-Strict]
param(
    [string]$Path = ".",
    [switch]$Strict
)

$ErrorActionPreference = "SilentlyContinue"
$root = (Resolve-Path $Path).Path
$critical = @()
$warning = @()

Write-Host "`n=== Pre-deploy secrets scan ===" -ForegroundColor Cyan
Write-Host "Root: $root`n"

# 1. Git tracked paths that must never ship
$tracked = git -C $root ls-files 2>$null
if ($tracked) {
    $criticalPatterns = @(
        '^\.env$',
        '^\.env\.(?!example)',
        'key\.git',
        'github_pat',
        '^_deploy/',
        '^public/fix\.php$',
        '\.pem$',
        '^id_rsa'
    )
    $warningPatterns = @(
        '\.env\.example$',
        '\.sql$',
        'Sample.*\.sql$'
    )
    foreach ($f in $tracked) {
        foreach ($p in $criticalPatterns) {
            if ($f -match $p) { $critical += "TRACKED SECRET PATH: $f"; break }
        }
        foreach ($p in $warningPatterns) {
            if ($f -match $p) { $warning += "TRACKED SENSITIVE FILE (review): $f"; break }
        }
    }
}

# 2. PAT in git remote
$remotes = git -C $root remote -v 2>$null
if ($remotes -match 'github_pat_|ghp_|gho_|x-access-token:[^@]+@') {
    $critical += "PAT OR TOKEN IN GIT REMOTE URL - run: git remote set-url origin https://github.com/ORG/REPO.git"
}

# 3. High-confidence secret patterns in deploy-facing folders only
$highConfidence = @(
    'github_pat_[a-zA-Z0-9_]{20,}',
    'ghp_[a-zA-Z0-9]{20,}',
    'gho_[a-zA-Z0-9]{20,}',
    'sk-[a-zA-Z0-9]{20,}',
    'AKIA[0-9A-Z]{16}',
    '(?i)(api[_-]?key|secret[_-]?key|access[_-]?token)\s*=\s*[''"][a-zA-Z0-9_\-]{20,}[''"]',
    '(?i)Bearer\s+[a-zA-Z0-9_\-\.]{30,}'
)

function Test-GitIgnored([string]$filePath) {
    $gitPath = $filePath -replace '\\', '/'
    $null = git -C $root check-ignore -q $gitPath 2>$null
    return ($LASTEXITCODE -eq 0)
}

$scanDirs = @('public', 'resources/js', 'resources/css', 'src', 'dist', 'out', '.next/static')
$skipPathRegex = '\\(vendor|node_modules|\.git|docs|documentation)\\'

foreach ($dir in $scanDirs) {
    $full = Join-Path $root $dir
    if (-not (Test-Path $full)) { continue }
    Get-ChildItem -Path $full -Recurse -File -ErrorAction SilentlyContinue |
        Where-Object { $_.FullName -notmatch $skipPathRegex -and $_.Extension -notmatch '\.(png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot|svg|map)$' } |
        ForEach-Object {
            $content = Get-Content $_.FullName -Raw -ErrorAction SilentlyContinue
            if (-not $content) { return }
            foreach ($pat in $highConfidence) {
                if ($content -match $pat) {
                    $rel = $_.FullName.Substring($root.Length + 1)
                    if (Test-GitIgnored $rel) {
                        $warning += "GITIGNORED FILE IN SCAN PATH (ok local, do not upload): $rel"
                    } elseif ($rel -match '\.example$|\.sample$|fix\.php\.example$') {
                        $warning += "POSSIBLE SECRET IN EXAMPLE FILE: $rel"
                    } else {
                        $critical += "HIGH-CONFIDENCE SECRET PATTERN: $rel"
                    }
                    break
                }
            }
        }
}

# 4. .env in public
Get-ChildItem -Path (Join-Path $root 'public') -Filter '.env*' -ErrorAction SilentlyContinue |
    ForEach-Object {
        if ($_.Name -eq '.env.example') {
            $warning += "ENV TEMPLATE IN PUBLIC: $($_.Name) - consider moving or blocking"
        } else {
            $critical += ".ENV IN PUBLIC FOLDER: $($_.Name)"
        }
    }

# 5. .git under public
if (Test-Path (Join-Path $root 'public\.git')) {
    $critical += ".GIT DIRECTORY INSIDE public/ - catastrophic misconfiguration"
}

# Report
function Write-Findings($items, $color, $label) {
    if ($items.Count -eq 0) {
        Write-Host "${label}: none" -ForegroundColor Green
    } else {
        Write-Host "${label}: $($items.Count)" -ForegroundColor $color
        $items | ForEach-Object { Write-Host "  - $_" -ForegroundColor $color }
    }
}

Write-Findings $critical 'Red' 'CRITICAL'
Write-Findings $warning 'Yellow' 'WARNING'

if ($Strict -and $warning.Count -gt 0) {
    Write-Host "`nStrict mode: warnings treated as failures." -ForegroundColor Yellow
    exit 1
}

Write-Host ""
if ($critical.Count -gt 0) {
    Write-Host "RESULT: FAIL - fix Critical items before deploy." -ForegroundColor Red
    exit 1
} else {
    Write-Host "RESULT: PASS (run post-deploy 404 checks on live domain)." -ForegroundColor Green
    if ($warning.Count -gt 0) {
        Write-Host "Review WARNING items before deploy." -ForegroundColor Yellow
    }
    exit 0
}
