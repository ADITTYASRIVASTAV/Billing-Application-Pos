import React from 'react'
import { Outlet } from 'react-router-dom'
import StoreSidebar from '../StoreSideBar/BranchSidebar'
import StoreTopbar from '../StoreTopBar/BranchTopbar'



function StoreLayout({children}) {
  return (
     <>

        <div className="flex h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <StoreSidebar/>
      <div className="flex-1 flex flex-col">
        <StoreTopbar/>
        <main className="flex-1 overflow-y-auto p-8 md:p-10 lg:p-12 bg-background/80 rounded-tl-3xl shadow-xl m-4">
          {children || <Outlet/>}
        </main>
      </div>
    </div>
     </>
  )
}

export default StoreLayout
