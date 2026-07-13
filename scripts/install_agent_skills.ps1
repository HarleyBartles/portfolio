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
$python = Join-Path $ScriptDir 'install_agent_skills.py'

if (-not (Test-Path $python)) {
    throw "Installer script not found at $python"
}

$args = @()
if ($Check) { $args += '--check' }
if ($Force) { $args += '--force' }

& py -3 $python @args
exit $LASTEXITCODE
