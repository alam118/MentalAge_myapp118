/**
 * useAuth Hook
 * Handles "Authentication" (Profile existence) and protected route logic.
 */

import { useCallback } from 'react';
import { useUser } from '@/context/UserContext';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';

export const useAuth = () => {
  const { user, clearAllData } = useUser();
  const navigate = useNavigate();

  const isAuthenticated = !!user;

  const logout = useCallback(() => {
    clearAllData();
    navigate(ROUTES.SPLASH);
  }, [clearAllData, navigate]);

  const requireAuth = useCallback(() => {
    if (!isAuthenticated) {
      navigate(ROUTES.PROFILE_SETUP);
      return false;
    }
    return true;
  }, [isAuthenticated, navigate]);

  return {
    user,
    isAuthenticated,
    logout,
    requireAuth
  };
};
