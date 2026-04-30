@echo off
setlocal

cd /d "%~dp0"

echo ========================================
echo   AEVUM BOOKING PLATFORM - RUN
echo ========================================
echo.

echo Checking ports 3001 and 5173...
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$ports = @(3001,5173); " ^
  "foreach ($port in $ports) { " ^
  "  $connections = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue; " ^
  "  foreach ($connection in $connections) { " ^
  "    $process = Get-Process -Id $connection.OwningProcess -ErrorAction SilentlyContinue; " ^
  "    if ($process) { " ^
  "      Write-Host ('Terminating PID {0} on port {1} ({2})' -f $process.Id, $port, $process.ProcessName); " ^
  "      Stop-Process -Id $process.Id -Force; " ^
  "    } " ^
  "  } " ^
  "} "

echo.
echo Starting backend server on http://localhost:3001 ...
start "Aevum Backend :3001" cmd /k "cd /d %~dp0backend && npm run dev"

timeout /t 3 /nobreak > nul

echo Starting frontend server on http://localhost:5173 ...
start "Aevum Frontend :5173" cmd /k "cd /d %~dp0 && npm run dev -- --host 127.0.0.1 --port 5173"

echo.
echo ========================================
echo   Project is starting
echo ========================================
echo Backend:  http://localhost:3001
echo Frontend: http://localhost:5173
echo.
echo Two terminal windows were opened. Keep them open while using the app.
echo.
pause
