@echo off
setlocal
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0preview.ps1"
echo.
echo Preview server stopped. If this window closed immediately before, read the error above.
pause
