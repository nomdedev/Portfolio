import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AnimatedBackground } from '@/components/animated-background'
import './globals.css'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://martinnomdedeu.com'),
  title: 'Martin Nomdedeu — Data Scientist & ML Engineer',
  description: 'Data Scientist | Machine Learning Engineer | AI & Automation. Convierto datos y modelos de IA en decisiones de negocio: ML, LLMs, agentes y automatización.',
  keywords: ['Martin Nomdedeu', 'Data Scientist', 'Machine Learning Engineer', 'AI', 'LLMs', 'XGBoost', 'Python', 'Microsoft Fabric', 'n8n', 'FinTech', 'Automatización'],
  authors: [{ name: 'Martin Nomdedeu' }],
  creator: 'Martin Nomdedeu',
  alternates: {
    canonical: 'https://martinnomdedeu.com',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://martinnomdedeu.com',
    title: 'Martin Nomdedeu — Data Scientist & ML Engineer',
    description: 'Convierto datos y modelos de IA en decisiones de negocio: ML, LLMs, agentes y automatización.',
    siteName: 'Martin Nomdedeu Portfolio',
  },
  twitter: {
    card: 'summary',
    title: 'Martin Nomdedeu — Data Scientist & ML Engineer',
    description: 'Convierto datos y modelos de IA en decisiones de negocio: ML, LLMs, agentes y automatización.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#0a192f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <AnimatedBackground />
        {children}
        <Analytics />
      </body>
    </html>
  )
}