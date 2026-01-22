@echo off
echo Reemplazando placeholders SVG con imagenes JPG reales...
echo.

if exist "rexus.jpg" (
    echo ✓ Encontrada rexus.jpg - reemplazando placeholder
    del rexus.svg 2>nul
) else (
    echo ✗ No se encontro rexus.jpg - manteniendo placeholder
)

if exist "vecinosimple.jpg" (
    echo ✓ Encontrada vecinosimple.jpg - reemplazando placeholder
    del vecinosimple.svg 2>nul
) else (
    echo ✗ No se encontro vecinosimple.jpg - manteniendo placeholder
)

if exist "tsolares.jpg" (
    echo ✓ Encontrada tsolares.jpg - reemplazando placeholder
    del tsolares.svg 2>nul
) else (
    echo ✗ No se encontro tsolares.jpg - manteniendo placeholder
)

echo.
echo Proceso completado. Las imagenes JPG reales ahora tienen prioridad sobre los placeholders SVG.
pause