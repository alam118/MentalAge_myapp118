/**
 * User Type Definitions
 * Specific interfaces for user profiles, settings, and authentication state.
 */

import { AppLanguage } from '@/config/appConfig';

export type Gender = 'male' | 'female' | 'other' | 'prefer-not-to-say';

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender?: Gender;
  country?: string;
  avatarUrl?: string;
  preferredLanguage: AppLanguage;
  createdAt: number;
  lastActive: number;
}

export interface UserStats {
  totalTestsTaken: number;
  averageMentalAge: number;
  highestMentalAge: number;
  lowestMentalAge: number;
  lastTestDate: number | null;
}

export interface UserContextState {
  user: UserProfile | null;
  stats: UserStats;
  isNewUser: boolean;
  hasCompletedOnboarding: boolean;
}
