import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'
import { Providers } from '@/components/Providers'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { LoadingScreen } from '@/components/ui/LoadingScreen'

export const metadata: Metadata = {
  title: {
    default: 'Sainik Global Logistics | World-Class Freight & Logistics',
    template: '%s | Sainik Global Logistics',
  },
  description:
    'Sainik Global Logistics — Premier import-export, freight forwarding, customs clearance, and end-to-end supply chain solutions across 120+ countries.',
  keywords: [
    'logistics', 'freight forwarding', 'import export', 'customs clearance',
    'sea freight', 'air freight', 'warehousing', 'supply chain', 'Ahmedabad', 'Gujarat', 'India',
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://sainikglobal.com'),
  authors: [{ name: 'Sainik Global Logistics Pvt. Ltd.' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://sainikglobal.com',
    siteName: 'Sainik Global Logistics',
    title: 'Sainik Global Logistics | World-Class Freight & Logistics',
    description: 'Premier logistics partner for global trade — sea, air, road, and customs expertise.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sainik Global Logistics',
    description: 'Premier import-export and freight forwarding solutions.',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#0B0F14',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-brand-dark text-white font-body antialiased">
        <Providers>
          <LoadingScreen />
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
