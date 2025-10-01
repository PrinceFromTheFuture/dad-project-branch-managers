import React from 'react'
import GeneralSettings from './_components/GeneralSettings'
import getPayload from '@/lib/getPayload'
import { notFound, redirect } from 'next/navigation'
import AppHeader from './_components/AppHeader'
import AppFooter from './_components/AppFooter'

async function page({ params }: { params: Promise<{ branchId: string }> }) {
  const { branchId } = await params
  const payload = await getPayload()

  const branch = await payload
    .findByID({ collection: 'branches', id: branchId })
    .catch(() => notFound())

  const { docs: settings } = await payload.find({
    collection: 'settings',
    depth: 10,
    pagination: false,
  })
  const { docs: roles } = await payload.find({ collection: 'roles', depth: 10, pagination: false })
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />

      <main className="flex-1">
        <section className="border-b bg-muted/30">
          <div className="mx-auto max-w-6xl px-6 py-10">
            <h2 className="text-2xl md:text-3xl font-semibold">
              {` סניף ${branch?.nameInHebrew}` || 'הגדרות סניף'}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              כמנהל סניף, הגדר את הגדרות הייצוא שלך עבור דוחות ביטוח לאומי. בחר כיצד פקידים ממוינים,
              בחר בין מצבי ייצוא מאוחדים או מפוצלים, וארגן תפקידי פקידים לקבוצות מותאמות אישית עבור
              ייצוא מפוצל.
            </p>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-[70vw] px-6 py-8">
            <div className="rounded-lg border bg-card shadow-sm">
              <GeneralSettings roles={roles} settings={settings} branch={branch} />
            </div>
          </div>
        </section>
      </main>

      <AppFooter websiteUrl="https://your-website.example" />
    </div>
  )
}

export default page
