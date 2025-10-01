'use client'
import { Role, Setting as SettingsType } from '@/payload-types'
import React, { useEffect } from 'react'
import Setting from './Setting'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField } from '@/components/ui/form'
import axios from 'axios'
import { CategoriesGroups } from './CategoriesGroups'

const settingsSchema = z.object({
  mode: z.enum(['unified', 'splited']),
  sorting: z.enum(['name', 'operations']),
})

type FormType = z.infer<typeof settingsSchema>

function UpdateSetting({ setting, roles }: { setting: SettingsType; roles: Role[] }) {
  const form = useForm<FormType>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      mode: setting.mode,
      sorting: setting.sorting,
    },
  })

  const formData = form.watch()

  const handleApiUpdate = async (data: FormType) => {
    try {
      await axios.patch(`/api/settings/${setting.id}`, data) // No Authorization header
    } catch (error) {
      console.error('Error updating settings:', error)
    }
  }

  const handleCategoriesGroupsChange = async (data: SettingsType['categoriesGroups']) => {
    try {
      await axios.patch(`/api/settings/${setting.id}`, { categoriesGroups: data }) // No Authorization header
    } catch (error) {
      console.error('Error updating settings:', error)
    }
  }
  useEffect(() => {
    form.setValue('mode', setting.mode)
    form.setValue('sorting', setting.sorting)
  }, [setting, form])

  return (
    <Form {...form}>
      <form className="">
        <FormField
          control={form.control}
          name="sorting"
          render={({ field }) => (
            <Setting title="מיון פקידים בדוח" description="בחר כיצד פקידים ממוינים בתוך דוח">
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value)
                    const updatedData = { ...form.getValues(), sorting: value } as FormType
                    handleApiUpdate(updatedData)
                  }}
                  value={field.value}
                >
                  <SelectTrigger className="min-w-[160px]">
                    <SelectValue placeholder="בחר מיון" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">לפי שם</SelectItem>
                    <SelectItem value="operations">לפי מספר פעולות</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </Setting>
          )}
        />
        <FormField
          control={form.control}
          name="mode"
          render={({ field }) => (
            <Setting
              addiotionalInfo={
                formData.mode === 'splited' && (
                  <CategoriesGroups
                    roles={roles}
                    setting={setting.categoriesGroups}
                    onUpdate={handleCategoriesGroupsChange}
                  />
                )
              }
              title="מצב ייצוא"
              description="בחר את מצב הייצוא עבור דוחות"
            >
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value)
                    const updatedData = { ...form.getValues(), mode: value } as FormType
                    handleApiUpdate(updatedData)
                  }}
                  value={field.value}
                >
                  <SelectTrigger className="min-w-[160px]">
                    <SelectValue placeholder="בחר מצב ייצוא" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="splited">מפוצל</SelectItem>
                    <SelectItem value="unified">מאוחד</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </Setting>
          )}
        />
      </form>
    </Form>
  )
}

export default UpdateSetting
