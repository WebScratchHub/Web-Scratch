import React, { createContext, useState, useEffect, useCallback } from 'react';
import * as dbService from '../services/dbService'; // Assuming conversion to .js
import { auth } from '../services/firebaseConfig';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  const clearAuthError = useCallback(() => setAuthError(null), []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        let dbUser = await dbService.getUserById(firebaseUser.uid);
        if (!dbUser) {
          const userToSave = {
            id: firebaseUser.uid,
            fullName: firebaseUser.displayName || 'New User',
            email: firebaseUser.email,
          };
          await dbService.putUser(userToSave);
          dbUser = userToSave;
        }
        setUser(dbUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async ({ email, password }) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  
  const signup = async ({ fullName, email, password }) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: fullName });
    // onAuthStateChanged will handle setting the user state
  };

  const logout = () => {
    localStorage.removeItem('deviceMode'); // Also clear device mode on logout
    return signOut(auth);
  };

  const value = {
    user,
    isLoggedIn: !!user,
    isLoading,
    authError,
    login,
    logout,
    signup,
    clearAuthError,
    // Add other auth functions (addImages, etc.) here as you convert them
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
