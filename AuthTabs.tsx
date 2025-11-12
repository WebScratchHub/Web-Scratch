import React from 'react';

interface AuthTabsProps {
  activeTab: 'login' | 'signup';
  onTabChange: (tab: 'login' | 'signup') => void;
}

const AuthTabs: React.FC<AuthTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex border-b border-white/[.08] mb-6">
      <button
        onClick={() => onTabChange('login')}
        className={`flex-1 py-3 text-sm font-medium text-center transition-colors ${
          activeTab === 'login'
            ? 'border-b-2 border-secondary text-secondary'
            : 'text-text-secondary hover:text-text-main'
        }`}
      >
        Login
      </button>
      <button
        onClick={() => onTabChange('signup')}
        className={`flex-1 py-3 text-sm font-medium text-center transition-colors ${
          activeTab === 'signup'
            ? 'border-b-2 border-secondary text-secondary'
            : 'text-text-secondary hover:text-text-main'
        }`}
      >
        Sign Up
      </button>
    </div>
  );
};

export default AuthTabs;