/**
 * User Context
 * Centralized state management for the user's profile and test history.
 * Ensures profile data and results are reactive across all components.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, TestResult } from '@/types';
import { userService } from '@/services/storage/userService';
import { resultsService } from '@/services/storage/resultsService';

interface UserContextType {
  user: UserProfile | null;
  history: TestResult[];
  isLoading: boolean;
  refreshUser: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  addResult: (result: TestResult) => void;
  clearAllData: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [history, setHistory] = useState<TestResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Loads user data and history from local storage on mount.
   */
  const loadData = () => {
    setIsLoading(true);
    try {
      const profile = userService.getProfile();
      const testHistory = resultsService.getAllResults();
      
      setUser(profile);
      setHistory(testHistory);
    } catch (error) {
      console.error('Failed to load user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const refreshUser = () => loadData();

  const updateProfile = (updates: Partial<UserProfile>) => {
    const updated = userService.updateProfile(updates);
    if (updated) {
      setUser(updated);
    }
  };

  const addResult = (result: TestResult) => {
    // History from resultsService is already updated via its own call,
    // we just sync the local state for reactivity.
    setHistory((prev) => [result, ...prev]);
  };

  const clearAllData = () => {
    userService.deleteAccount();
    setUser(null);
    setHistory([]);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        history,
        isLoading,
        refreshUser,
        updateProfile,
        addResult,
        clearAllData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

/**
 * Custom hook for easy access to User Context
 */
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
