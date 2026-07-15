# Upload seed.json to Google Drive via rclone
param([string]$FilePath)
$env:Path = [Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [Environment]::GetEnvironmentVariable("Path","User")
$rclone = Get-Command rclone -ErrorAction SilentlyContinue
if (-not $rclone) { exit 1 }
$remotes = rclone listremotes 2>$null
if ($remotes -notmatch "gdrive") { exit 1 }
if (-not (Test-Path $FilePath)) { exit 1 }
rclone mkdir "gdrive:dashboard-data" 2>$null | Out-Null
rclone copyto $FilePath "gdrive:dashboard-data/seed.json" --progress 2>&1
exit $LASTEXITCODE
