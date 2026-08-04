# Push one validated branch to two configured Git remotes.
# Authenticate through Git Credential Manager, GitHub CLI, SSH, or another approved credential store.

param(
    [string]$Branch = 'main',
    [string]$Tag = '',
    [string[]]$Remote = @('origin', 'client')
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path $PSScriptRoot -Parent
Set-Location $projectRoot

foreach ($remoteName in $Remote) {
    $remoteUrl = git remote get-url $remoteName 2>$null
    if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($remoteUrl)) {
        throw "Git remote is not configured: $remoteName"
    }
    if ($remoteUrl -match '^https://[^/@]+@') {
        throw "Remote $remoteName contains embedded credentials. Replace it with a clean HTTPS or SSH URL before pushing."
    }
}

Write-Host 'Push targets verified:' -ForegroundColor Cyan
$Remote | ForEach-Object { Write-Host ("  - {0}" -f $_) }

foreach ($remoteName in $Remote) {
    Write-Host ("Pushing {0} to {1}" -f $Branch, $remoteName) -ForegroundColor Yellow
    git push $remoteName $Branch
    if ($LASTEXITCODE -ne 0) { throw "Push failed: $remoteName" }

    if (-not [string]::IsNullOrWhiteSpace($Tag)) {
        git push $remoteName $Tag
        if ($LASTEXITCODE -ne 0) { throw "Tag push failed: $remoteName" }
    }
}

Write-Host 'Both remotes updated.' -ForegroundColor Green
