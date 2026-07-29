$git = "C:\Users\ASUS\mingit\cmd\git.exe"

Set-Location -Path "d:\abhishek"

Write-Host "Adding updated files..."
& $git add .

Write-Host "Committing updates..."
& $git commit -m "Retheme entire website to SEOWINS electric blue dark theme"

Write-Host "Pushing to GitHub..."
& $git push origin main

Write-Host "GitHub Push Complete!"
