$token = "84fC0hqx5S7r7C1v3IADfpPUwaZeXHiOXS1w5hHDabe0d0ec"

$headers = @{
    "Authorization" = "Bearer $token"
    "User-Agent"    = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    "Accept"        = "application/json"
}

$urls = @(
    "https://api.hostinger.com/v1/websites",
    "https://api.hostinger.com/v1/hosting/accounts",
    "https://api.hostinger.com/v1/dns/records",
    "https://api.hostinger.com/v1/git/deployments"
)

foreach ($u in $urls) {
    try {
        $r = Invoke-RestMethod -Uri $u -Headers $headers -Method Get -ErrorAction Stop
        Write-Host "SUCCESS $u"
        $r | ConvertTo-Json -Depth 5
    } catch {
        Write-Host "FAIL $u -> $($_.Exception.Message)"
    }
}
