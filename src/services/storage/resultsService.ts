/**
 * Results Service
 * Manages the storage, retrieval, and manipulation of test results.
 * Handles result generation, sharing IDs, and history management.
 */

import { TestResult, AIAnalysis, UserAnswer } from '@/types';
import { localStorageService } from './localStorageService';
import { generateId } from '@/utils/helpers';
import { TestType } from '@/services/quiz/questionService';

export const resultsService = {
  /**
   * Creates and saves a complete test result.
   */
  saveResult(params: {
    userId: string;
    testType: TestType;
    mentalAgeScore: number;
    chronologicalAge: number;
    answers: UserAnswer[];
    aiAnalysis: AIAnalysis;
  }): TestResult {
    const { userId, testType, mentalAgeScore, chronologicalAge, answers, aiAnalysis } = params;

    const result: TestResult = {
      id: generateId(),
      userId,
      testType,
      mentalAgeScore,
      chronologicalAge,
      timestamp: Date.now(),
      answers,
      aiAnalysis,
      shareId: this.generateShareId(),
    };

    // Save to localStorage
    localStorageService.saveTestResult(result);

    return result;
  },

  /**
   * Retrieves all test results for the current user.
   */
  getAllResults(): TestResult[] {
    return localStorageService.getHistory();
  },

  /**
   * Gets the most recent result.
   */
  getLatestResult(): TestResult | null {
    const results = this.getAllResults();
    return results.length > 0 ? results[0] : null;
  },

  /**
   * Retrieves a specific result by ID.
   */
  getResultById(id: string): TestResult | null {
    const results = this.getAllResults();
    return results.find((r) => r.id === id) || null;
  },

  /**
   * Retrieves a result by share ID (for social sharing features).
   */
  getResultByShareId(shareId: string): TestResult | null {
    const results = this.getAllResults();
    return results.find((r) => r.shareId === shareId) || null;
  },

  /**
   * Filters results by test type.
   */
  getResultsByType(testType: TestType): TestResult[] {
    const results = this.getAllResults();
    return results.filter((r) => r.testType === testType);
  },

  /**
   * Returns results from the last N days.
   */
  getRecentResults(days: number = 7): TestResult[] {
    const cutoffTime = Date.now() - days * 24 * 60 * 60 * 1000;
    const results = this.getAllResults();
    return results.filter((r) => r.timestamp >= cutoffTime);
  },

  /**
   * Deletes a specific result by ID.
   */
  deleteResult(id: string): boolean {
    const results = this.getAllResults();
    const filtered = results.filter((r) => r.id !== id);

    if (filtered.length === results.length) {
      return false; // No result was deleted
    }

    localStorageService.set('mat_history', filtered);
    return true;
  },

  /**
   * Clears all test history.
   */
  clearAllResults(): void {
    localStorageService.clearHistory();
  },

  /**
   * Generates statistics across all results.
   */
  getStatistics(): {
    totalTests: number;
    averageMentalAge: number;
    mostRecentTestDate: number | null;
    testsByType: Record<TestType, number>;
  } {
    const results = this.getAllResults();

    if (results.length === 0) {
      return {
        totalTests: 0,
        averageMentalAge: 0,
        mostRecentTestDate: null,
        testsByType: {
          'mental-age': 0,
          'personality': 0,
          'iq-style': 0,
          'emotional': 0,
          'creativity': 0,
        },
      };
    }

    const totalTests = results.length;
    const averageMentalAge =
      results.reduce((sum, r) => sum + r.mentalAgeScore, 0) / totalTests;
    const mostRecentTestDate = results[0].timestamp;

    const testsByType: Record<TestType, number> = {
      'mental-age': 0,
      'personality': 0,
      'iq-style': 0,
      'emotional': 0,
      'creativity': 0,
    };

    results.forEach((r) => {
      testsByType[r.testType] = (testsByType[r.testType] || 0) + 1;
    });

    return {
      totalTests,
      averageMentalAge: Math.round(averageMentalAge),
      mostRecentTestDate,
      testsByType,
    };
  },

  /**
   * Generates a unique shareable ID for a result.
   */
  generateShareId(): string {
    // Generate a short, URL-safe ID (8 characters)
    return generateId().substring(0, 8);
  },

  /**
   * Exports a result as a shareable JSON object.
   */
  exportResult(result: TestResult): string {
    return JSON.stringify({
      mentalAge: result.mentalAgeScore,
      brainType: result.aiAnalysis.brainType,
      timestamp: result.timestamp,
      shareId: result.shareId,
    });
  },

  /**
   * Calculates improvement over time (comparing first and latest result).
   */
  getImprovement(): {
    hasImprovement: boolean;
    delta: number;
    percentage: number;
  } | null {
    const results = this.getAllResults();
    
    if (results.length < 2) return null;

    const latest = results[0];
    const oldest = results[results.length - 1];

    const delta = latest.mentalAgeScore - oldest.mentalAgeScore;
    const percentage = oldest.mentalAgeScore !== 0 
      ? Math.round((delta / oldest.mentalAgeScore) * 100)
      : 0;

    return {
      hasImprovement: delta > 0,
      delta,
      percentage,
    };
  }
};
