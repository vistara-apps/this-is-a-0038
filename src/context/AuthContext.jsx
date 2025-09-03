import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserData, updateUserData } from '../services/supabase';

// Create the auth context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        // In a real app, this would check for an existing session
        // For now, we'll use mock data
        const userData = await getUserData('1');
        setUser(userData);
      } catch (err) {
        console.error('Auth initialization error:', err);
        setError('Failed to initialize authentication');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Sign in function
  const signIn = async (email, password) => {
    try {
      setLoading(true);
      // In a real app, this would call the Supabase signIn method
      // For now, we'll use mock data
      const userData = await getUserData('1');
      setUser(userData);
      return userData;
    } catch (err) {
      console.error('Sign in error:', err);
      setError('Invalid email or password');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sign up function
  const signUp = async (email, password) => {
    try {
      setLoading(true);
      // In a real app, this would call the Supabase signUp method
      // For now, we'll use mock data
      const userData = {
        id: '1',
        email,
        subscriptionTier: 'Free',
        generationsLeft: 5,
        totalGenerations: 5,
        createdAt: new Date().toISOString()
      };
      setUser(userData);
      return userData;
    } catch (err) {
      console.error('Sign up error:', err);
      setError('Failed to create account');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      setLoading(true);
      // In a real app, this would call the Supabase signOut method
      setUser(null);
    } catch (err) {
      console.error('Sign out error:', err);
      setError('Failed to sign out');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update user function
  const updateUser = async (userData) => {
    try {
      setLoading(true);
      // In a real app, this would call the Supabase update method
      const updatedUser = await updateUserData(user.id, userData);
      setUser({ ...user, ...updatedUser });
      return updatedUser;
    } catch (err) {
      console.error('Update user error:', err);
      setError('Failed to update user data');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Reset password function
  const resetPassword = async (email) => {
    try {
      setLoading(true);
      // In a real app, this would call the Supabase resetPassword method
      // For now, we'll just simulate a successful request
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    } catch (err) {
      console.error('Reset password error:', err);
      setError('Failed to send password reset email');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Context value
  const value = {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    updateUser,
    resetPassword,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

