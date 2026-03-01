import React from 'react'

import { Outlet } from 'react-router-dom'
import AuthSidebar from './AdminSidebar'
import AuthTopbar from './BranchTopbar'

function AdminLayout({children}) {
  return (
     <>
        <div className="flex h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <AuthSidebar/>
      <div className="flex-1 flex flex-col">
        <AuthTopbar/>
        <main className="flex-1 overflow-y-auto p-8 md:p-10 lg:p-12 bg-background/80 rounded-tl-3xl shadow-xl m-4">
          {children || <Outlet/>}
        </main>
      </div>
    </div>
     </>
  )
}

export default AdminLayout


