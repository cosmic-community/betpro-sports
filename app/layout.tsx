import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BetPro Sports - Expert Sports Betting Analysis',
  description: 'Get expert sports betting picks, analysis, and strategy guides from professional handicappers. NFL, NBA, MLB, College Football and more.',
  keywords: 'sports betting, betting picks, NFL picks, NBA picks, betting analysis, sports handicapping',
  authors: [{ name: 'BetPro Sports Team' }],
  openGraph: {
    title: 'BetPro Sports - Expert Sports Betting Analysis',
    description: 'Get expert sports betting picks, analysis, and strategy guides from professional handicappers.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BetPro Sports - Expert Sports Betting Analysis',
    description: 'Get expert sports betting picks, analysis, and strategy guides from professional handicappers.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}