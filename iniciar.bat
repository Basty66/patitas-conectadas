@echo off
title Patitas Conectadas
cd /d "%~dp0"
echo ====================================
echo  PATITAS CONECTADAS - MONOLITO
echo  React + Vite + Tailwind + Express + IA
echo ====================================
echo.
echo  [1] Iniciar en DESARROLLO (Vite + Server)
echo  [2] Iniciar en PRODUCCION (puerto 3001)
echo  [3] Construir frontend para produccion
echo  [4] Salir
echo.
set /p opt="Selecciona una opcion: "

if "%opt%"=="1" (
    echo.
    echo  Iniciando en modo DESARROLLO...
    echo  Frontend: http://localhost:5173
    echo  Backend:  http://localhost:3001
    echo.
    start "Backend Patitas" cmd /c "node --watch server/index.js"
    timeout /t 2 /nobreak >nul
    npx vite --host
)
if "%opt%"=="2" (
    cls
    echo =============================================
    echo  PATITAS CONECTADAS - MODO PRODUCCION
    echo  Abre tu navegador en http://localhost:3001
    echo  Presiona Ctrl+C para detener
    echo =============================================
    echo.
    node server/index.js
)
if "%opt%"=="3" (
    echo.
    echo  Construyendo frontend para produccion...
    echo.
    call npx vite build
    echo.
    echo  Listo! Ejecuta opcion 2 para iniciar.
    echo.
    pause
)
if "%opt%"=="4" exit
