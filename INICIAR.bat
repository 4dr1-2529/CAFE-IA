@echo off
title Cafe Sostenible - Iniciar
cd /d "%~dp0"

echo ========================================
echo   Cafe Sostenible AI v2.0
echo ========================================
echo.
echo Requisito: XAMPP con MySQL iniciado (Start)
echo Backend: http://localhost:3029
echo Frontend: http://localhost:5174
echo Use las credenciales configuradas por el administrador.
echo.

REM Liberar puerto 3029 si quedo un backend anterior (evita 404 en rutas nuevas)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3029" ^| findstr "LISTENING"') do taskkill /F /PID %%a >nul 2>&1

start "Backend - puerto 3029" cmd /k "cd /d "%~dp0backend" && npm start"
timeout /t 3 /nobreak >nul
start "Frontend - puerto 5174" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo Listo. Abre: http://localhost:5174
echo.
pause
