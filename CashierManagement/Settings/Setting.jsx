import React from 'react'
import BranchInfo from './BranchInfo'
import SettingInfo from './SettingInfo'

function settings() {
  return (
     <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Branch Setting</h1>
      </div>
      <div>
        <SettingInfo/>
      </div>
    </div>
  )
}
export default settings