import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaUserMd, FaConciergeBell, FaQuoteLeft, FaQuestionCircle, FaEnvelope, FaSignOutAlt, FaTooth, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: FaHome },
  { name: 'Appointments', path: '/admin/appointments', icon: FaCalendarAlt },
  { name: 'Doctors', path: '/admin/doctors', icon: FaUserMd },
  { name: 'Services', path: '/admin/services', icon: FaConciergeBell },
  { name: 'Testimonials', path: '/admin/testimonials', icon: FaQuoteLeft },
  { name: 'FAQs', path: '/admin/faqs', icon: FaQuestionCircle },
  { name: 'Inquiries', path: '/admin/inquiries', icon: FaEnvelope },
];

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-dark-900 text-white transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-5 border-b border-dark-800">
          <Link to="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center">
              <FaTooth className="text-white" />
            </div>
            <div>
              <span className="font-heading font-bold text-sm">Bright Smile</span>
              <span className="block text-xs text-gray-400 -mt-0.5">Admin Panel</span>
            </div>
          </Link>
        </div>

        <nav className="p-4 space-y-1 flex-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive ? 'bg-primary-600 text-white' : 'text-gray-400 hover:bg-dark-800 hover:text-white'
                }`}
              >
                <item.icon size={16} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-dark-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-dark-800 hover:text-white transition-all w-full"
          >
            <FaSignOutAlt size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-dark-800 p-2">
            <FaBars size={20} />
          </button>
          <div className="hidden lg:block">
            <h2 className="text-sm font-medium text-gray-500">
              {navItems.find(item => item.path === location.pathname)?.name || 'Admin'}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-dark-900">{user?.name || 'Admin'}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <div className="w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-sm">
              {user?.name?.charAt(0) || 'A'}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
