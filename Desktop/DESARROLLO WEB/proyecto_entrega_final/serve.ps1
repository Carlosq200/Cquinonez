param([int]$Port = 5500)
Add-Type -AssemblyName System.Net.HttpListener
$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)
$listener.Start()
Write-Host "Sirviendo: $(Get-Location) en $prefix (Ctrl+C para detener)"
Start-Process "$($prefix)index.html"
$mime = @{
  ".html"="text/html; charset=utf-8"; ".htm"="text/html; charset=utf-8"
  ".css"="text/css"; ".js"="application/javascript"
  ".json"="application/json"; ".jpg"="image/jpeg"; ".jpeg"="image/jpeg"
  ".png"="image/png"; ".svg"="image/svg+xml"; ".ico"="image/x-icon"
}
try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $rel = $context.Request.Url.LocalPath.TrimStart('/')
    if ([string]::IsNullOrWhiteSpace($rel)) { $rel = "index.html" }
    $full = Join-Path -Path (Get-Location) -ChildPath $rel
    if (-not (Test-Path $full)) {
      $context.Response.StatusCode = 404
      $bytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
      $context.Response.ContentType = "text/plain; charset=utf-8"
    } else {
      $bytes = [System.IO.File]::ReadAllBytes($full)
      $ext = [System.IO.Path]::GetExtension($full).ToLower()
      $ctype = $mime[$ext]; if (-not $ctype) { $ctype = "application/octet-stream" }
      $context.Response.ContentType = $ctype
      $context.Response.StatusCode = 200
    }
    $context.Response.OutputStream.Write($bytes,0,$bytes.Length)
    $context.Response.Close()
  }
} finally { $listener.Stop(); $listener.Close() }