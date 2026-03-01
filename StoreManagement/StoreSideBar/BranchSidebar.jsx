import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard,
  ShoppingBag,
  RefreshCw,
  CreditCard,
  Package,
  Users,
  UserCircle,
  FileText,
  Settings
} from 'lucide-react'

const navItems = [
  {
    name: "Dashboard",
    path: "/Store/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  
  {
    name: "Product",
    path: "/store/Product",
    icon: <Package className="w-5 h-5" />,
  },
  {
    name: "Branches",
    path: "/store/Branches",
    icon: <Users className="w-5 h-5" />,
  },
  {
    name: "Customers",
    path: "/branch/customers",
    icon: <UserCircle className="w-5 h-5" />,
  },
  {
    name: "Reports",
    path: "/branch/reports",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    name: "Settings",
    path: "/branch/settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

function StoreSidebar({ onClose }) {
  const location = useLocation()

  const Branch ={
    name: "surat east Branch",
    Address: "Street 123 near sardar garden"
  }

  return (
    <div className="w-64 border-r border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 p-4 flex flex-col h-full relative">
      {onClose && (
        <button
          className="absolute top-2 right-2 rounded p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          onClick={onClose}
          aria-label="Close sidebar"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
      
      <div className="flex items-center justify-center p-2 mb-6">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">POS System</h1>
      </div>

              <div className="mb-6 px-4 py-3 bg-sidebar-accent rounded-lg">
          <h3 className="font-bold text-sidebar-accent-foreground">{Branch.name}</h3>
          <p className="text-xls text-sidebar-accent-foreground/70 mt-1">{Branch.Address}</p>
        </div>

      <nav className="space-y-2 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center justify-between p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${
              location.pathname === item.path
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                : "text-gray-700 dark:text-gray-300"
            }`}
            onClick={() => {
              if (onClose) onClose()
            }}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span>{item.name}</span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default StoreSidebar

