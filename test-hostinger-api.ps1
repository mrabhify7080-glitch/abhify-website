$token = "84fC0hqx5S7r7C1v3IADfpPUwaZeXHiOXS1w5hHDabe0d0ec"

$headers = @{
    "Authorization" = "Bearer $token"
    "Accept"        = "application/json"
    "Content-Type"  = "application/json"
}

$endpoints = @(
    "https://api.hostinger.com/v1/websites",
    "https://hpanel.hostinger.com/api/v1/websites",
    "https://api.hostinger.com/v1/account",
    "https://api.hostinger.com/v1/user"
)

foreach ($ep in $endpoints) {
    try {
        Write-Host "Testing $ep..."
        $r = Invoke-RestMethod -Uri $ep -Headers $headers -Method Get -ErrorAction Stop
        Write-Host "SUCCESS ($ep):"
        $r | ConvertTo-Json -Depth 5
    } catch {
        Write-Host "FAILED ($ep): $($_.Exception.Message)"
    }
}
