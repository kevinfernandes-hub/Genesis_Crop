@echo off
REM Deploy to Firebase Hosting Script

echo.
echo === Climate-Aware Crop Stress Monitoring ===
echo === Firebase Deployment ===
echo.

echo Building Next.js application...
call npm run build
if %errorlevel% neq 0 (
    echo Build failed!
    exit /b 1
)

echo.
echo Deploying to Firebase...
call firebase deploy --only hosting

echo.
echo === Deployment Complete ===
echo Your app is now live at: https://cropedge-a7d83.web.app
echo.
pause
