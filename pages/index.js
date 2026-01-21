import Head from 'next/head';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Google Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-PNBECGNSNW');

    // Mobile menu functionality
    const burger = document.querySelector('.burguer');
    const navList = document.querySelector('.nav-list');

    if (burger && navList) {
      burger.addEventListener('click', () => {
        navList.classList.toggle('open');
        burger.classList.toggle('active');
      });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <>
      <Head>
        <title>Portfolio de Martin Nomdedeu</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-PNBECGNSNW"></script>
      </Head>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
        }

        body {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          color: #ffffff;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Header Styles */
        #header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          z-index: 1000;
        }

        .nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 0;
        }

        .brand h1 {
          font-size: 1.8rem;
          font-weight: 600;
        }

        .brand span {
          color: #00d4ff;
        }

        .nav-list ul {
          display: flex;
          list-style: none;
          gap: 2rem;
        }

        .nav-list a {
          text-decoration: none;
          color: #ffffff;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .nav-list a:hover {
          color: #00d4ff;
        }

        /* Mobile menu */
        .burguer {
          display: none;
          flex-direction: column;
          cursor: pointer;
        }

        .bar {
          width: 25px;
          height: 3px;
          background: #ffffff;
          margin: 3px 0;
          transition: 0.3s;
        }

        /* Hero Section */
        #bckPage {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 120px 20px 80px;
        }

        .hero-content h1 {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          background: linear-gradient(45deg, #ffffff, #00d4ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-content h2 {
          font-size: 2rem;
          font-weight: 300;
          margin-bottom: 2rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .hero-content p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .btn {
          display: inline-block;
          padding: 12px 30px;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 25px;
          color: #ffffff;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .nav-list ul {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(0, 0, 0, 0.9);
            flex-direction: column;
            padding: 1rem 0;
            backdrop-filter: blur(10px);
          }

          .nav-list.open ul {
            display: flex;
          }

          .burguer {
            display: flex;
          }

          .hero-content h1 {
            font-size: 2.5rem;
          }

          .hero-content h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>

      {/* Header */}
      <header id="header">
        <div className="container">
          <nav className="nav-bar">
            <div className="brand">
              <a href="#bckPage">
                <h1><span>M</span>artin <span>N</span>omdedeu</h1>
              </a>
            </div>
            <div className="nav-list">
              <div className="burguer">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
              </div>
              <ul>
                <li><a href="#bckPage" data-after="Inicio">Inicio</a></li>
                <li><a href="#services" data-after="Servicios">Servicios</a></li>
                <li><a href="#skills" data-after="Habilidades">Habilidades</a></li>
                <li><a href="#projects" data-after="Proyectos">Proyectos</a></li>
                <li><a href="#about" data-after="Sobre mí">Sobre mí</a></li>
                <li><a href="#contact" data-after="Contacto">Contacto</a></li>
              </ul>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main id="bckPage">
        <div className="container">
          <div className="hero-content">
            <h1>¡Hola! Soy Martin</h1>
            <h2>Desarrollador Web & Ingeniero Mecánico</h2>
            <p>
              Creo experiencias web innovadoras combinando mi expertise en desarrollo frontend
              con principios de ingeniería para soluciones robustas y escalables.
            </p>
            <a href="#projects" className="btn">Ver mis proyectos</a>
          </div>
        </div>
      </main>

      {/* Placeholder sections - puedes expandir con el contenido completo */}
      <section id="services" style={{minHeight: '100vh', padding: '120px 20px', background: 'rgba(255,255,255,0.05)'}}>
        <div className="container">
          <h2 style={{textAlign: 'center', marginBottom: '2rem'}}>Servicios</h2>
          <p style={{textAlign: 'center'}}>Sección de servicios - próximamente</p>
        </div>
      </section>

      <section id="skills" style={{minHeight: '100vh', padding: '120px 20px'}}>
        <div className="container">
          <h2 style={{textAlign: 'center', marginBottom: '2rem'}}>Habilidades</h2>
          <p style={{textAlign: 'center'}}>Sección de habilidades - próximamente</p>
        </div>
      </section>

      <section id="projects" style={{minHeight: '100vh', padding: '120px 20px', background: 'rgba(255,255,255,0.05)'}}>
        <div className="container">
          <h2 style={{textAlign: 'center', marginBottom: '2rem'}}>Proyectos</h2>
          <p style={{textAlign: 'center'}}>Sección de proyectos - próximamente</p>
        </div>
      </section>

      <section id="about" style={{minHeight: '100vh', padding: '120px 20px'}}>
        <div className="container">
          <h2 style={{textAlign: 'center', marginBottom: '2rem'}}>Sobre mí</h2>
          <p style={{textAlign: 'center'}}>Sección sobre mí - próximamente</p>
        </div>
      </section>

      <section id="contact" style={{minHeight: '100vh', padding: '120px 20px', background: 'rgba(255,255,255,0.05)'}}>
        <div className="container">
          <h2 style={{textAlign: 'center', marginBottom: '2rem'}}>Contacto</h2>
          <p style={{textAlign: 'center'}}>Sección de contacto - próximamente</p>
        </div>
      </section>
    </>
  );
}