# PowerShell script to copy PP Editorial New font files
# Run this script from the bdayapp directory

Write-Host "Copying PP Editorial New font files..." -ForegroundColor Green

# Define source and destination paths
$sourceDir = "..\editorial-new-font-family-1751275712-0"
$destDir = "public\fonts"

# Check if source directory exists
if (Test-Path $sourceDir) {
    # Copy all .otf files
    Copy-Item "$sourceDir\*.otf" $destDir -Force
    Write-Host "Font files copied successfully!" -ForegroundColor Green
    Write-Host "Files in $destDir:" -ForegroundColor Yellow
    Get-ChildItem $destDir -Name "*.otf"
} else {
    Write-Host "Source directory not found: $sourceDir" -ForegroundColor Red
    Write-Host "Please make sure the font files are in the correct location." -ForegroundColor Yellow
} 