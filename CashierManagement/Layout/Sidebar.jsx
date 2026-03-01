// src/layout/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShoppingCart,
  Package,
  Layers,
  Users,
  UserCog,
  Settings,
  Shield,
  X,
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

const menuItems = [
  { path: '/main/pos', icon: ShoppingCart, label: 'POS' },
  { path: '/main/order-history', icon: Package, label: 'Order History' },
  { path: '/main/refund', icon: Layers, label: 'Refund' },
  { path: '/main/customers', icon: Users, label: 'Customers' },
  { path: '/main/shift-summary', icon: UserCog, label: 'Shift Summary' },
  { path: '/main/admin', icon: Shield, label: 'Admin' },
  { path: '/main/settings', icon: Settings, label: 'Settings' },
];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
<aside
  className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200
    transform transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    md:flex md:flex-col`}
>
  <div className="p-6 border-b border-gray-200">
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold text-gray-900">POS Cloud</h2>

      <button
        onClick={onClose}              
        className="p-2 hover:bg-gray-100 rounded-lg" 
      >
        <X className="w-5 h-5 text-gray-600" />
      </button>
    </div>
    <p className="text-sm text-gray-600 mt-1">Business Management</p>
  </div>


        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-green-50 text-green-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={onClose} 
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="font-bold text-green-700">JD</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">John Doe</p>
              <p className="text-sm text-gray-600">Store Owner</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
