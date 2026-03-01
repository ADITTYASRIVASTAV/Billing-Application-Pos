import React from 'react'
import BranchInfo from './BranchInfo'

function Branchsettings() {
  return (
     <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Branch Setting</h1>
      </div>
      <div>
        <BranchInfo/>
      </div>
    </div>
  )
}

export default Branchsettings