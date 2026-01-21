@echo off
echo ========================================
echo VERIFICANDO PROYECTO EN RAMA MAIN
echo ========================================
echo.

echo Rama actual:
for /f %%i in ('git branch --show-current') do set current_branch=%%i
echo %current_branch%
if "%current_branch%"=="main" (
    echo Rama correcta: main
) else (
    echo ADVERTENCIA: No estas en la rama main!
)
echo.

echo Verificando Next.js:
if exist package.json (
    echo package.json encontrado
) else (
    echo package.json NO encontrado
)
echo.

echo Verificando estructura:
if exist app\page.tsx echo app\page.tsx encontrado
if exist app\layout.tsx echo app\layout.tsx encontrado
if exist components\portfolio\ echo components/portfolio/ encontrado
if exist next.config.mjs echo next.config.mjs encontrado
if exist tsconfig.json echo tsconfig.json encontrado
echo.

echo Verificando servidor local:
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:3000' -Method Head -TimeoutSec 5; echo Servidor corriendo en localhost:3000 } catch { echo Servidor no encontrado (ejecuta: pnpm dev) }"
echo.

echo INSTRUCCIONES PARA V0.DEV:
echo 1. Ve a: https://v0.dev
echo 2. Sign In con tu cuenta de GitHub
echo 3. Haz clic en 'Import Repository'
echo 4. Busca: nomdedev/Portfolio
echo 5. Selecciona rama: main (principal)
echo 6. Framework: Next.js (auto-detectado)
echo 7. Empieza a editar visualmente!
echo.

pause