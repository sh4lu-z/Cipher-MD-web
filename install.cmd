@echo off
setlocal ENABLEDELAYEDEXPANSION
title Cipher-MD Installer

:: 1. Admin Rights Check
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo [ERROR] Administrative privileges required.
    echo Please right-click on this script and select "Run as Administrator".
    pause
    exit /b 1
)

set TARGET_DIR=%APPDATA%\.sh4lu-z\CIPHER MD
if not exist "%TARGET_DIR%" mkdir "%TARGET_DIR%"
attrib +h "%APPDATA%\.sh4lu-z"
cd /d "%TARGET_DIR%"

echo Downloading Cipher-MD...
curl -L -o Cipher-MD.zip https://github.com/sh4lu-z/Cipher-MD/archive/refs/heads/main.zip

:: 6. Clean Install - Remove old folder if exists
if exist "Cipher-MD-main" rmdir /s /q "Cipher-MD-main"

echo Extracting files...
tar -xf Cipher-MD.zip
cd Cipher-MD-main

:: 3. Handle .env Overwrite
set "CREATE_ENV=Y"
if exist ".env" (
    echo.
    echo [WARNING] An existing .env file was found.
    set /p OVERWRITE_ENV="Do you want to overwrite it? (Y/N): "
    if /i "!OVERWRITE_ENV!" neq "Y" (
        set "CREATE_ENV=N"
        echo Skipping .env setup...
    )
)

if "!CREATE_ENV!"=="Y" (
    echo.
    echo Please enter the following Environment Variables.
    echo ^(If a variable is not needed, just press Enter to skip it^)
    echo.

    :: Basic Validation Loop for Session ID
    :INPUT_SESSION
    set /p SESSION_ID="Your WhatsApp Session ID (Required): "
    if "!SESSION_ID!"=="" (
        echo Session ID cannot be empty.
        goto INPUT_SESSION
    )
    
    set /p PAIRING_NUMBER="Number to get pairing code (Required): "
    set /p MONGO_URL="MongoDB Database URL (Required): "
    
    echo.
    echo --- Optional Variables ---
    set /p OWNER_NUMBER="Owner's phone number (Optional): "
    set /p BOT_NAME="Bot Name: "
    set /p FOOTER="Footer Text: "
    set /p MENU_IMAGE="Menu Image URL: "
    set /p GROQ_API_KEY="Groq API Key (comma separated): "
    set /p GEMINI_API_KEY="Gemini API Key: "
    set /p FIRECRAWL_API_KEY="Firecrawl API Key: "
    set /p HF_TOKEN="HuggingFace Token: "
    set /p NASA_API_KEY="NASA API Key: "
    set /p RAPID_API_KEY="Rapid API Key: "
    set /p SYNTIOX_API_KEY="Syntiox API Key: "
    set /p VT_API_KEY="VirusTotal API Key: "
    set /p AI_CHAT_PLATFORM="AI Chat Platform (default: google): "
    set /p AI_CHAT_MODEL="AI Chat Model (default: gemini-3.1-flash-lite): "
    set /p AI_AGENT_PLATFORM="AI Agent Platform (default: google): "
    set /p AI_AGENT_MODEL="AI Agent Model (default: gemini-3.1-flash-lite): "
    echo.
    echo [Agentic Tasks - Emails, Calendar, etc.]
    set /p GOOGLE_CREDENTIALS="Google Credentials JSON (Paste as single line): "
    set /p GOOGLE_TOKEN="Google Token JSON (Paste as single line): "

    echo SESSION_ID="!SESSION_ID!"> .env
    echo PAIRING_NUMBER="!PAIRING_NUMBER!">> .env
    echo MONGO_URL="!MONGO_URL!">> .env
    
    if defined OWNER_NUMBER echo OWNER_NUMBER="!OWNER_NUMBER!">> .env
    if defined BOT_NAME echo BOT_NAME="!BOT_NAME!">> .env
    if defined FOOTER echo FOOTER="!FOOTER!">> .env
    if defined MENU_IMAGE echo MENU_IMAGE="!MENU_IMAGE!">> .env
    if defined GROQ_API_KEY echo GROQ_API_KEY="!GROQ_API_KEY!">> .env
    if defined GEMINI_API_KEY echo GEMINI_API_KEY="!GEMINI_API_KEY!">> .env
    if defined FIRECRAWL_API_KEY echo FIRECRAWL_API_KEY="!FIRECRAWL_API_KEY!">> .env
    if defined HF_TOKEN echo HF_TOKEN="!HF_TOKEN!">> .env
    if defined NASA_API_KEY echo NASA_API_KEY="!NASA_API_KEY!">> .env
    if defined RAPID_API_KEY echo RAPID_API_KEY="!RAPID_API_KEY!">> .env
    if defined SYNTIOX_API_KEY echo SYNTIOX_API_KEY="!SYNTIOX_API_KEY!">> .env
    if defined VT_API_KEY echo VT_API_KEY="!VT_API_KEY!">> .env
    if defined AI_CHAT_PLATFORM echo AI_CHAT_PLATFORM="!AI_CHAT_PLATFORM!">> .env
    if defined AI_CHAT_MODEL echo AI_CHAT_MODEL="!AI_CHAT_MODEL!">> .env
    if defined AI_AGENT_PLATFORM echo AI_AGENT_PLATFORM="!AI_AGENT_PLATFORM!">> .env
    if defined AI_AGENT_MODEL echo AI_AGENT_MODEL="!AI_AGENT_MODEL!">> .env
    if defined GOOGLE_CREDENTIALS echo GOOGLE_CREDENTIALS='!GOOGLE_CREDENTIALS!'>> .env
    if defined GOOGLE_TOKEN echo GOOGLE_TOKEN='!GOOGLE_TOKEN!'>> .env
)

