import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import ProfileDropdown from '../ui/ProfileDropdown';

const Header: React.FC = () => {
  const { isLoggedIn, logout, user } = useAuth();

  return (
    <header className="bg-dark-bg/90 backdrop-blur-lg sticky top-0 z-50 border-b border-white/[.08] h-[4.5rem]">
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center space-x-4">
            <Link
              to={isLoggedIn ? "/dashboard" : "/"}
              className="text-2xl font-bold bg-clip-text text-transparent bg-primary-gradient bg-[length:200%_auto] animate-gradient cursor-pointer"
            >
              Web Scratch
            </Link>
             {isLoggedIn && (
                <div className="hidden lg:block text-sm text-text-secondary">
                  Build. Learn. Create. — Powered by AI.
                </div>
            )}
          </div>
          
          <nav className="flex items-center space-x-2 sm:space-x-4">
            {isLoggedIn ? (
              <>
                 <div className="hidden sm:block text-sm text-text-secondary">
                    Welcome back, {user?.fullName?.split(' ')[0]}!
                  </div>
                <ProfileDropdown user={user} onLogout={logout} />
              </>
            ) : (
              <>
                <Link to="/login"><Button variant="ghost">Login</Button></Link>
                <Link to="/signup">
                    <Button 
                    variant="primary" 
                    className="bg-[length:200%_auto] animate-gradient hover:bg-pos-100 transition-all duration-500"
                    >
                    Sign Up Free
                    </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;