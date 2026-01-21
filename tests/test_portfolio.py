#!/usr/bin/env python3
"""
Portfolio Website Testing Suite
Tests básicos para verificar la funcionalidad del sitio web de portfolio
"""

import requests
from bs4 import BeautifulSoup
import time
import json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class PortfolioTester:
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
            return response.status_code == 200
        except Exception as e:
            self.log_test("Página principal carga", False, str(e))
            return False

    def test_html_structure(self, html_content):
        """Test que la estructura HTML es correcta"""
        soup = BeautifulSoup(html_content, 'html.parser')

        # Verificar elementos esenciales
        title = soup.find('title')
        self.log_test("Título presente", title is not None)

        # Verificar secciones principales
        sections = ['bckPage', 'services', 'projects', 'about', 'contact']
        for section in sections:
            section_elem = soup.find(id=section)
            self.log_test(f"Sección {section} presente", section_elem is not None)

        # Verificar navegación
        nav = soup.find('nav')
        self.log_test("Navegación presente", nav is not None)

        # Verificar proyectos
        projects = soup.find_all('div', class_='project-item')
        self.log_test("Proyectos presentes", len(projects) >= 3, f"Encontrados: {len(projects)} proyectos")

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
        """Test que las imágenes se cargan"""
        soup = BeautifulSoup(html_content, 'html.parser')
        images = soup.find_all('img')
        failed_images = []

        for img in images:
            src = img.get('src')
            if src:
                try:
                    if src.startswith('http'):
                        img_response = requests.get(src, timeout=10)
                    else:
                        img_response = requests.get(f"{self.base_url}/{src}", timeout=10)

                    if img_response.status_code != 200:
                        failed_images.append(src)
                except:
                    failed_images.append(src)

        self.log_test("Imágenes cargan correctamente", len(failed_images) == 0,
                     f"Imágenes fallidas: {failed_images}")

    def test_links_validity(self, html_content):
        """Test que los enlaces son válidos"""
        soup = BeautifulSoup(html_content, 'html.parser')
        links = soup.find_all('a', href=True)
        invalid_links = []

        for link in links:
            href = link['href']
            if href.startswith('#'):
                # Enlaces internos
                continue
            elif href.startswith('http'):
                try:
                    response = requests.head(href, timeout=5, allow_redirects=True)
                    if response.status_code >= 400:
                        invalid_links.append(href)
                except:
                    invalid_links.append(href)

        self.log_test("Enlaces válidos", len(invalid_links) == 0,
                     f"Enlaces inválidos: {invalid_links}")

    def test_responsive_design(self):
        """Test básico de diseño responsivo usando Selenium"""
        try:
            options = Options()
            options.add_argument('--headless')
            options.add_argument('--no-sandbox')
            options.add_argument('--disable-dev-shm-usage')

            service = Service(ChromeDriverManager().install())
            driver = webdriver.Chrome(service=service, options=options)
            driver.get(self.base_url)

            # Test desktop
            driver.set_window_size(1920, 1080)
            time.sleep(1)

            # Test tablet
            driver.set_window_size(768, 1024)
            time.sleep(1)

            # Test mobile
            driver.set_window_size(375, 667)
            time.sleep(1)

            # Verificar que el menú hamburguesa aparece en móvil
            burger_menu = driver.find_elements(By.CLASS_NAME, 'burguer')
            mobile_menu_visible = len(burger_menu) > 0

            driver.quit()
            self.log_test("Diseño responsivo funciona", mobile_menu_visible)

        except Exception as e:
            self.log_test("Diseño responsivo funciona", False, f"Selenium error: {str(e)}")

    def test_animations(self):
        """Test que las animaciones funcionan"""
        try:
            options = Options()
            options.add_argument('--headless')
            options.add_argument('--no-sandbox')
            options.add_argument('--disable-dev-shm-usage')

            service = Service(ChromeDriverManager().install())
            driver = webdriver.Chrome(service=service, options=options)
            driver.get(self.base_url)

            # Scroll a la sección de proyectos
            projects_section = driver.find_element(By.ID, 'projects')
            driver.execute_script("arguments[0].scrollIntoView();", projects_section)

            time.sleep(2)  # Esperar animaciones

            # Verificar que los proyectos tienen opacidad > 0
            project_items = driver.find_elements(By.CLASS_NAME, 'project-item')
            animations_work = True

            for item in project_items[:3]:  # Test primeros 3 proyectos
                opacity = driver.execute_script("return window.getComputedStyle(arguments[0]).opacity;", item)
                if float(opacity) == 0:
                    animations_work = False
                    break

            driver.quit()
            self.log_test("Animaciones funcionan", animations_work)

        except Exception as e:
            self.log_test("Animaciones funcionan", False, f"Selenium error: {str(e)}")

    def run_all_tests(self):
        """Ejecutar todos los tests"""
        print("🚀 Iniciando tests del Portfolio Website\n")

        # Test básico de carga
        if not self.test_page_load():
            print("❌ No se puede continuar - página no carga")
            return self.results

        # Obtener contenido HTML
        try:
            response = requests.get(self.base_url, timeout=10)
            html_content = response.text
        except:
            html_content = ""

        # Ejecutar tests
        self.test_html_structure(html_content)
        self.test_css_loading()
        self.test_js_loading()
        self.test_images_loading(html_content)
        self.test_links_validity(html_content)
        self.test_responsive_design()
        self.test_animations()

        print(f"\n📊 Resultados: {self.results['tests_passed']}/{self.results['tests_run']} tests pasaron")

        if self.results['failures']:
            print("\n❌ Fallos encontrados:")
            for failure in self.results['failures']:
                print(f"  - {failure['test']}: {failure['message']}")

        return self.results

def main():
    tester = PortfolioTester()
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