<#
.SYNOPSIS
  Run the repository preflight checks for local and CI use.

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

$meshScript = Join-Path $ScriptDir 'generate_index_mesh.ps1'
$doctrineScript = Join-Path $ScriptDir 'validate_agent_mesh.ps1'

if (-not (Test-Path $meshScript)) {
    throw "Mesh script not found at $meshScript"
}
if (-not (Test-Path $doctrineScript)) {
    throw "Doctrine validator not found at $doctrineScript"
}

& $meshScript -Check:$Check
if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
}

& $doctrineScript -Check:$Check
exit $LASTEXITCODE
