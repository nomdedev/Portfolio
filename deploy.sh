#!/bin/bash

# Script de Deployment para GitHub Pages
# Uso: ./deploy.sh

echo "🚀 Iniciando deployment a GitHub Pages..."

# Verificar que estamos en la rama correcta
current_branch=$(git branch --show-current)
if [ "$current_branch" != "updates" ]; then
    echo "❌ Debes estar en la rama 'updates' para hacer deployment"
    exit 1
fi

# Verificar que no hay cambios sin commitear
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Hay cambios sin commitear. Haz commit primero."
    exit 1
fi

# Ejecutar tests antes del deployment
echo "🧪 Ejecutando tests..."
python test_portfolio_simple.py

# Verificar que los tests pasaron
if [ $? -ne 0 ]; then
    echo "❌ Tests fallaron. No se puede hacer deployment."
    exit 1
fi

echo "✅ Tests pasaron correctamente"

# Crear branch gh-pages si no existe
if ! git show-ref --verify --quiet refs/heads/gh-pages; then
    echo "📝 Creando rama gh-pages..."
    git checkout --orphan gh-pages
    git reset --hard
    git checkout updates
fi

# Hacer push a gh-pages
echo "📤 Subiendo a GitHub Pages..."
git push origin updates:gh-pages --force

echo "✅ Deployment completado!"
echo "🌐 Tu sitio estará disponible en: https://nomdedev.github.io/Portfolio"

# Volver a la rama original
git checkout updates