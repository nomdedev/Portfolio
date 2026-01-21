import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: 'Martin Nomdedeu | Transformación Digital Industrial & Project Management',
  description: 'Ingeniero Mecánico especializado en transformación digital industrial, desarrollo de software, IA y Project Management. +300% ROI en proyectos industriales.',
  generator: 'v0.app',
  keywords: ['Transformación Digital', 'Project Management', 'Ingeniero Mecánico', 'IA', 'Machine Learning', 'Python', 'React', 'Full Stack Developer', 'Industria 4.0'],
  authors: [{ name: 'Martin Nomdedeu', url: 'https://github.com/nomdedev' }],
  creator: 'Martin Nomdedeu',
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    title: 'Martin Nomdedeu | Transformación Digital Industrial',
    description: 'Ingeniero Mecánico especializado en transformación digital, desarrollo de software e IA. +300% ROI en proyectos industriales.',
    siteName: 'Martin Nomdedeu Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Martin Nomdedeu | Transformación Digital Industrial',
    description: 'Ingeniero Mecánico especializado en transformación digital, desarrollo de software e IA.',
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}