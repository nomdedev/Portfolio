@echo off
echo Migrando imagenes JPG y eliminando placeholders SVG...
echo.

set "BASE_DIR=%~dp0"

echo Verificando Rexxus...
if exist "%BASE_DIR%Rexxus\rexus.jpg" (
    echo ✓ rexus.jpg encontrada - eliminando placeholder
    del "%BASE_DIR%Rexxus\rexus.svg" 2>nul
) else (
    echo ✗ rexus.jpg no encontrada - manteniendo placeholder
)

echo.
echo Verificando VecinoSimple...
if exist "%BASE_DIR%vecinosimple\vecinosimple.jpg" (
    echo ✓ vecinosimple.jpg encontrada - eliminando placeholder
    del "%BASE_DIR%vecinosimple\vecinosimple.svg" 2>nul
) else (
    echo ✗ vecinosimple.jpg no encontrada - manteniendo placeholder
)

echo.
echo Verificando TSolares...
if exist "%BASE_DIR%tsolares\tsolares.jpg" (
    echo ✓ tsolares.jpg encontrada - eliminando placeholder
    del "%BASE_DIR%tsolares\tsolares.svg" 2>nul
) else (
    echo ✗ tsolares.jpg no encontrada - manteniendo placeholder
)

echo.
echo Proceso completado.
echo Las imagenes JPG reales ahora tienen prioridad sobre los placeholders SVG.
pause