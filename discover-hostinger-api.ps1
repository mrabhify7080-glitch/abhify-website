$token = "84fC0hqx5S7r7C1v3IADfpPUwaZeXHiOXS1w5hHDabe0d0ec"

$headersBearer = @{ "Authorization" = "Bearer $token"; "Accept" = "application/json" }
$headersXApi   = @{ "X-API-Key" = "$token"; "Accept" = "application/json" }
$headersToken  = @{ "X-Auth-Token" = "$token"; "Accept" = "application/json" }

$urls = @(
    "https://api.hostinger.com/rest/v1/hosting",
    "https://api.hostinger.com/v1/hosting",
    "https://api.hostinger.com/v1/git",
    "https://api.hostinger.com/v1/domains",
    "https://api.hostinger.com/v1/sites",
    "https://api.hostinger.com/open-api/v1/hosting"
)

foreach ($url in $urls) {
    foreach ($hName in @("Bearer", "X-API-Key", "X-Auth-Token")) {
        $h = switch ($hName) {
            "Bearer" { $headersBearer }
            "X-API-Key" { $headersXApi }
            "X-Auth-Token" { $headersToken }
        }
        try {
            $r = Invoke-RestMethod -Uri $url -Headers $h -Method Get -ErrorAction Stop
            Write-Host "SUCCESS: $url ($hName)"
            $r | ConvertTo-Json -Depth 3
        } catch {
            Write-Host "FAIL: $url ($hName) -> $($_.Exception.Message)"
        }
    }
}
