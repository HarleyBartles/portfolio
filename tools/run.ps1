#Requires -Version 5.1
$ErrorActionPreference = 'Stop'

$RepoRoot = Split-Path -Parent $PSScriptRoot

$python = $null
$pythonArgs = @()
if (Get-Command py -ErrorAction SilentlyContinue) {
    $python = 'py'
    $pythonArgs += '-3'
} elseif (Get-Command python -ErrorAction SilentlyContinue) {
    $python = 'python'
} elseif (Get-Command python3 -ErrorAction SilentlyContinue) {
    $python = 'python3'
} else {
    throw 'No Python interpreter found'
}

$RunPy = Join-Path -Path (Join-Path -Path $RepoRoot -ChildPath 'tools') -ChildPath 'run.py'
& $python @($pythonArgs + $RunPy) @args
exit $LASTEXITCODE
