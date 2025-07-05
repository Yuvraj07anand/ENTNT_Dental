import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!currentUser) return null;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Nav items  Array
  const navItems = [
    ...(currentUser.role === 'Admin' ? [
      { path: '/', label: 'Dashboard' },
      { path: '/patients', label: 'Patients' },
      { path: '/appointments', label: 'Appointments' },
      { path: '/calendar', label: 'Calendar' }
    ] : []),
    ...(currentUser.role === 'Patient' ? [
      { path: '/my-account', label: 'My Account' }
    ] : [])
  ];

  return (
    <nav className="bg-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="text-white text-xl font-bold hover:text-blue-200 transition-colors"
            >
              ENTNT Dental
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
            
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium text-white transition-colors
                    ${location.pathname === item.path 
                      ? 'bg-blue-900 font-semibold' 
                      : 'hover:bg-blue-700'
                    }`}
                  style={{ color: 'white' }} 
                >
                  {item.label}
                </Link>
              ))}

             
              <div className="ml-4 flex items-center space-x-2">
                <span className="text-white text-sm font-medium">
                  {currentUser.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-blue-700 focus:outline-none transition-colors"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`h-6 w-6 ${isMenuOpen ? 'hidden' : 'block'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`h-6 w-6 ${isMenuOpen ? 'block' : 'hidden'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* hamburger menu fro mobile screens.............*/}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-800">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeMenu}
              className={`block px-3 py-2 rounded-md text-base font-medium text-white transition-colors
                ${location.pathname === item.path
                  ? 'bg-blue-900 font-semibold'
                  : 'hover:bg-blue-700'
                }`}
              style={{ color: 'white' }} 
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-blue-700">
            <div className="flex items-center px-3 py-2">
              <span className="text-white text-sm font-medium">
                {currentUser.email}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;