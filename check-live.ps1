$url = "https://mrabhify7080-glitch.github.io/abhify-website/"
Write-Host "Checking live URL: $url"
for ($i = 1; $i -le 10; $i++) {
    try {
        $r = Invoke-WebRequest -Uri $url -UseBasicParsing -ErrorAction Stop
        Write-Host "LIVE NOW! Status: $($r.StatusCode)"
        break
    } catch {
        Write-Host "Building... attempt $i"
        Start-Sleep -Seconds 3
    }
}
