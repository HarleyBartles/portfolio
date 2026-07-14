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

$arguments = @($PythonScript)
if ($AllowSharedCheckout) { $arguments += '--allow-shared-checkout' }

& py -3 @arguments
exit $LASTEXITCODE
