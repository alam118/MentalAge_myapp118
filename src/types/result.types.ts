/**
 * Result Type Definitions
 * Specific interfaces for AI analysis outputs and stored test results.
 */

import { TestType, UserAnswer } from './quiz.types';

export interface AIAnalysis {
  personalitySummary: string;
  strengths: string[];
  weaknesses: string[];
  thinkingStyle: string;
  emotionalStyle: string;
  advice: string;
  brainType: string;
}

export interface TestResult {
  id: string;
  userId: string;
  testType: TestType;
  mentalAgeScore: number;
  chronologicalAge: number;
  timestamp: number;
  answers: UserAnswer[];
  aiAnalysis: AIAnalysis;
  shareId: string;
  metadata?: {
    timeSpentSeconds: number;
    appVersion: string;
    language: string;
  };
}

export interface ComparisonData {
  delta: number;
  status: 'ahead' | 'in-sync' | 'behind';
  percentile?: number;
}
