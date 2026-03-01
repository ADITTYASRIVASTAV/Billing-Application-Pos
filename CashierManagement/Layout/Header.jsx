
import React from 'react';
import { Menu, Bell, HelpCircle, Keyboard } from 'lucide-react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
// import Sidebar from './Sidebar';

const Header = ({ toggleSidebar}) => {  
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}  
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">POS Terminal</h1>
            <p className="text-sm text-gray-600">Create new order</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
<AvatarGroup max={4}>
      <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/150?u=1" />
      <Avatar alt="Travis Howard" src="https://i.pravatar.cc/150?u=2" />
      <Avatar alt="Cindy Baker" src="https://i.pravatar.cc/150?u=3" />
      <Avatar alt="Agnes Walker" src="https://i.pravatar.cc/150?u=4" />
      <Avatar alt="Trevor Henderson" src="https://i.pravatar.cc/150?u=5" />
    </AvatarGroup>

            </div>
          </div>
          
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <HelpCircle className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;