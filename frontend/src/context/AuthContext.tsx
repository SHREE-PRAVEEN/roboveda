import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types';
import { api } from '../services/api';

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('roboveda_token');
    const storedUser = localStorage.getItem('roboveda_user');

    if (storedToken && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setState(prev => ({
          ...prev,
          user,
          token: storedToken,
          isAuthenticated: true,
          isLoading: false,
        }));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('roboveda_token');
        localStorage.removeItem('roboveda_user');
        setState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await api.login(email, password);
      const { user, token } = response;

      localStorage.setItem('roboveda_token', token);
      localStorage.setItem('roboveda_user', JSON.stringify(user));

      setState(prev => ({
        ...prev,
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await api.signup(name, email, password);
      const { user, token } = response;

      localStorage.setItem('roboveda_token', token);
      localStorage.setItem('roboveda_user', JSON.stringify(user));

      setState(prev => ({
        ...prev,
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Signup failed';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('roboveda_token');
    localStorage.removeItem('roboveda_user');
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  const setUser = (user: User | null) => {
    setState(prev => ({
      ...prev,
      user,
      isAuthenticated: !!user,
    }));
    if (user) {
      localStorage.setItem('roboveda_user', JSON.stringify(user));
    }
  };

  const setToken = (token: string | null) => {
    setState(prev => ({
      ...prev,
      token,
    }));
    if (token) {
      localStorage.setItem('roboveda_token', token);
    } else {
      localStorage.removeItem('roboveda_token');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        signup,
        logout,
        setUser,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
