import { useState, useEffect, useCallback } from 'react';
import * as githubService from '../services/githubService';

// In a real application, this would come from environment variables.
const GITHUB_CLIENT_ID = 'Ov23li3JjG4g6v7J5A8B'; // Example public client ID

export interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
}

export const useGitHubAuth = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('github_token'));
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (token && !user) {
        setIsLoading(true);
        try {
          const userData = await githubService.getUser(token);
          setUser(userData);
        } catch (error) {
          console.error("Failed to fetch GitHub user, token might be invalid.", error);
          logout();
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchUser();
  }, [token, user]);

  const login = () => {
    const redirectUri = window.location.origin + window.location.pathname;
    const scope = 'public_repo,user:email';
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${redirectUri}&scope=${scope}`;
    window.location.href = authUrl;
  };

  const logout = useCallback(() => {
    localStorage.removeItem('github_token');
    setToken(null);
    setUser(null);
  }, []);

  const handleCallback = useCallback(async (code: string) => {
    setIsLoading(true);
    try {
      const accessToken = await githubService.exchangeCodeForToken(code);
      localStorage.setItem('github_token', accessToken);
      setToken(accessToken);
      const userData = await githubService.getUser(accessToken);
      setUser(userData);
    } catch (error) {
      console.error("GitHub OAuth callback error:", error);
      // In a real app, show a user-facing error
    } finally {
      setIsLoading(false);
      // Clean up the URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Handle the OAuth callback on initial load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
        handleCallback(code);
    }
  }, [handleCallback]);

  return { token, user, isLoading, login, logout, handleCallback };
};