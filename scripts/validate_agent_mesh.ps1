<#
.SYNOPSIS
  Validate that doctrine documents are referenced from the agents mesh.

.DESCRIPTION
  Thin PowerShell wrapper around validate_agent_mesh.py.

.PARAMETER Check
  Validate without writing.

.EXAMPLE
  .\scripts\validate_agent_mesh.ps1
  .\scripts\validate_agent_mesh.ps1 -Check
#>
[CmdletBinding()]
param(
    [switch]$Check
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$ScriptDir = (Resolve-Path $PSScriptRoot).Path
$PythonScript = Join-Path $ScriptDir 'validate_agent_mesh.py'

if (-not (Test-Path $PythonScript)) {
    throw "Python script not found at $PythonScript"
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
