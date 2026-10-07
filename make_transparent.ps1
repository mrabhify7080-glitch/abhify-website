Add-Type -AssemblyName System.Drawing
$srcPath = "C:\Users\ASUS\.gemini\antigravity-ide\brain\20469d46-7d54-4f89-9089-afa1d9beeb96\profile_no_bg_1784886384368.png"
$destPath = "d:\abhishek\profile.png"

$img = [System.Drawing.Bitmap]::FromFile($srcPath)
$newImg = New-Object System.Drawing.Bitmap($img.Width, $img.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($x = 0; $x -lt $img.Width; $x++) {
    for ($y = 0; $y -lt $img.Height; $y++) {
        $c = $img.GetPixel($x, $y)
        $b = [Math]::Max($c.R, [Math]::Max($c.G, $c.B))
        if ($b -lt 20) {
            $newImg.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } elseif ($b -lt 45) {
            $alpha = [int](($b - 20) / 25.0 * 255)
            if ($alpha -gt 255) { $alpha = 255 }
            $newImg.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $c.R, $c.G, $c.B))
        } else {
            $newImg.SetPixel($x, $y, $c)
        }
    }
}
$img.Dispose()
$newImg.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
$newImg.Dispose()
Write-Host "Done saving transparent profile.png"
