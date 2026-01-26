import React from "react"
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AnimatedBackground } from '@/components/animated-background'
import './globals.css'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: 'Martín Nomdedeu | Ingeniero Electromecánico, Product Manager & Technical Leader',
  description: 'Ingeniero Electromecánico, Product Manager & Technical Leader especializado en transformación digital, optimización operativa y desarrollo de productos. Experiencia en FinTech, Lean Manufacturing y Six Sigma.',
  generator: 'v0.app',
  keywords: ['Martín Nomdedeu', 'Ingeniero Electromecánico', 'Product Manager', 'Technical Leader', 'FinTech', 'Transformación Digital', 'Lean Manufacturing', 'Six Sigma', 'Python', 'Power BI', 'Data Analytics'],
  authors: [{ name: 'Martín Nomdedeu' }],
  creator: 'Martín Nomdedeu',
  alternates: {
    canonical: 'https://martinnomdedeu.com',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://martinnomdedeu.com',
    title: 'Martín Nomdedeu | Ingeniero Electromecánico, Product Manager & Technical Leader',
    description: 'Ingeniero Electromecánico, Product Manager & Technical Leader especializado en transformación digital, optimización operativa y desarrollo de productos.',
    siteName: 'Martín Nomdedeu Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Martín Nomdedeu | Ingeniero Electromecánico, Product Manager & Technical Leader',
    description: 'Ingeniero Electromecánico, Product Manager & Technical Leader especializado en transformación digital, optimización operativa y desarrollo de productos.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
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
    <html lang="es" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <AnimatedBackground />
        {children}
        <Analytics />
      </body>
    </html>
  )
}