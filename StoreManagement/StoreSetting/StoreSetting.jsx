import React from 'react'
import BranchInfo from './BranchInfo'

function Storesettings() {
  return (
     <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Branch Setting</h1>
      </div>
      <div>
        <StoreInfo/>
      </div>
    </div>
  )
}

export default Storesettings