<#
.SYNOPSIS
  Run the repository preflight checks for local and CI use.

.DESCRIPTION
  Runs the refresh contract check and the doctrine mesh validator.

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

if (-not (Test-Path $refreshScript)) {
    throw "Refresh script not found at $refreshScript"
}
if (-not (Test-Path $doctrineScript)) {
    throw "Doctrine validator not found at $doctrineScript"
}

& $refreshScript -Check:$Check
if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
}

& $doctrineScript -Check:$Check
exit $LASTEXITCODE
