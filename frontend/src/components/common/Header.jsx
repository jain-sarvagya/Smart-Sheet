


import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Bell, User, Menu } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full h-16 
    bg-white border-b border-gray-200">
      
      <div className="flex items-center justify-between h-full px-4">

        {/* Left */}
        <div className="flex items-center gap-3">

          {/* Mobile Menu */}
          <button
            className="md:hidden inline-flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-900"
            onClick={toggleSidebar}
          >
            <Menu size={20} />
          </button>

          {/* Branding */}
          <div className="hidden md:flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
              AI
            </div>
            <span className="text-sm font-semibold text-gray-900">
              Smart Sheet AI
            </span>
          </div>

        </div>

        {/* Right */}
        <div className="flex items-center gap-4">

          {/* Notification */}
          <button className="relative w-10 h-10 flex items-center justify-center rounded-lg 
          border border-gray-200 hover:bg-gray-100 transition">
            <Bell size={18} className="text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full"></span>
          </button>

          {/* User */}
          <div className="flex items-center gap-3 border-l border-gray-200 pl-4">

            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center">
              <User size={16} />
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900">
                {user?.username || 'User'}
              </p>
              <p className="text-xs text-gray-500">
                {user?.email || 'user@example.com'}
              </p>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;