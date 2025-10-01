'use client'
import React from 'react'

function AppFooter({
  websiteUrl = 'https://your-website.example',
  className = '',
}: {
  websiteUrl?: string
  className?: string
}) {
  return (
    <footer className={`w-full border-t bg-background ${className}`}>
      <div className="mx-auto max-w-6xl px-6 py-10   flex justify-between items-start">
        <div className="max-w-xl">
          <h4 className="text-base font-semibold">אודות המערכת</h4>
          <p className="mt-2 text-sm text-muted-foreground">
            ממשק זה מאפשר למנהלי סניפים להגדיר הגדרות ייצוא עבור דוחות ביטוח לאומי המתקבלים משירותי
            הביטחון הישראליים. התאם העדפות מיון, בחר בין מצבי ייצוא מאוחדים או מפוצלים, וארגן תפקידי
            פקידים לקבוצות. כל השינויים נשמרים אוטומטית.
          </p>
        </div>
        <div className="md:justify-self-start">
          <a
            href={websiteUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <span aria-hidden>↗</span>
            בקר באתר שלי
          </a>
        </div>
      </div>
    </footer>
  )
}

export default AppFooter
