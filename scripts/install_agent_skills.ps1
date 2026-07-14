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

$pythonLaunchers = @('py', 'python', 'python3')
$pythonLauncher = $null

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

$arguments = @($PythonScript)
if ($Check) { $arguments += '--check' }
if ($Force) { $arguments += '--force' }

if ($pythonLauncher -eq 'py') {
    & $pythonLauncher -3 @arguments
} else {
    & $pythonLauncher @arguments
}
exit $LASTEXITCODE
