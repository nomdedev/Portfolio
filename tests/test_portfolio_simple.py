#!/usr/bin/env python3
"""
Portfolio Website Testing Suite - Versión Simplificada
Tests básicos sin Selenium para verificar funcionalidad esencial
"""

import requests
from bs4 import BeautifulSoup
import json
import re

class SimplePortfolioTester:
    def __init__(self, base_url="http://localhost:8000"):
        self.base_url = base_url
        self.results = {
            "tests_run": 0,
            "tests_passed": 0,
            "tests_failed": 0,
            "failures": []
        }

    def log_test(self, test_name, passed, message=""):
        self.results["tests_run"] += 1
        if passed:
            self.results["tests_passed"] += 1
            print(f"✅ {test_name}: PASSED")
        else:
            self.results["tests_failed"] += 1
            self.results["failures"].append({"test": test_name, "message": message})
            print(f"❌ {test_name}: FAILED - {message}")

    def test_page_load(self):
        """Test que la página principal carga correctamente"""
        try:
            response = requests.get(self.base_url, timeout=10)
            self.log_test("Página principal carga", response.status_code == 200,
                         f"Status code: {response.status_code}")
            return response.text if response.status_code == 200 else ""
        except Exception as e:
            self.log_test("Página principal carga", False, str(e))
            return ""

    def test_html_structure(self, html_content):
        """Test que la estructura HTML es correcta"""
        if not html_content:
            self.log_test("Estructura HTML", False, "No hay contenido HTML")
            return

        soup = BeautifulSoup(html_content, 'html.parser')

        # Verificar elementos esenciales
        title = soup.find('title')
        self.log_test("Título presente", title is not None and title.text.strip() != "")

        # Verificar secciones principales
        sections = ['bckPage', 'services', 'projects', 'about', 'contact', 'footer']
        for section in sections:
            section_elem = soup.find(id=section)
            self.log_test(f"Sección {section} presente", section_elem is not None)

        # Verificar navegación
        nav = soup.find('nav')
        self.log_test("Navegación presente", nav is not None)

        # Verificar proyectos
        projects = soup.find_all('div', class_='project-item')
        self.log_test("Proyectos presentes", len(projects) >= 3, f"Encontrados: {len(projects)} proyectos")

        # Verificar que hay al menos un proyecto con enlace
        project_links = soup.find_all('a', class_='project-link')
        self.log_test("Enlaces de proyectos presentes", len(project_links) > 0)

    def test_css_loading(self):
        """Test que los archivos CSS se cargan"""
        try:
            css_response = requests.get(f"{self.base_url}/style.css", timeout=10)
            self.log_test("CSS carga correctamente", css_response.status_code == 200)
        except Exception as e:
            self.log_test("CSS carga correctamente", False, str(e))

    def test_js_loading(self):
        """Test que los archivos JS se cargan"""
        try:
            js_response = requests.get(f"{self.base_url}/script.js", timeout=10)
            self.log_test("JavaScript carga correctamente", js_response.status_code == 200)
        except Exception as e:
            self.log_test("JavaScript carga correctamente", False, str(e))

    def test_images_loading(self, html_content):
        """Test que las imágenes referenciadas existen"""
        if not html_content:
            self.log_test("Imágenes cargan", False, "No hay contenido HTML")
            return

        soup = BeautifulSoup(html_content, 'html.parser')
        images = soup.find_all('img')
        failed_images = []

        for img in images:
            src = img.get('src')
            if src and not src.startswith('http'):
                try:
                    img_response = requests.get(f"{self.base_url}/{src}", timeout=10)
                    if img_response.status_code != 200:
                        failed_images.append(src)
                except:
                    failed_images.append(src)

        self.log_test("Imágenes locales existen", len(failed_images) == 0,
                     f"Imágenes faltantes: {failed_images}")

    def test_links_validity(self, html_content):
        """Test que los enlaces internos son válidos"""
        if not html_content:
            self.log_test("Enlaces válidos", False, "No hay contenido HTML")
            return

        soup = BeautifulSoup(html_content, 'html.parser')
        links = soup.find_all('a', href=True)
        invalid_links = []

        for link in links:
            href = link['href']
            if href.startswith('#'):
                # Verificar que la sección existe
                section_id = href[1:]
                section = soup.find(id=section_id)
                if not section:
                    invalid_links.append(href)
            elif href.startswith('http') and 'linkedin.com' in href:
                # Verificar enlaces de LinkedIn (básico)
                try:
                    response = requests.head(href, timeout=5, allow_redirects=True)
                    if response.status_code >= 400:
                        invalid_links.append(href)
                except:
                    pass  # No marcar como error si no se puede verificar

        self.log_test("Enlaces internos válidos", len(invalid_links) == 0,
                     f"Enlaces inválidos: {invalid_links}")

    def test_content_quality(self, html_content):
        """Test de calidad del contenido"""
        if not html_content:
            return

        soup = BeautifulSoup(html_content, 'html.parser')

        # Verificar que hay descripciones de proyectos
        project_descriptions = soup.find_all('div', class_='project-info')
        has_descriptions = all(len(p.get_text().strip()) > 50 for p in project_descriptions)
        self.log_test("Descripciones de proyectos completas", has_descriptions)

        # Verificar que hay tecnologías mencionadas
        tech_mentions = soup.find_all(text=re.compile(r'Tecnologías?:'))
        self.log_test("Tecnologías mencionadas", len(tech_mentions) > 0)

        # Verificar que hay información de contacto
        contact_section = soup.find(id='contact')
        has_contact = contact_section and len(contact_section.get_text().strip()) > 100
        self.log_test("Información de contacto presente", has_contact)

    def test_modern_features(self, html_content):
        """Test que se usan características modernas"""
        if not html_content:
            return

        # Verificar CSS moderno (backdrop-filter, etc.)
        has_backdrop_filter = 'backdrop-filter' in html_content
        self.log_test("Usa backdrop-filter (glassmorphism)", has_backdrop_filter)

        # Verificar animaciones CSS
        has_animations = 'animation:' in html_content or '@keyframes' in html_content
        self.log_test("Usa animaciones CSS", has_animations)

        # Verificar fuentes modernas
        has_google_fonts = 'fonts.googleapis.com' in html_content
        self.log_test("Usa Google Fonts", has_google_fonts)

    def run_all_tests(self):
        """Ejecutar todos los tests"""
        print("🚀 Iniciando tests simplificados del Portfolio Website\n")

        # Test básico de carga
        html_content = self.test_page_load()
        if not html_content:
            print("❌ No se puede continuar - página no carga")
            return self.results

        # Ejecutar tests
        self.test_html_structure(html_content)
        self.test_css_loading()
        self.test_js_loading()
        self.test_images_loading(html_content)
        self.test_links_validity(html_content)
        self.test_content_quality(html_content)
        self.test_modern_features(html_content)

        print(f"\n📊 Resultados: {self.results['tests_passed']}/{self.results['tests_run']} tests pasaron")

        if self.results['failures']:
            print("\n❌ Fallos encontrados:")
            for failure in self.results['failures']:
                print(f"  - {failure['test']}: {failure['message']}")

        return self.results

def main():
    tester = SimplePortfolioTester()
    results = tester.run_all_tests()

    # Guardar resultados en JSON
    with open('test_results.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)

    print(f"\n💾 Resultados guardados en test_results.json")

    # Crear resumen
    success_rate = (results['tests_passed'] / results['tests_run']) * 100 if results['tests_run'] > 0 else 0
    print(f"\n📊 Tasa de éxito: {success_rate:.1f}%")

    if success_rate >= 90:
        print("🎉 ¡Excelente! El sitio está funcionando correctamente")
    elif success_rate >= 75:
        print("👍 Bueno, pero hay algunos problemas menores")
    else:
        print("⚠️  Se requieren correcciones importantes")

if __name__ == "__main__":
    main()