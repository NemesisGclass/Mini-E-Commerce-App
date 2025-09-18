'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { authAPI } from '@/lib/api';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<User>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (typeof window !== 'undefined') {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          try {
            setToken(storedToken);
            const response = await authAPI.getProfile();
            setUser(response.data);
          } catch (error) {
            console.error('Failed to fetch user profile:', error);
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
          }
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authAPI.login({ email, password });
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', response.data.token);
    }
    setToken(response.data.token);
    setUser(response.data.user);
  };

  const register = async (username: string, email: string, password: string) => {
    const response = await authAPI.register({ username, email, password });
    return response.data;
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
