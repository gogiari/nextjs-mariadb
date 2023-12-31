import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Generated by SengWan Park',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <h2>헤더</h2>
        {children}
        <h2>풋터</h2>
      </body>
    </html>
  )
}
