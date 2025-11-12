import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import AuthLayout from '@/components/pages/AuthLayout';
import * as Icons from '@/components/ui/Icons';
import Checkbox from '@/components/ui/Checkbox';

const getFirebaseAuthErrorMessage = (error: any): string => {
  if (error.code) {
      switch (error.code) {
          case 'auth/user-not-found':
          case 'auth/wrong-password':
          case 'auth/invalid-credential':
              return 'Invalid email or password.';
          case 'auth/invalid-email':
              return 'Please enter a valid email address.';
          case 'auth/popup-closed-by-user':
              return 'Sign-in process was cancelled.';
          default:
              return 'An unexpected error occurred. Please try again.';
      }
  }
  return error.message || 'An unexpected error occurred.';
};


const LoginPage: React.FC = () => {
  const { login, authError, clearAuthError } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (authError) {
      setError(authError);
      clearAuthError();
    }
  }, [authError, clearAuthError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
        await login({ email, password });
        navigate('/dashboard');
    } catch (err) {
        setError(getFirebaseAuthErrorMessage(err));
    }
    setIsLoading(false);
  };
  
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <AuthLayout activeTab="login">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input
          id="email"
          label="Email address"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          id="password"
          label="Password"
          type={passwordVisible ? 'text' : 'password'}
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          endIcon={
            <button type="button" onClick={togglePasswordVisibility} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              {passwordVisible ? (
                <Icons.EyeSlashIcon className="h-5 w-5" />
              ) : (
                <Icons.EyeIcon className="h-5 w-5" />
              )}
            </button>
          }
        />
        <div className="flex items-center justify-between">
            <Checkbox id="remember-me" label="Remember me" />
            <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-secondary">
                    Forgot your password?
                </a>
            </div>
        </div>
        {error && <p className="text-error text-sm text-center">{error}</p>}
        <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
          {isLoading ? 'Logging in...' : 'Log In'}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
