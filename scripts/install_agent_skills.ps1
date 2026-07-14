<#
.SYNOPSIS
  Install or validate repo-local skills from the marketplace source.

.PARAMETER Check
  Validate the derived skills without writing.

.PARAMETER Force
  Recopy selected skills even if they already exist.
#>
[CmdletBinding()]
param(
    [switch]$Check,
    [switch]$Force
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$ScriptDir = (Resolve-Path $PSScriptRoot).Path
$PythonScript = Join-Path $ScriptDir 'install_agent_skills.py'

if (-not (Test-Path $PythonScript)) {
    throw "Installer script not found at $PythonScript"
}

$arguments = @($PythonScript)
if ($Check) { $arguments += '--check' }
if ($Force) { $arguments += '--force' }

& py -3 @arguments
exit $LASTEXITCODE
