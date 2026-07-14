<#
.SYNOPSIS
  Assert that the current checkout is a linked worktree.

.PARAMETER AllowSharedCheckout
  Permit the shared checkout for intentional main-branch work.
#>
[CmdletBinding()]
param(
    [switch]$AllowSharedCheckout
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$ScriptDir = (Resolve-Path $PSScriptRoot).Path
$PythonScript = Join-Path $ScriptDir 'assert_active_worktree.py'

if (-not (Test-Path $PythonScript)) {
    throw "Worktree guard script not found at $PythonScript"
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
if ($AllowSharedCheckout) { $arguments += '--allow-shared-checkout' }

if ($pythonLauncher -eq 'py') {
    & $pythonLauncher -3 @arguments
} else {
    & $pythonLauncher @arguments
}
exit $LASTEXITCODE
