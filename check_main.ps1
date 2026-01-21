Write-Host "========================================" -ForegroundColor Cyan
Write-Host "VERIFICANDO PROYECTO EN RAMA MAIN" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Rama actual:" -ForegroundColor Yellow
$currentBranch = git branch --show-current
Write-Host "$currentBranch" -ForegroundColor $(if ($currentBranch -eq "main") { "Green" } else { "Red" })
if ($currentBranch -ne "main") {
    Write-Host "ADVERTENCIA: No estas en la rama main!" -ForegroundColor Red
}
Write-Host ""

Write-Host "Verificando Next.js:" -ForegroundColor Yellow
if (Test-Path "package.json") {
    $package = Get-Content package.json | ConvertFrom-Json
    $nextVersion = $package.dependencies.next
    Write-Host "Next.js version: $nextVersion" -ForegroundColor Green
} else {
    Write-Host "package.json no encontrado" -ForegroundColor Red
}
Write-Host ""

Write-Host "Verificando estructura:" -ForegroundColor Yellow
$checks = @(
    @{Path="app/page.tsx"; Name="app/page.tsx"},
    @{Path="app/layout.tsx"; Name="app/layout.tsx"},
    @{Path="components/portfolio/"; Name="components/portfolio/"},
    @{Path="next.config.mjs"; Name="next.config.mjs"},
    @{Path="tsconfig.json"; Name="tsconfig.json"}
)

foreach ($check in $checks) {
    if (Test-Path $check.Path) {
        Write-Host "$($check.Name) encontrado" -ForegroundColor Green
    } else {
        Write-Host "$($check.Name) NO encontrado" -ForegroundColor Red
    }
}
Write-Host ""

Write-Host "Verificando servidor local:" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -Method Head -TimeoutSec 5
    Write-Host "Servidor corriendo en localhost:3000" -ForegroundColor Green
} catch {
    Write-Host "Servidor no encontrado (ejecuta: pnpm dev)" -ForegroundColor Red
}
Write-Host ""

Write-Host "INSTRUCCIONES PARA V0.DEV:" -ForegroundColor Magenta
Write-Host "1. Ve a: https://v0.dev" -ForegroundColor White
Write-Host "2. Sign In con tu cuenta de GitHub" -ForegroundColor White
Write-Host "3. Haz clic en 'Import Repository'" -ForegroundColor White
Write-Host "4. Busca: nomdedev/Portfolio" -ForegroundColor White
Write-Host "5. Selecciona rama: main (principal)" -ForegroundColor White
Write-Host "6. Framework: Next.js (auto-detectado)" -ForegroundColor White
Write-Host "7. Empieza a editar visualmente!" -ForegroundColor White
Write-Host ""

Read-Host "Presiona Enter para continuar"