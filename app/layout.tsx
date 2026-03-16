import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dalil — Local Services in Amman',
  description: 'Find trusted plumbers, electricians, mechanics, AC repair, phone repair and cleaning in Amman.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
