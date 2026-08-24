[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [string]$Pptx,
  [Parameter(Mandatory = $true)]
  [string]$OutputDirectory
)

$ErrorActionPreference = 'Stop'
$Pptx = [System.IO.Path]::GetFullPath($Pptx)
$OutputDirectory = [System.IO.Path]::GetFullPath($OutputDirectory)
[System.IO.Directory]::CreateDirectory($OutputDirectory) | Out-Null

$application = $null
$presentation = $null
try {
  $application = New-Object -ComObject PowerPoint.Application
  $presentation = $application.Presentations.Open($Pptx, $true, $false, $false)
  foreach ($slide in @(2, 4, 14)) {
    $rendered = Join-Path $OutputDirectory "slide-$slide.png"
    $presentation.Slides.Item($slide).Export($rendered, 'PNG', 1600, 900)
    if (-not (Test-Path -LiteralPath $rendered -PathType Leaf)) {
      throw "PowerPoint did not render Club DB slide $slide."
    }
  }
} finally {
  if ($null -ne $presentation) {
    $presentation.Close()
    [void][System.Runtime.InteropServices.Marshal]::FinalReleaseComObject($presentation)
  }
  if ($null -ne $application) {
    $application.Quit()
    [void][System.Runtime.InteropServices.Marshal]::FinalReleaseComObject($application)
  }
}
