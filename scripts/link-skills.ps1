param(
    [switch]$Force
)

$ErrorActionPreference = 'Stop'
$installer = Join-Path $PSScriptRoot 'install-toolkit.ps1'

Write-Warning 'link-skills.ps1 is retained for compatibility. The universal installer is now recommended.'
& $installer -Target cursor -Scope user -Force:$Force
exit $LASTEXITCODE
