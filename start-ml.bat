@echo off
REM ML Service Startup Script (Windows Batch)
REM Usage: Double-click this file or run: start-ml.bat

echo.
echo ============================================================
echo   ^>^> ML SERVICE STARTUP
echo ============================================================
echo.

REM Check if Node.js is installed
node -v >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js not found. Please install Node.js first.
    pause
    exit /b 1
)

REM Run the Node.js startup script
echo Launching ML service startup script...
node start-ml.js

pause
