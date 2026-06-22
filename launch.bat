@echo off
REM Soma - local development launcher (Windows)
REM Double-click this file to run

echo =========================================
echo   Soma - starting local dev server
echo =========================================
echo.

REM Check if node is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed.
    echo Download it from https://nodejs.org (pick the LTS version).
    pause
    exit /b 1
)

REM Check if .env.local exists
if not exist .env.local (
    echo WARNING: .env.local not found.
    echo Copy .env.example to .env.local and add your keys.
    echo See MANUAL_TASKS.md MT-001 for instructions.
    echo.
    echo The app will run but login and AI features will not work without keys.
    echo.
)

REM Install dependencies if needed
if not exist node_modules (
    echo Installing dependencies (first time only, may take a minute)...
    call npm install
    echo.
)

echo Starting dev server...
echo Open http://localhost:3000 in your browser.
echo Press Ctrl+C to stop.
echo.
call npm run dev
pause
