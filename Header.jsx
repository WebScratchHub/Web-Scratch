import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from './ui/Button';
import { AnimatePresence, motion } from 'framer-motion';

const Header = () => {
  const { isLoggedIn, logout, user } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = (
    <>
      {isLoggedIn ? (
        <>
          <span className="text-sm text-text-secondary hidden sm:block">
            Welcome, {user?.fullName?.split(' ')[0]}!
          </span>
          <Button variant="ghost" onClick={handleLogout}>Logout</Button>
        </>
      ) : (
        <>
          <Button variant="ghost" onClick={() => navigate('/login')}>Login</Button>
          <Button
            variant="primary"
            onClick={() => navigate('/signup')}
            className="bg-[length:200%_auto] hover:bg-pos-100 transition-all duration-500"
          >
            Sign Up Free
          </Button>
        </>
      )}
    </>
  );

  return (
    <header className="bg-dark-bg/90 backdrop-blur-lg fixed top-0 z-50 w-full border-b border-white/[.08] h-[4.5rem]">
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          <Link to={isLoggedIn ? "/dashboard" : "/"}
            className="text-2xl font-bold bg-clip-text text-transparent bg-primary-gradient bg-[length:200%_auto] animate-gradient"
          >
            Web Scratch
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-2 sm:space-x-4">
            {navLinks}
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-bg/95 border-t border-white/10"
          >
            <nav className="flex flex-col items-center space-y-4 p-4">
              {navLinks}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
