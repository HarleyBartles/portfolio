<#
.SYNOPSIS
  Refresh deterministic repo surfaces that agent workflows depend on.

.PARAMETER Check
  Validate without writing.
#>
[CmdletBinding()]
param(
    [switch]$Check
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$ScriptDir = (Resolve-Path $PSScriptRoot).Path
$PythonScript = Join-Path $ScriptDir 'refresh_agent_surfaces.py'

if (-not (Test-Path $PythonScript)) {
    throw "Refresh script not found at $PythonScript"
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
if ($Check) {
    $arguments += '--check'
}

if ($pythonLauncher -eq 'py') {
    & $pythonLauncher -3 @arguments
} else {
    & $pythonLauncher @arguments
}
exit $LASTEXITCODE
