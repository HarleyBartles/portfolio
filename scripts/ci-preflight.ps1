<#
.SYNOPSIS
  Run the repository readiness checks.

.DESCRIPTION
  Runs the index mesh check and the doctrine mesh validator.

.PARAMETER Check
  Run in validation mode without any write steps.

.EXAMPLE
  .\scripts\ci-preflight.ps1
  .\scripts\ci-preflight.ps1 -Check
#>
[CmdletBinding()]
param(
    [switch]$Check
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$ScriptDir = (Resolve-Path $PSScriptRoot).Path

$refreshScript = Join-Path $ScriptDir 'refresh_agent_surfaces.ps1'
$doctrineScript = Join-Path $ScriptDir 'validate_agent_mesh.ps1'
$pythonLaunchers = @('py', 'python', 'python3')
$pythonLauncher = $null

if (-not (Test-Path $refreshScript)) {
    throw "Refresh script not found at $refreshScript"
}
if (-not (Test-Path $doctrineScript)) {
    throw "Doctrine validator not found at $doctrineScript"
}

foreach ($launcher in $pythonLaunchers) {
    try {
        $null = Get-Command $launcher -ErrorAction Stop
        $pythonLauncher = $launcher
        break
    } catch {
        # try next launcher
    }
}

if (-not $pythonLauncher) {
    throw "No Python launcher found. Tried: $($pythonLaunchers -join ', ')."
}

& $refreshScript -Check:$Check
if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
}

& $doctrineScript -Check:$Check
if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
}

if ($pythonLauncher -eq 'py') {
    & $pythonLauncher -3 -m unittest discover -s tests -v
} else {
    & $pythonLauncher -m unittest discover -s tests -v
}

exit $LASTEXITCODE
