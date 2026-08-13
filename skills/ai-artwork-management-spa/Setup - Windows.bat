@echo off
title YAZ.INC — Protocol Setup
color 0A
cd /d "%~dp0"

echo.
echo  ╔══════════════════════════════════════════╗
echo  ║   YAZ.INC Artwork Manager                ║
echo  ║   One-time Setup (Windows)               ║
echo  ╚══════════════════════════════════════════╝
echo.

:: Find Node.js path
for /f "delims=" %%i in ('where node 2^>nul') do set "NODE_PATH=%%i"

if "%NODE_PATH%"=="" (
    echo  Oops! Node.js is required.
    echo  Please install it from https://nodejs.org then run this again.
    pause
    exit /b 1
)

:: Get absolute path to server.js
set "SERVER_PATH=%~dp0server.js"

echo  Found Node.js at: %NODE_PATH%
echo  Server located at: %SERVER_PATH%
echo.
echo  Registering yazinc:// protocol...

:: Write the .reg file dynamically with correct paths
set "REG_FILE=%TEMP%\yazinc_protocol.reg"

:: Escape backslashes for registry format
set "NODE_ESC=%NODE_PATH:\=\\%"
set "SERVER_ESC=%SERVER_PATH:\=\\%"

(
echo Windows Registry Editor Version 5.00
echo.
echo [HKEY_CLASSES_ROOT\yazinc]
echo @="YAZ.INC Artwork Manager"
echo "URL Protocol"=""
echo.
echo [HKEY_CLASSES_ROOT\yazinc\DefaultIcon]
echo @="\"%NODE_ESC%\",1"
echo.
echo [HKEY_CLASSES_ROOT\yazinc\shell]
echo.
echo [HKEY_CLASSES_ROOT\yazinc\shell\open]
echo.
echo [HKEY_CLASSES_ROOT\yazinc\shell\open\command]
echo @="\"%NODE_ESC%\" \"%SERVER_ESC%\""
) > "%REG_FILE%"

:: Import to registry (requires admin or user-level HKEY_CURRENT_USER)
reg import "%REG_FILE%" >nul 2>nul

if %errorlevel% equ 0 (
    echo.
    echo  ✅ Setup complete!
    echo  You can now click "Enable Full Mode" in the browser.
    echo  The app will launch automatically from the browser.
) else (
    echo.
    echo  Run this file as Administrator if it fails.
    echo  Right-click → "Run as administrator"
)

echo.
pause
