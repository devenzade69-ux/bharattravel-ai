import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userProfile, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
      setMobileMenuOpen(false);
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const displayName = userProfile?.name || user?.displayName || user?.email?.split('@')[0] || 'Traveler';

  return (
    <header className="w-full top-0 sticky z-50 bg-surface dark:bg-on-surface border-b border-outline-variant/20 shadow-sm transition-all duration-300">
      <nav className="flex justify-between items-center h-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Brand Logo */}
        <Link 
          to="/" 
          className="text-headline-md font-headline-md text-primary dark:text-primary-fixed tracking-tight hover:opacity-90 transition-opacity font-bold"
        >
          BharatTravel AI
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/plan"
            className={`font-body-md text-body-md transition-colors cursor-pointer active:opacity-80 py-1 ${
              isActive('/plan')
                ? 'text-primary dark:text-primary-fixed font-bold border-b-2 border-primary'
                : 'text-secondary dark:text-secondary-fixed hover:text-primary-container dark:hover:text-primary-fixed-dim'
            }`}
          >
            Plan a Trip
          </Link>
          <Link
            to="/saved-trips"
            className={`font-body-md text-body-md transition-colors cursor-pointer active:opacity-80 py-1 ${
              isActive('/saved-trips')
                ? 'text-primary dark:text-primary-fixed font-bold border-b-2 border-primary'
                : 'text-secondary dark:text-secondary-fixed hover:text-primary-container dark:hover:text-primary-fixed-dim'
            }`}
          >
            Saved Trips
          </Link>
        </div>

        {/* User / Auth Action Controls */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/profile"
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${
                  isActive('/profile') 
                    ? 'bg-secondary-container text-primary font-bold border border-primary/30' 
                    : 'hover:bg-surface-container text-on-surface'
                }`}
                title="Profile"
              >
                <span className="material-symbols-outlined text-xl text-primary" data-icon="account_circle">
                  account_circle
                </span>
                <span className="font-label-lg text-label-lg max-w-[120px] truncate">{displayName}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="font-label-md text-label-md text-error hover:bg-error-container/30 px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                title="Logout"
              >
                <span className="material-symbols-outlined text-lg" data-icon="logout">
                  logout
                </span>
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className={`font-body-md text-body-md px-4 py-2 transition-colors cursor-pointer ${
                  isActive('/login')
                    ? 'text-primary dark:text-primary-fixed font-bold border-b-2 border-primary'
                    : 'text-secondary dark:text-secondary-fixed hover:text-primary-container dark:hover:text-primary-fixed-dim'
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-primary text-white font-label-lg px-4 py-2 rounded-full hover:bg-primary-container transition-colors shadow-sm font-semibold"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-primary dark:text-primary-fixed focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-2xl" data-icon={mobileMenuOpen ? 'close' : 'menu'}>
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface dark:bg-on-surface border-b border-outline-variant/30 px-margin-mobile py-4 space-y-3 shadow-lg">
          <Link
            to="/plan"
            onClick={() => setMobileMenuOpen(false)}
            className={`block font-body-md text-body-md py-2 border-b border-outline-variant/10 ${
              isActive('/plan') ? 'text-primary font-bold' : 'text-secondary'
            }`}
          >
            Plan a Trip
          </Link>
          <Link
            to="/saved-trips"
            onClick={() => setMobileMenuOpen(false)}
            className={`block font-body-md text-body-md py-2 border-b border-outline-variant/10 ${
              isActive('/saved-trips') ? 'text-primary font-bold' : 'text-secondary'
            }`}
          >
            Saved Trips
          </Link>

          {user ? (
            <>
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className={`block font-body-md text-body-md py-2 border-b border-outline-variant/10 ${
                  isActive('/profile') ? 'text-primary font-bold' : 'text-secondary'
                }`}
              >
                My Profile ({displayName})
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left font-body-md text-body-md py-2 text-error flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg" data-icon="logout">
                  logout
                </span>
                Logout
              </button>
            </>
          ) : (
            <div className="pt-2 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full font-body-md text-body-md py-2 text-primary font-bold border border-primary/30 rounded-xl"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full font-body-md text-body-md py-2 bg-primary text-white font-bold rounded-xl"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
