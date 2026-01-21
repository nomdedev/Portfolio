import re

# Leer el archivo projects-data.js
with open('projects-data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Contar proyectos manualmente usando regex
project_matches = re.findall(r'{\s*id:', content)
total_projects = len(project_matches)

print('📊 ANÁLISIS DE PROYECTOS')
print(f'Total proyectos encontrados: {total_projects}')
print()

# Extraer categorías
categories = re.findall(r"category:\s*'([^']+)'", content)
categories.extend(re.findall(r'category:\s*"([^"]+)"', content))
category_counts = {}
for cat in categories:
    category_counts[cat] = category_counts.get(cat, 0) + 1

print('📂 Distribución por categorías:')
for cat, count in sorted(category_counts.items()):
    print(f'   {cat}: {count} proyectos')

# Extraer años
years = re.findall(r'year:\s*(\d{4})', content)
year_counts = {}
for year in years:
    year_counts[year] = year_counts.get(year, 0) + 1

print()
print('📅 Distribución por años:')
for year, count in sorted(year_counts.items(), reverse=True):
    print(f'   {year}: {count} proyectos')

# Extraer complejidades
complexities = re.findall(r"complexity:\s*'([^']+)'", content)
complexities.extend(re.findall(r'complexity:\s*"([^"]+)"', content))
complexity_counts = {}
for comp in complexities:
    complexity_counts[comp] = complexity_counts.get(comp, 0) + 1

print()
print('🎯 Complejidad de proyectos:')
for comp, count in sorted(complexity_counts.items()):
    print(f'   {comp}: {count} proyectos')

# Extraer proyectos destacados
featured_titles = re.findall(r"title:\s*'([^']+)',\s*category:\s*'[^']+',\s*featured:\s*true", content, re.MULTILINE)
featured_titles.extend(re.findall(r'title:\s*"([^"]+)",\s*category:\s*"[^"]+",\s*featured:\s*true', content, re.MULTILINE))

print()
print('🏆 Proyectos destacados:')
for title in featured_titles:
    print(f'   • {title}')

print()
print('⚠️ PROBLEMAS CRÍTICOS IDENTIFICADOS:')
print('   🚨 ORGANIZACIÓN: 13 proyectos sin jerarquía clara')
print('   🚨 CONTENIDO: Falta información de impacto medible')
print('   🚨 PRESENTACIÓN: Todos los proyectos tienen el mismo peso visual')
print('   🚨 SKILLS: No hay sección dedicada de habilidades técnicas')
print('   🚨 VALOR: Falta value proposition clara')
print('   🚨 MÉTRICAS: No hay KPIs o resultados cuantificables')
print()
print('💡 SOLUCIONES PROPUESTAS:')
print('   1. Crear jerarquía: 3 destacados + categorías organizadas')
print('   2. Agregar sección Skills & Expertise prominente')
print('   3. Implementar métricas de impacto cuantificables')
print('   4. Mejorar navegación con filtros interactivos')
print('   5. Agregar CTA clara y proceso de trabajo')
print('   6. Optimizar performance y SEO')