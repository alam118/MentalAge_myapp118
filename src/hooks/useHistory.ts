/**
 * useHistory Hook
 * Custom hook to manage and filter the user's test history.
 */

import { useMemo } from 'react';
import { useUser } from '@/context/UserContext';
import { TestType } from '@/services/quiz/questionService';

export const useHistory = (filterType?: TestType) => {
  const { history } = useUser();

  const filteredHistory = useMemo(() => {
    if (!filterType) return history;
    return history.filter(item => item.testType === filterType);
  }, [history, filterType]);

  const stats = useMemo(() => {
    if (history.length === 0) return null;
    
    const totalAge = history.reduce((acc, curr) => acc + curr.mentalAgeScore, 0);
    return {
      averageAge: Math.round(totalAge / history.length),
      latestAge: history[0].mentalAgeScore,
      totalTests: history.length,
    };
  }, [history]);

  return {
    history: filteredHistory,
    stats,
    isEmpty: history.length === 0
  };
};