:: 2. Check and Install Git
echo Checking for Git...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Git is not installed. Attempting to install via winget...
    winget install --id Git.Git -e --source winget --accept-package-agreements --accept-source-agreements --silent
    set "PATH=!PATH!;C:\Program Files\Git\cmd"
) else (
    echo Git is installed.
)

:: 2. Check and Install FFmpeg
echo Checking for FFmpeg...
ffmpeg -version >nul 2>&1
if %errorlevel% neq 0 (
    echo FFmpeg is not installed. Attempting to install via winget...
    winget install --id Gyan.FFmpeg -e --source winget --accept-package-agreements --accept-source-agreements --silent
) else (
    echo FFmpeg is installed.
)

echo Checking for Node.js...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed. Attempting to install via winget...
    winget -v >nul 2>&1
    if !errorlevel! equ 0 (
        echo winget found. Installing Node.js ^(this may take a minute^)...
        winget install OpenJS.NodeJS -e --accept-package-agreements --accept-source-agreements --silent
        if exist "C:\Program Files\nodejs\node.exe" (
            set "PATH=!PATH!;C:\Program Files\nodejs"
        )
    ) else (
        echo winget not found. Cannot auto-install Node.js.
    )
)

node -v >nul 2>&1
if %errorlevel% equ 0 (
    echo Node.js is available. Using Node.js...
    echo Installing dependencies...
    call npm install
    
    :: 5. npm install error handling
    if !errorlevel! neq 0 (
        echo [ERROR] npm install failed. Please check your internet connection and try again.
        pause
        exit /b 1
    )

    echo Setting up global commands and Desktop shortcuts...
    
    :: Global Commands
    set BIN_PATH=%APPDATA%\.sh4lu-z\bin
    if not exist "!BIN_PATH!" mkdir "!BIN_PATH!"
    
    echo @echo off > "!BIN_PATH!\cipher-md.bat"
    echo cd /d "%CD%" >> "!BIN_PATH!\cipher-md.bat"
    echo node start.js >> "!BIN_PATH!\cipher-md.bat"
    
    echo @echo off > "!BIN_PATH!\cipher-env.bat"
    echo notepad "%CD%\.env" >> "!BIN_PATH!\cipher-env.bat"
    
    :: Add to PATH if not exists
    echo ;!PATH!; | find /C /I ";%APPDATA%\.sh4lu-z\bin;" >nul
    if !errorlevel! neq 0 (
        for /f "tokens=2*" %%A in ('reg query "HKCU\Environment" /v PATH 2^>nul') do set "USER_PATH=%%B"
        if "!USER_PATH!"=="" (
            setx PATH "%APPDATA%\.sh4lu-z\bin" >nul
        ) else (
            setx PATH "!USER_PATH!;%APPDATA%\.sh4lu-z\bin" >nul
        )
        set "PATH=!PATH!;%APPDATA%\.sh4lu-z\bin"
    )

    :: Desktop Shortcuts
    set DESKTOP_PATH=%USERPROFILE%\Desktop\cipher md
    if not exist "!DESKTOP_PATH!" mkdir "!DESKTOP_PATH!"
    
    set BOTRUN_PATH=!DESKTOP_PATH!\cipher-md.bat
    echo @echo off > "!BOTRUN_PATH!"
    echo cd /d "%CD%" >> "!BOTRUN_PATH!"
    echo node start.js >> "!BOTRUN_PATH!"

    set EDIT_ENV_PATH=!DESKTOP_PATH!\cipher-env.bat
    echo @echo off > "!EDIT_ENV_PATH!"
    echo notepad "%CD%\.env" >> "!EDIT_ENV_PATH!"

    echo Setup complete! Starting the bot...
    node start.js
    pause
    exit /b 0
)

