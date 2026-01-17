@echo off
REM Quick Start Script for Climate-Aware Crop Stress Monitoring System (Windows)

echo.
echo 🌾 Climate-Aware Crop Stress Monitoring System
echo =============================================
echo.

REM Check Node.js
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ Node.js not found. Please install Node.js 16+
    exit /b 1
)

echo ✓ Prerequisites checked
echo.

REM Setup Frontend
echo [1/3] Setting up Frontend...
cd frontend
call npm install
if not exist .env (
    copy ..\frontend\.env.example .env >nul
    echo ⚠️  Created .env - Update with your Firebase credentials
)
echo ✓ Frontend ready
cd ..
echo.

REM Setup Backend
echo [2/3] Setting up Backend...
cd backend
call npm install
if not exist .env (
    copy .env.example .env >nul
    echo ⚠️  Created .env - Update with your Firebase credentials
)
echo ✓ Backend ready
cd ..
echo.

REM Setup ML Service (Optional)
echo [3/3] ML Service (Optional)
where python >nul 2>nul
if %errorlevel% equ 0 (
    cd ml-service
    python -m venv venv
    call venv\Scripts\activate.bat
    pip install -r requirements.txt
    echo ✓ ML service environment ready
    cd ..
) else (
    echo ⚠️  Python not installed, skipping ML service setup
)

echo.
echo === Setup Complete ===
echo.
echo To start development:
echo   Terminal 1: cd frontend ^&^& npm run dev
echo   Terminal 2: cd backend ^&^& npm run dev
echo   Terminal 3: cd ml-service ^&^& python app.py (optional)
echo.
echo Access the app at: http://localhost:5173
echo.
echo Documentation:
echo   - docs/SETUP.md - Full setup instructions
echo   - docs/ARCHITECTURE.md - System design
echo   - docs/API.md - API endpoints
