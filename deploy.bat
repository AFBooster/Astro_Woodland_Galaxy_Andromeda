@echo off
REM ============================================================
REM  Woodlands Galaxy Night-Sky - one-click upload to GitHub
REM  Double-click this file, or run:  deploy.bat "commit message"
REM  GitHub Pages rebuilds automatically after the push.
REM ============================================================

REM Always work from the folder this script lives in.
cd /d "%~dp0"

REM Use the commit message passed as an argument, or ask for one.
set "MSG=%~1"
if "%MSG%"=="" (
    set /p "MSG=Enter a short description of what changed: "
)
if "%MSG%"=="" set "MSG=Update Woodlands Galaxy site"

echo.
echo === Staging changes ===
git add -A

echo.
echo === Committing ===
git commit -m "%MSG%"
if errorlevel 1 (
    echo Nothing new to commit - continuing to push in case earlier commits are unpushed.
)

echo.
echo === Pushing to GitHub ===
git push
if errorlevel 1 (
    echo.
    echo *** PUSH FAILED. ***
    echo If this is the first push, run once:  git push -u origin main
    echo If it says "rejected", the remote has changes you do not have locally.
    echo.
    pause
    exit /b 1
)

echo.
echo === Done. ===
echo Pushed. Watch the deploy under the repo's Actions tab -
echo the live site updates in about a minute.
echo.
pause
