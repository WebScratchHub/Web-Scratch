import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import * as Icons from '../components/ui/Icons'; // Assuming Icons.jsx is created

const getFirebaseAuthErrorMessage = (error) => {
  if (!error.code) return error.message || 'An unexpected error occurred.';
  switch (error.code) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Invalid email or password.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
};

const LoginPage = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login({ email, password });
      navigate('/dashboard'); // Redirect on success
    } catch (err) {
      setError(getFirebaseAuthErrorMessage(err));
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent py-12 px-4 sm:px-6 lg:px-8 pt-[4.5rem]">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl shadow-glow-violet-lg border border-white/[.08]">
          <h2 className="text-center text-3xl font-bold text-white mb-6">Welcome Back!</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              id="email" label="Email address" type="email" autoComplete="email" required
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              id="password" label="Password" type={passwordVisible ? 'text' : 'password'} autoComplete="current-password" required
              value={password} onChange={(e) => setPassword(e.target.value)}
              endIcon={
                <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="text-text-secondary">
                  {passwordVisible ? <Icons.EyeSlashIcon className="h-5 w-5" /> : <Icons.EyeIcon className="h-5 w-5" />}
                </button>
              }
            />
            {error && <p className="text-error text-sm text-center">{error}</p>}
            <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
              {isLoading ? 'Logging in...' : 'Log In'}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-text-secondary">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-secondary hover:text-primary">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
