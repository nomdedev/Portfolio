#!/usr/bin/env python3
"""
Diagnóstico para problemas de deploy en Vercel
"""

import os
import json
import re
from pathlib import Path

def check_vercel_config():
    """Verifica la configuración de Vercel"""
    print("🔍 Verificando configuración de Vercel...")

    # Verificar vercel.json
    if os.path.exists('vercel.json'):
        with open('vercel.json', 'r') as f:
            config = json.load(f)
        print("✅ vercel.json encontrado")
        print(f"   Versión: {config.get('version', 'N/A')}")
        print(f"   Builds: {len(config.get('builds', []))}")
    else:
        print("❌ vercel.json no encontrado")

    # Verificar .vercelignore
    if os.path.exists('.vercelignore'):
        print("✅ .vercelignore encontrado")
    else:
        print("⚠️  .vercelignore no encontrado")

def check_package_json():
    """Verifica package.json"""
    print("\n🔍 Verificando package.json...")

    if os.path.exists('package.json'):
        with open('package.json', 'r') as f:
            pkg = json.load(f)
        print("✅ package.json encontrado")
        print(f"   Nombre: {pkg.get('name', 'N/A')}")
        print(f"   Versión: {pkg.get('version', 'N/A')}")
        print(f"   Main: {pkg.get('main', 'N/A')}")

        scripts = pkg.get('scripts', {})
        if 'build' in scripts:
            print(f"   Build script: {scripts['build']}")
        else:
            print("⚠️  No hay script de build definido")
    else:
        print("❌ package.json no encontrado")

def check_file_sizes():
    """Verifica tamaños de archivos"""
    print("\n🔍 Verificando tamaños de archivos...")

    large_files = []
    for root, dirs, files in os.walk('.'):
        for file in files:
            filepath = os.path.join(root, file)
            size = os.path.getsize(filepath)
            if size > 5000000:  # 5MB
                large_files.append((filepath, size))

    if large_files:
        print("❌ Archivos grandes encontrados:")
        for filepath, size in large_files:
            print(f"   {filepath}: {size/1024/1024:.1f}MB")
    else:
        print("✅ No hay archivos excesivamente grandes")

def check_html_issues():
    """Verifica problemas en HTML"""
    print("\n🔍 Verificando HTML...")

    if os.path.exists('index.html'):
        with open('index.html', 'r', encoding='utf-8') as f:
            content = f.read()

        # Verificar rutas absolutas
        absolute_paths = re.findall(r'["\']/(?!/)[^"\']*["\']', content)
        if absolute_paths:
            print("⚠️  Rutas absolutas encontradas (pueden causar problemas):")
            for path in absolute_paths[:5]:  # Mostrar solo las primeras 5
                print(f"   {path}")

        # Verificar scripts externos
        external_scripts = re.findall(r'<script[^>]*src=["\']https?://[^"\']*["\'][^>]*>', content)
        print(f"   Scripts externos: {len(external_scripts)}")

        print("✅ index.html encontrado")
    else:
        print("❌ index.html no encontrado")

def check_missing_files():
    """Verifica archivos referenciados que no existen"""
    print("\n🔍 Verificando archivos referenciados...")

    if os.path.exists('index.html'):
        with open('index.html', 'r', encoding='utf-8') as f:
            content = f.read()

        # Extraer rutas de archivos locales
        local_files = re.findall(r'["\'](\./[^"\']*|\.\./[^"\']*|[^"\']*\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2))["\']', content)

        missing_files = []
        for file_path in local_files:
            # Limpiar la ruta
            clean_path = file_path.strip('"\'')

            # Convertir rutas relativas a absolutas
            if clean_path.startswith('./'):
                clean_path = clean_path[2:]
            elif clean_path.startswith('../'):
                # Para rutas que suben directorios, simplificar
                continue

            if clean_path and not os.path.exists(clean_path):
                missing_files.append(clean_path)

        if missing_files:
            print("❌ Archivos referenciados pero no encontrados:")
            for file in missing_files[:10]:  # Mostrar solo los primeros 10
                print(f"   {file}")
        else:
            print("✅ Todos los archivos referenciados existen")

def main():
    print("🚀 DIAGNÓSTICO PARA DEPLOY EN VERCEL")
    print("=" * 50)

    check_vercel_config()
    check_package_json()
    check_file_sizes()
    check_html_issues()
    check_missing_files()

    print("\n" + "=" * 50)
    print("💡 RECOMENDACIONES:")
    print("1. Asegúrate de que vercel.json esté en la raíz del proyecto")
    print("2. Verifica que .vercelignore excluya archivos innecesarios")
    print("3. Confirma que index.html sea el punto de entrada")
    print("4. Revisa que no haya rutas absolutas problemáticas")
    print("5. Asegúrate de que las imágenes y assets existan")
    print("6. Verifica que el repositorio esté correctamente conectado a Vercel")

if __name__ == "__main__":
    main()