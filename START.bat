@echo off
echo ========================================
echo   BOOKING PLATFORM - STARTUP SCRIPT
echo ========================================
echo.
echo Starting Backend Server (Port 3001)...
start "Backend Server" cmd /c "cd backend && npm start"
timeout /t 3 /nobreak > nul
echo.
echo Starting Frontend Server (Port 5173)...
start "Frontend Server" cmd /c "npm run dev"
echo.
echo ========================================
echo   Both servers are starting!
echo ========================================
echo.
echo Backend:  http://localhost:3001
echo Frontend: http://localhost:5173
echo.
echo Press any key to exit (servers will continue running)...
pause > nul
