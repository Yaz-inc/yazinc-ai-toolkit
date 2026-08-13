@echo off
title YAZ.INC — Artwork Manager
color 0A
cd /d "%~dp0"

echo.
echo  ╔══════════════════════════════════════════╗
echo  ║   YAZ.INC Artwork Manager                ║
echo  ║   AI Business Solutions                  ║
echo  ╚══════════════════════════════════════════╝
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo  Oops! One small thing needed first:
    echo  Please install Node.js from https://nodejs.org
    echo  It's free and takes 2 minutes. Then open this again.
    echo.
    pause
    exit /b 1
)

:: Install dependencies if not already installed
if not exist node_modules (
    echo  Setting up for first use, please wait...
    npm install >nul 2>nul
    echo  Done!
    echo.
)

echo  Opening your Artwork Manager...
echo  Visit: http://localhost:3737
echo.
echo  Keep this window open while using the app.
echo  Close it when you are done.
echo.

node server.js
pause
