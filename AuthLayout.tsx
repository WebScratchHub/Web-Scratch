import React from 'react';
import AuthTabs from '@/components/ui/AuthTabs';
import { useNavigate } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  activeTab: 'login' | 'signup';
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, activeTab }) => {
  const navigate = useNavigate();

  const handleTabChange = (tab: 'login' | 'signup') => {
    navigate(tab === 'login' ? '/login' : '/signup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 
            className="text-center text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary cursor-pointer" 
            onClick={() => navigate('/')}
          >
            Web Scratch
          </h1>
          <p className="mt-2 text-center text-sm text-text-secondary">
            {activeTab === 'login' ? 'Welcome back!' : 'Create your account'}
          </p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl shadow-glow-violet-lg border border-white/[.08]">
          <AuthTabs activeTab={activeTab} onTabChange={handleTabChange} />
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
