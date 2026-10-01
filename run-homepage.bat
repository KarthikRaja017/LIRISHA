@echo off
cd /d "%~dp0web"
echo Starting SmartPHOTOeditors Replica Server on http://localhost:3000/ ...
start http://localhost:3000/
"C:\Users\MYTHREHE\AppData\Roaming\Antigravity\bin\agy-node.cmd" server.js
pause
