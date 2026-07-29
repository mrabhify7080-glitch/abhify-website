$dir = "C:\Users\ASUS\mingit"
if (-not (Test-Path $dir)) {
    New-Item -ItemType Directory -Path $dir -Force
}
$zip = "C:\Users\ASUS\mingit.zip"
Write-Host "Downloading MinGit..."
Invoke-WebRequest -Uri "https://github.com/git-for-windows/git/releases/download/v2.45.2.windows.1/MinGit-2.45.2-64-bit.zip" -OutFile $zip -UseBasicParsing
Expand-Archive -Path $zip -DestinationPath $dir -Force
Remove-Item $zip -Force
Write-Host "MinGit Ready at $dir"
