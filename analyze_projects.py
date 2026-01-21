import json
import re

# Leer el archivo projects-data.js
with open('projects-data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extraer el array de JavaScript usando regex
match = re.search(r'const projectsData = (\[.*?\n\]);', content, re.DOTALL)
if not match:
    print("No se pudo encontrar el array projectsData")
    exit(1)

json_str = match.group(1)
# Convertir las comillas simples a dobles para JSON válido
json_str = json_str.replace("'", '"')
# Corregir valores null
json_str = json_str.replace('null', 'null')

try:
    projects = json.loads(json_str)
except json.JSONDecodeError as e:
    print(f"Error parsing JSON: {e}")
    print(f"JSON string: {json_str[:200]}...")
    exit(1)

print('📊 ANÁLISIS DE PROYECTOS')
print(f'Total proyectos: {len(projects)}')
print()

categories = {}
years = {}
complexities = {}
ratings = {}

for p in projects:
    cat = p.get('category', 'uncategorized')
    year = p.get('year', 'unknown')
    complexity = p.get('complexity', 'unknown')
    rating = p.get('rating', 0)

    categories[cat] = categories.get(cat, 0) + 1
    years[year] = years.get(year, 0) + 1
    complexities[complexity] = complexities.get(complexity, 0) + 1
    ratings[rating] = ratings.get(rating, 0) + 1

print('📂 Distribución por categorías:')
for cat, count in sorted(categories.items()):
    print(f'   {cat}: {count} proyectos')

print()
print('📅 Distribución por años:')
for year, count in sorted(years.items(), reverse=True):
    print(f'   {year}: {count} proyectos')

print()
print('🎯 Complejidad de proyectos:')
for comp, count in sorted(complexities.items()):
    print(f'   {comp}: {comp} proyectos')

print()
print('⭐ Rating promedio por categoría:')
for cat in categories:
    cat_projects = [p for p in projects if p.get('category') == cat]
    if cat_projects:
        avg_rating = sum(p.get('rating', 0) for p in cat_projects) / len(cat_projects)
        print(f'   {cat}: {avg_rating:.1f}/5')

print()
print('🏆 Proyectos destacados:')
featured = [p for p in projects if p.get('featured', False)]
for p in featured:
    print(f'   • {p["title"]} ({p["category"]}) - Rating: {p.get("rating", 0)}/5')

print()
print('⚠️ PROBLEMAS IDENTIFICADOS:')
print('   • Falta jerarquía clara entre proyectos')
print('   • Algunos proyectos no tienen rating consistente')
print('   • Distribución desigual de categorías')
print('   • Falta información de impacto medible y cuantificable')
print('   • No hay métricas de éxito claras')