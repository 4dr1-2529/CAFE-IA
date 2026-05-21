@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ========================================
echo  Subir proyecto a GitHub - CAFE-IA
echo ========================================
echo.

REM Corregir SSL en Windows (error: unable to get local issuer certificate)
git config http.sslBackend schannel
git config --unset http.sslCAInfo 2>nul

echo [1/3] Estado del repositorio:
git status -sb
echo.

echo [2/3] Sincronizando con GitHub...
git fetch origin 2>nul
git push -u origin main
if errorlevel 1 goto :error

echo.
echo [3/3] Listo.
echo Repositorio: https://github.com/4dr1-2529/CAFE-IA
echo.
pause
exit /b 0

:error
echo.
echo ERROR al subir. Pruebe en PowerShell SOLO estas lineas (una por una):
echo   cd "%~dp0"
echo   git config http.sslBackend schannel
echo   git config --global http.sslBackend schannel
echo   git push -u origin main
echo.
echo Si pide contraseña: use un TOKEN de GitHub, no su clave normal.
echo Crear token: GitHub - Settings - Developer settings - Personal access tokens
echo.
pause
exit /b 1
