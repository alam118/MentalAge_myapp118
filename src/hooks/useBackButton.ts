/**
 * useBackButton Hook
 * Implements the double-back-to-exit functionality for PWA.
 * Shows a snackbar on first back press, exits on second press within 2 seconds.
 */

import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UI_CONSTANTS } from '@/utils/constants';

export const useBackButton = (onExit?: () => void) => {
  const navigate = useNavigate();
  const location = useLocation();
  const lastBackPress = useRef<number>(0);
  const snackbarShown = useRef<boolean>(false);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const now = Date.now();
      const timeSinceLastBack = now - lastBackPress.current;

      // If at root and within 2 seconds of last back press
      if (location.pathname === '/' && timeSinceLastBack < UI_CONSTANTS.DOUBLE_BACK_EXIT_INTERVAL) {
        if (onExit) onExit();
        return;
      }

      // First back press at root
      if (location.pathname === '/') {
        lastBackPress.current = now;
        if (!snackbarShown.current) {
          // Show snackbar (implementation in UI component)
          snackbarShown.current = true;
          setTimeout(() => { snackbarShown.current = false; }, UI_CONSTANTS.DOUBLE_BACK_EXIT_INTERVAL);
        }
        // Push state back to prevent actual navigation
        window.history.pushState(null, '', location.pathname);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [location, onExit]);
};
