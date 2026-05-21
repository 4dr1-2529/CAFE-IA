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
echo Login: admin@cafeai.com / admin123
echo.

start "Backend - puerto 3029" cmd /k "cd /d "%~dp0backend" && npm start"
timeout /t 3 /nobreak >nul
start "Frontend - puerto 5174" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo Listo. Abre: http://localhost:5174
echo.
pause
