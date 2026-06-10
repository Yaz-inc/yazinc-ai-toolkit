# Push to both GitHub remotes (dev + client)
# Copy to your project as scripts/push-both-repos.ps1 and customize $DevRepo / $ClientRepo.

param(
    [string]$Branch = 'main',
    [string]$Tag = ''
)

$ErrorActionPreference = 'Stop'

# --- Customize per project ---
$DevRepo    = 'github.com/YOUR-ORG/your-app-dev.git'
$ClientRepo = 'github.com/CLIENT-ORG/your-app.git'
# Client repo URL can also be read from _deploy/key.git.md "Repo:" line

$root = Split-Path $PSScriptRoot -Parent
$keyFile = Join-Path $root '_deploy\key.git.md'

Set-Location $root

$devToken = $null
$clientToken = $null

if (Test-Path $keyFile) {
    $patLines = Get-Content $keyFile | Where-Object { $_ -match 'github_pat_\S+' }
    if ($patLines.Count -ge 1) { $devToken = ($patLines[0] -replace '.*?(github_pat_\S+).*', '$1') }
    if ($patLines.Count -ge 2) { $clientToken = ($patLines[-1] -replace '.*?(github_pat_\S+).*', '$1') }
    $repoLine = Get-Content $keyFile | Where-Object { $_ -match '^\s*Repo:\s*(\S+)' } | Select-Object -First 1
    if ($repoLine -match 'Repo:\s*(\S+)') {
        $url = $Matches[1].TrimEnd('/')
        $ClientRepo = ($url -replace '^https?://', '')
        if ($ClientRepo -notmatch '\.git$') { $ClientRepo += '.git' }
    }
}

if (-not $devToken -or -not $clientToken) {
    Write-Host 'FAIL: Need two PATs in _deploy/key.git.md (dev + client)' -ForegroundColor Red
    exit 1
}

$repos = @(
    @{ Name = 'origin (dev)';    Url = "https://${devToken}@${DevRepo}" },
    @{ Name = 'client (official)'; Url = "https://${clientToken}@${ClientRepo}" }
)

Write-Host "=== Push to both GitHub repos ===" -ForegroundColor Cyan
Write-Host "Branch: $Branch"

foreach ($repo in $repos) {
    Write-Host "Pushing $($repo.Name) ..." -ForegroundColor Yellow
    git push $repo.Url $Branch
    if ($LASTEXITCODE -ne 0) { exit 1 }
    Write-Host "OK   $($repo.Name)" -ForegroundColor Green
    if ($Tag) {
        git push $repo.Url $Tag
        if ($LASTEXITCODE -ne 0) { exit 1 }
    }
}

Write-Host 'Done.' -ForegroundColor Green
