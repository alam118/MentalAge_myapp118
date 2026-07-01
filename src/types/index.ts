/**
 * Core Type Definitions
 * Centralized interfaces for the application data model.
 */

// --- User Types ---
export type Gender = 'male' | 'female' | 'other' | 'prefer-not-to-say';

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender?: Gender;
  country?: string;
  preferredLanguage: string;
  createdAt: number;
  lastActive: number;
}

// --- Quiz Types ---
export type QuizCategory = 
  | 'Lifestyle'
  | 'Humor'
  | 'Emotions'
  | 'Social behavior'
  | 'Decision making'
  | 'Habits'
  | 'Preferences';

export interface AnswerOption {
  id: string;
  text: string;
  weight: number; // Used for calculation logic
}

export interface Question {
  id: string;
  category: QuizCategory;
  text: string;
  options: AnswerOption[];
}

export interface UserAnswer {
  questionId: string;
  optionId: string;
  category: QuizCategory;
  weight: number;
}

// --- AI & Analysis Types ---
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
  testType: 'mental-age' | 'personality' | 'iq-style' | 'emotional' | 'creativity';
  mentalAgeScore: number;
  chronologicalAge: number;
  timestamp: number;
  answers: UserAnswer[];
  aiAnalysis: AIAnalysis;
  shareId: string;
}

// --- App State Types ---
export interface AppHistory {
  results: TestResult[];
}

export interface AppState {
  user: UserProfile | null;
  history: TestResult[];
  isPremium: boolean;
  language: string;
  hasCompletedOnboarding: boolean;
}

// --- API & OpenRouter Types ---
export interface AIRequestPayload {
  model: string;
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  temperature?: number;
  max_tokens?: number;
}

export interface AIResponse {
  id: string;
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}
