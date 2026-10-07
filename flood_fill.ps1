Add-Type -AssemblyName System.Drawing
$srcPath = "C:\Users\ASUS\.gemini\antigravity-ide\brain\20469d46-7d54-4f89-9089-afa1d9beeb96\profile_no_bg_1784886384368.png"
$destPath = "d:\abhishek\profile.png"

$img = [System.Drawing.Bitmap]::FromFile($srcPath)
$w = $img.Width
$h = $img.Height

$bmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Copy original image
for ($x = 0; $x -lt $w; $x++) {
    for ($y = 0; $y -lt $h; $y++) {
        $c = $img.GetPixel($x, $y)
        $bmp.SetPixel($x, $y, $c)
    }
}
$img.Dispose()

# Flood fill background mask starting from border
$visited = New-Object 'bool[,]' $w, $h
$queue = New-Object System.Collections.Generic.Queue[System.Drawing.Point]

# Add top and bottom row, left and right col
for ($x = 0; $x -lt $w; $x++) {
    $queue.Enqueue((New-Object System.Drawing.Point($x, 0)))
    $queue.Enqueue((New-Object System.Drawing.Point($x, $h - 1)))
    $visited[$x, 0] = $true
    $visited[$x, $h - 1] = $true
}
for ($y = 0; $y -lt $h; $y++) {
    $queue.Enqueue((New-Object System.Drawing.Point(0, $y)))
    $queue.Enqueue((New-Object System.Drawing.Point($w - 1, $y)))
    $visited[0, $y] = $true
    $visited[$w - 1, $y] = $true
}

while ($queue.Count -gt 0) {
    $pt = $queue.Dequeue()
    $c = $bmp.GetPixel($pt.X, $pt.Y)
    
    # Check if pixel is dark background (RGB sum < 50 or R<20 & G<20 & B<20)
    $isBg = ($c.R -lt 25 -and $c.G -lt 25 -and $c.B -lt 25)
    
    if ($isBg) {
        $bmp.SetPixel($pt.X, $pt.Y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        
        # Check 4 neighbors
        $dx = @(0, 0, 1, -1)
        $dy = @(1, -1, 0, 0)
        for ($i = 0; $i -lt 4; $i++) {
            $nx = $pt.X + $dx[$i]
            $ny = $pt.Y + $dy[$i]
            if ($nx -ge 0 -and $nx -lt $w -and $ny -ge 0 -and $ny -lt $h) {
                if (-not $visited[$nx, $ny]) {
                    $visited[$nx, $ny] = $true
                    $nc = $bmp.GetPixel($nx, $ny)
                    if ($nc.R -lt 35 -and $nc.G -lt 35 -and $nc.B -lt 35) {
                        $queue.Enqueue((New-Object System.Drawing.Point($nx, $ny)))
                    }
                }
            }
        }
    }
}

$bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Host "Flood fill complete!"
