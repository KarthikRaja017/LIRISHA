$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location "$scriptDir\web"
Write-Host "Starting SmartPHOTOeditors Replica Server on http://localhost:3000/ ..." -ForegroundColor Green
Start-Process "http://localhost:3000/"
& "C:\Users\MYTHREHE\AppData\Roaming\Antigravity\bin\agy-node.cmd" server.js
