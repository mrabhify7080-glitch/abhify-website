$token = (gh auth token).Trim()
$git = "C:\Users\ASUS\mingit\cmd\git.exe"
Set-Location "d:\abhishek"
Write-Host "Pushing with authenticated GitHub Token..."
& $git push "https://x-access-token:$token@github.com/mrabhify7080-glitch/abhify-website.git" main --force
Write-Host "Push Completed Successfully!"
