/**
 * useResults Hook
 * Manages the logic for retrieving, deleting, and sharing specific test results.
 */

import { useState, useCallback } from 'react';
import { resultsService } from '@/services/storage/resultsService';
import { TestResult } from '@/types';
import { useUI } from '@/context/UIContext';

export const useResults = () => {
  const { showSnackbar } = useUI();
  const [loading, setLoading] = useState(false);

  const getResult = useCallback((id: string): TestResult | null => {
    return resultsService.getResultById(id);
  }, []);

  const removeResult = useCallback((id: string) => {
    const success = resultsService.deleteResult(id);
    if (success) {
      showSnackbar('Result deleted successfully', 'success');
    } else {
      showSnackbar('Failed to delete result', 'error');
    }
    return success;
  }, [showSnackbar]);

  const shareResult = useCallback(async (mentalAge: number, shareId: string) => {
    setLoading(true);
    try {
      // Import dynamically to keep hook light
      const { shareService } = await import('@/services/share/shareService');
      const res = await shareService.shareResult(mentalAge, shareId);
      
      if (res.method === 'clipboard') {
        showSnackbar('Link copied to clipboard!', 'success');
      }
    } finally {
      setLoading(false);
    }
  }, [showSnackbar]);

  return {
    getResult,
    removeResult,
    shareResult,
    loading
  };
};
