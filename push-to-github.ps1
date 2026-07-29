$git = "C:\Users\ASUS\mingit\cmd\git.exe"

Set-Location -Path "d:\abhishek"

Write-Host "1. Initializing Git..."
& $git init
& $git config user.name "mrabhify7080-glitch"
& $git config user.email "mrabhify7080@gmail.com"
& $git branch -M main

Write-Host "2. Adding files to Git..."
& $git add .

Write-Host "3. Committing changes..."
& $git commit -m "Initial commit - AbhiFY multi-page website and RedSun AI SaaS platform"

Write-Host "4. Creating GitHub repository and pushing code..."
gh repo create mrabhify7080-glitch/abhify-website --public --source=. --remote=origin --push

Write-Host "DONE"