echo Node.js could not be installed. Checking for Docker...
docker -v >nul 2>&1
if %errorlevel% equ 0 (
    echo Docker is installed. Using Docker...
    echo Building Docker image...
    docker build -t cipher-md .
    
    echo Starting Docker container...
    docker rm -f cipher-md >nul 2>&1
    docker run -d --name cipher-md --env-file .env cipher-md

    echo Setting up global commands and Desktop shortcuts...
    
    :: Global Commands
    set BIN_PATH=%APPDATA%\.sh4lu-z\bin
    if not exist "!BIN_PATH!" mkdir "!BIN_PATH!"
    
    echo @echo off > "!BIN_PATH!\cipher-md.bat"
    echo docker start cipher-md >> "!BIN_PATH!\cipher-md.bat"
    
    echo @echo off > "!BIN_PATH!\cipher-env.bat"
    echo notepad "%CD%\.env" >> "!BIN_PATH!\cipher-env.bat"
    echo echo After saving, please restart the Docker container to apply changes. >> "!BIN_PATH!\cipher-env.bat"
    echo pause >> "!BIN_PATH!\cipher-env.bat"
    
    :: 4. Add Docker Stop and Restart Commands
    echo @echo off > "!BIN_PATH!\cipher-stop.bat"
    echo docker stop cipher-md >> "!BIN_PATH!\cipher-stop.bat"
    
    echo @echo off > "!BIN_PATH!\cipher-restart.bat"
    echo docker restart cipher-md >> "!BIN_PATH!\cipher-restart.bat"

    :: Add to PATH if not exists
    echo ;!PATH!; | find /C /I ";%APPDATA%\.sh4lu-z\bin;" >nul
    if !errorlevel! neq 0 (
        for /f "tokens=2*" %%A in ('reg query "HKCU\Environment" /v PATH 2^>nul') do set "USER_PATH=%%B"
        if "!USER_PATH!"=="" (
            setx PATH "%APPDATA%\.sh4lu-z\bin" >nul
        ) else (
            setx PATH "!USER_PATH!;%APPDATA%\.sh4lu-z\bin" >nul
        )
        set "PATH=!PATH!;%APPDATA%\.sh4lu-z\bin"
    )

    :: Desktop Shortcuts
    set DESKTOP_PATH=%USERPROFILE%\Desktop\cipher md
    if not exist "!DESKTOP_PATH!" mkdir "!DESKTOP_PATH!"
    
    set BOTRUN_PATH=!DESKTOP_PATH!\cipher-md.bat
    echo @echo off > "!BOTRUN_PATH!"
    echo docker start cipher-md >> "!BOTRUN_PATH!"

    set EDIT_ENV_PATH=!DESKTOP_PATH!\cipher-env.bat
    echo @echo off > "!EDIT_ENV_PATH!"
    echo notepad "%CD%\.env" >> "!EDIT_ENV_PATH!"
    echo echo After saving, please restart the Docker container to apply changes. >> "!EDIT_ENV_PATH!"
    echo pause >> "!EDIT_ENV_PATH!"

    set BOTSTOP_PATH=!DESKTOP_PATH!\cipher-stop.bat
    echo @echo off > "!BOTSTOP_PATH!"
    echo docker stop cipher-md >> "!BOTSTOP_PATH!"
    
    set BOTRESTART_PATH=!DESKTOP_PATH!\cipher-restart.bat
    echo @echo off > "!BOTRESTART_PATH!"
    echo docker restart cipher-md >> "!BOTRESTART_PATH!"

    echo Setup complete! Bot is running in Docker.
    pause
    exit /b 0
)

echo Error: Neither Node.js nor Docker is installed. Please install one of them to run the bot.
pause
exit /b 1
