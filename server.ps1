$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:3000/")
$listener.Prefixes.Add("http://127.0.0.1:3000/")
$listener.Start()
Write-Host "Live server is running on http://localhost:3000"

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $req = $context.Request
        $res = $context.Response
        
        $urlPath = [System.Uri]::UnescapeDataString($req.Url.AbsolutePath)
        if ($urlPath -eq "/" -or $urlPath -eq "/index.html") {
            $filePath = "d:\abhishek\index.html"
        } elseif ($urlPath -eq "/redsun" -or $urlPath -eq "/redsun/") {
            $filePath = "d:\abhishek\redsun\index.html"
        } else {
            $clean = $urlPath.TrimStart('/')
            $filePath = Join-Path "d:\abhishek" $clean
        }

        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            switch ($ext) {
                ".html" { $res.ContentType = "text/html; charset=utf-8" }
                ".css"  { $res.ContentType = "text/css" }
                ".js"   { $res.ContentType = "application/javascript" }
                ".png"  { $res.ContentType = "image/png" }
                ".jpg"  { $res.ContentType = "image/jpeg" }
                ".jpeg" { $res.ContentType = "image/jpeg" }
                ".svg"  { $res.ContentType = "image/svg+xml" }
                default { $res.ContentType = "application/octet-stream" }
            }
            $res.ContentLength64 = $bytes.Length
            $res.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $res.StatusCode = 404
            $buf = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $res.OutputStream.Write($buf, 0, $buf.Length)
        }
        $res.Close()
    } catch {
        # ignore transient connection errors
    }
}
