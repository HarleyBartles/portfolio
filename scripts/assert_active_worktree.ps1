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
$python = Join-Path $ScriptDir 'assert_active_worktree.py'

if (-not (Test-Path $python)) {
    throw "Worktree guard script not found at $python"
}

$args = @()
if ($AllowSharedCheckout) { $args += '--allow-shared-checkout' }

& py -3 $python @args
exit $LASTEXITCODE
