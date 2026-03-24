
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { LayoutDashboard, FileText, User, LogOut, BookOpen, X, Dock } from 'lucide-react';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { to: '/dashboard', icon: LayoutDashboard, text: 'Dashboard' },
    { to: '/documents', icon: FileText, text: 'Documents' },
    { to: '/flashcards', icon: Dock, text: 'Flashcards' },
    { to: '/profile', icon: User, text: 'Profile' },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden bg-black/30 transition-opacity duration-200 ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 
        bg-white border-r border-gray-200 shadow-sm z-50 
        md:relative md:translate-x-0 transition-transform duration-200 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg 
            bg-blue-600 text-white shadow-sm">
              <BookOpen size={18} />
            </div>
            <h1 className="text-sm font-semibold text-gray-900">
              Smart Sheet AI
            </h1>
          </div>

          <button onClick={toggleSidebar} className="md:hidden text-gray-500 hover:text-gray-800">
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={toggleSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all
                ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <link.icon
                    size={18}
                    className={isActive ? 'text-blue-600' : 'text-gray-500'}
                  />
                  {link.text}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium 
            text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;