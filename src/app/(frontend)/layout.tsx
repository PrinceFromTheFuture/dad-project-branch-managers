import React from 'react'
import './styles.css'
import type { Metadata } from 'next'
import { IBM_Plex_Sans_Condensed } from 'next/font/google'

const oswald = IBM_Plex_Sans_Condensed({
  variable: '--font-oswald',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'ניהול הגדרות דוחות',
  description: 'מערכת להגדרת ייצוא דוחות ביטחון',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="he" dir="rtl">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
