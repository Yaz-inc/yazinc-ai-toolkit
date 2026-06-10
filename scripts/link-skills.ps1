param(
    [string]$ToolkitRoot = $PSScriptRoot + '\..'
)

$ErrorActionPreference = 'Stop'
$ToolkitRoot = (Resolve-Path $ToolkitRoot).Path
$skillsSrc = Join-Path $ToolkitRoot 'skills'
$cursorSkills = Join-Path $env:USERPROFILE '.cursor\skills\yazinc-ai-toolkit'

if (-not (Test-Path $skillsSrc)) {
    Write-Host "FAIL: skills folder not found at $skillsSrc" -ForegroundColor Red
    exit 1
}

New-Item -ItemType Directory -Path (Split-Path $cursorSkills -Parent) -Force | Out-Null

if (Test-Path $cursorSkills) {
    Remove-Item $cursorSkills -Force -Recurse -ErrorAction SilentlyContinue
}

New-Item -ItemType SymbolicLink -Path $cursorSkills -Target $skillsSrc -Force | Out-Null
Write-Host "Linked:" -ForegroundColor Green
Write-Host "  $cursorSkills"
Write-Host "    -> $skillsSrc"
Write-Host ""
Write-Host "Restart Cursor or open a new chat to pick up skills." -ForegroundColor Cyan
