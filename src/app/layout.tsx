import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
require('dotenv').config();
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ["300", "400", "500", "600", "700", "800"]
})

export const metadata: Metadata = {
  title: 'Ecommerce DBMS',
  description: 'Welcome to my ecommerce app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body className={montserrat.className}>
          <main>
            {children}
            <Toaster/>
          </main>
        </body>
    </html>
  )
}
