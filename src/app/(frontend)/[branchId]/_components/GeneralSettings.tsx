'use client'
import React, { useEffect, useState } from 'react'
import SettingsSection from './SettingsSection'
import Setting from './Setting'
import { Switch } from '@/components/ui/switch'
import { Branch, Role, Setting, Setting, Setting as SettingType } from '@/payload-types'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import UpdateSetting from './UpdateSetting'
import { GLOBAL_SETTINGS_ID } from '@/lib/constants'

function GeneralSettings({
  branch,
  settings,
  roles,
}: {
  roles: Role[]
  branch: Branch
  settings: SettingType[]
}) {
  const [selectedBranch, setSelectedBranch] = useState(branch.id)

  return (
    <>
      <SettingsSection title="עדכון נתונים">
        <UpdateSetting setting={branch.settings as SettingType} roles={roles} />
      </SettingsSection>
    </>
  )
}

export default GeneralSettings
