[CmdletBinding()]
param(
    [ValidateSet('all', 'codex', 'cursor', 'claude', 'antigravity')]
    [string[]]$Target = @('all'),

    [ValidateSet('user', 'project')]
    [string]$Scope = 'user',

    [string]$ProjectPath = (Get-Location).Path,

    [switch]$Force
)

$ErrorActionPreference = 'Stop'

$toolkitRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$sourceRoot = Join-Path $toolkitRoot 'skills'
$profileRoot = [Environment]::GetFolderPath('UserProfile')

if (-not (Test-Path -LiteralPath $sourceRoot -PathType Container)) {
    throw "Toolkit skills directory was not found: $sourceRoot"
}

if ([string]::IsNullOrWhiteSpace($profileRoot)) {
    throw 'The current user profile directory could not be resolved.'
}

$platforms = if ($Target -contains 'all') {
    @('codex', 'cursor', 'claude', 'antigravity')
} else {
    @($Target | Select-Object -Unique)
}

if ($Scope -eq 'project') {
    $resolvedProject = (Resolve-Path -LiteralPath $ProjectPath).Path
}

$destinations = [ordered]@{}
foreach ($platform in $platforms) {
    if ($Scope -eq 'project') {
        $destination = if ($platform -eq 'claude') {
            Join-Path $resolvedProject '.claude\skills'
        } else {
            Join-Path $resolvedProject '.agents\skills'
        }
    } else {
        switch ($platform) {
            'claude' { $destination = Join-Path $profileRoot '.claude\skills' }
            'antigravity' { $destination = Join-Path $profileRoot '.gemini\config\skills' }
            default { $destination = Join-Path $profileRoot '.agents\skills' }
        }
    }

    $destinationKey = $destination.ToLowerInvariant()
    if (-not $destinations.Contains($destinationKey)) {
        $destinations[$destinationKey] = [pscustomobject]@{
            Path = $destination
            Platforms = [System.Collections.Generic.List[string]]::new()
        }
    }
    $destinations[$destinationKey].Platforms.Add($platform)
}

$skills = @(Get-ChildItem -LiteralPath $sourceRoot -Directory | Where-Object { $_.Name -ne '_template' } | Sort-Object Name)
if ($skills.Count -eq 0) {
    throw 'No installable skills were found.'
}

$installed = 0
$updated = 0
$skipped = [System.Collections.Generic.List[string]]::new()

foreach ($destinationEntry in $destinations.Values) {
    $destinationRoot = $destinationEntry.Path
    New-Item -ItemType Directory -Path $destinationRoot -Force | Out-Null

    Write-Host ''
    Write-Host ("Installing for {0}" -f ($destinationEntry.Platforms -join ', ')) -ForegroundColor Cyan
    Write-Host ("  {0}" -f $destinationRoot)

    foreach ($skill in $skills) {
        $skillDestination = Join-Path $destinationRoot $skill.Name
        $marker = Join-Path $skillDestination '.yazinc-toolkit-managed'
        $alreadyExists = Test-Path -LiteralPath $skillDestination

        if ($alreadyExists -and -not (Test-Path -LiteralPath $marker) -and -not $Force) {
            $skipped.Add("$($skill.Name) at $destinationRoot")
            continue
        }

        New-Item -ItemType Directory -Path $skillDestination -Force | Out-Null
        Copy-Item -Path (Join-Path $skill.FullName '*') -Destination $skillDestination -Recurse -Force
        Set-Content -LiteralPath $marker -Value 'Managed by Yazinc AI Toolkit. Rerun the installer after updating the repository.' -Encoding UTF8

        if ($alreadyExists) { $updated++ } else { $installed++ }
    }
}

Write-Host ''
Write-Host 'Yazinc AI Toolkit installation complete.' -ForegroundColor Green
Write-Host ("  Skills available: {0}" -f $skills.Count)
Write-Host ("  New copies:      {0}" -f $installed)
Write-Host ("  Updated copies:  {0}" -f $updated)
Write-Host ("  Skipped safely:  {0}" -f $skipped.Count)

if ($skipped.Count -gt 0) {
    Write-Host ''
    Write-Host 'Existing non-toolkit folders were not overwritten:' -ForegroundColor Yellow
    $skipped | ForEach-Object { Write-Host ("  - {0}" -f $_) }
    Write-Host 'Review them first, then rerun with -Force only if replacement is intended.' -ForegroundColor Yellow
}

Write-Host ''
Write-Host 'Open a new agent session, list available skills, then ask:' -ForegroundColor Cyan
Write-Host '  Use the test-software-app skill to audit this application before launch.'
