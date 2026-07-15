#!pwsh
param([switch]$Direct)
Set-Location (Split-Path -Parent $MyInvocation.MyCommand.Path)
Write-Host ("=" * 50) -ForegroundColor Cyan
Write-Host "  Auto-Update | $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
Write-Host ("=" * 50) -ForegroundColor Cyan
Write-Host "[1/1] Excel -> seed.json ..."
npm install xlsx --silent 2>$null
node scripts\convert.cjs 2>&1
if ($LASTEXITCODE -eq 0) { Write-Host ("=" * 50) -ForegroundColor Green; Write-Host "  DONE" -ForegroundColor Green } else { Write-Host "ERROR" -ForegroundColor Red }
if (-not $Direct) { Read-Host "Press Enter" }
