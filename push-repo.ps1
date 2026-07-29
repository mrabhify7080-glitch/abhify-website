$token = (gh auth token).Trim()
$git = "C:\Users\ASUS\mingit\cmd\git.exe"
Set-Location "d:\abhishek"

Write-Host "Adding all modified files..."
& $git add .

Write-Host "Committing updates..."
& $git commit -m "Transform AbhiFY into luxury dark-purple AI agency website (Apple x Linear x Framer style)"

Write-Host "Pushing with authenticated GitHub token..."
& $git push "https://x-access-token:$token@github.com/mrabhify7080-glitch/abhify-website.git" main --force

Write-Host "GitHub Push Completed Successfully!"
