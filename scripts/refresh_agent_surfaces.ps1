<#
.SYNOPSIS
  Refresh or validate the deterministic agent-facing repo surfaces.

.PARAMETER Check
  Validate the deterministic surfaces without writing.
#>
[CmdletBinding()]
param(
    [switch]$Check,
    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]]$Arguments
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$ScriptDir = (Resolve-Path $PSScriptRoot).Path
$PythonScript = Join-Path $ScriptDir 'refresh_agent_surfaces.py'

if (-not (Test-Path $PythonScript)) {
    throw "Python script not found at $PythonScript"
}

$commandArgs = @($PythonScript)
if ($Check) {
    $commandArgs += '--check'
}
if ($Arguments) {
    $commandArgs += $Arguments
}

& py -3 @commandArgs
exit $LASTEXITCODE
