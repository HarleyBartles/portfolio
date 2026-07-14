<#
.SYNOPSIS
  Run the repository preflight checks for local and CI use.

.DESCRIPTION
  Runs the index mesh check, the marketplace skill installer check, and the doctrine mesh validator.

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
$RepoRoot = (Resolve-Path (Join-Path $ScriptDir '..')).Path

$meshScript = Join-Path $ScriptDir 'generate_index_mesh.ps1'
$skillsScript = Join-Path $ScriptDir 'install_agent_skills.ps1'
$doctrineScript = Join-Path $ScriptDir 'validate_agent_mesh.ps1'
$marketplaceSource = Join-Path $RepoRoot '.agents\plugins\marketplace-source'

if (-not (Test-Path $meshScript)) {
    throw "Mesh script not found at $meshScript"
}
if (-not (Test-Path $skillsScript)) {
    throw "Skill installer script not found at $skillsScript"
}
if (-not (Test-Path $doctrineScript)) {
    throw "Doctrine validator not found at $doctrineScript"
}

& $meshScript -Check:$Check
if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
}

if (Test-Path (Join-Path $marketplaceSource '.git')) {
    & $skillsScript -Check:$Check
    if ($LASTEXITCODE -ne 0) {
        exit $LASTEXITCODE
    }
} elseif ($env:GITHUB_ACTIONS -eq 'true') {
    Write-Host 'Skipping marketplace skill installer check in GitHub Actions because the private marketplace submodule is not available in this checkout.'
} else {
    throw "Marketplace source checkout not found at $marketplaceSource"
}

& $doctrineScript -Check:$Check
exit $LASTEXITCODE
