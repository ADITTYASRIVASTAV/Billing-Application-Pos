import React from 'react'
import { Bell, User } from 'lucide-react'


const Branch = {
  name: "surat east Branch",
  Address: "Street 123 near sardar garden"
}

const userProfile = {
  name: "Thanosh Pratap Singh",
  email: "Thethanos@gmail.com"
}

// Simple ThemeToggle component (put this in a separate file if needed)
function ThemeToggle() {
  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark')
  }
  
  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      <svg 
        className="h-5 w-5" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
        />
      </svg>
    </button>
  )
}

function AuthTopbar() {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
          {Branch ? Branch.name : "Branch Dashboard"}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        
        <button 
          className="relative p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs">
            3
          </span>
        </button>

        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <User className="h-5 w-5 text-blue-600 dark:text-blue-300" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-800 dark:text-white">
              {userProfile?.name || "Branch Manager"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {userProfile?.email || "manager@example.com"}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AuthTopbar