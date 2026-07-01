/**
 * History Service
 * Advanced operations for result history, including data aggregation for charts.
 */

import { localStorageService } from './localStorageService';
import { TestResult } from '@/types';

export const historyService = {
  /**
   * Returns a map of test counts per type.
   */
  getDistribution(): Record<string, number> {
    const history = localStorageService.getHistory();
    return history.reduce((acc, curr) => {
      acc[curr.testType] = (acc[curr.testType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  },

  /**
   * Calculates the average mental age from history.
   */
  getAverageMentalAge(): number {
    const history = localStorageService.getHistory();
    if (history.length === 0) return 0;
    const sum = history.reduce((acc, curr) => acc + curr.mentalAgeScore, 0);
    return Math.round(sum / history.length);
  },

  /**
   * Finds the user's "Best" archetype (the one most frequently assigned).
   */
  getDominantArchetype(): string {
    const history = localStorageService.getHistory();
    if (history.length === 0) return "Explorer";
    
    const counts: Record<string, number> = {};
    history.forEach(r => {
      const type = r.aiAnalysis.brainType;
      counts[type] = (counts[type] || 0) + 1;
    });

    return Object.entries(counts).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
  }
};
