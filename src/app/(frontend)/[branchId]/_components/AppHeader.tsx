'use client'
import React from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

function AppHeader({ className }: { className?: string }) {
  return (
    <header className={cn('w-full border-b bg-background/60 backdrop-blur', className)}>
      <div className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src={'/logo.svg'} width={40} height={40} alt="logo" />
          <div>
            <h1 className="text-lg font-semibold leading-tight">הגדרות מנהלי סניפים</h1>
            <p className="text-xs text-muted-foreground">הגדרת מצבי ייצוא, מיון וקבוצות תפקידים</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AppHeader
