/**
 * Local Storage Service
 * A production-grade wrapper for browser localStorage with serialization 
 * handling, error catching, and type safety for PWA persistence.
 */

import { STORAGE_KEYS } from '@/utils/constants';
import { UserProfile, TestResult } from '@/types';

export const localStorageService = {
  /**
   * BASE METHODS
   */
  set(key: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value);
      window.localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error saving to localStorage [${key}]:`, error);
    }
  },

  get<T>(key: string): T | null {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (error) {
      console.error(`Error reading from localStorage [${key}]:`, error);
      return null;
    }
  },

  remove(key: string): void {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage [${key}]:`, error);
    }
  },

  /**
   * USER PROFILE MANAGEMENT
   */
  saveUserProfile(profile: UserProfile): void {
    this.set(STORAGE_KEYS.USER_DATA, profile);
  },

  getUserProfile(): UserProfile | null {
    return this.get<UserProfile>(STORAGE_KEYS.USER_DATA);
  },

  /**
   * QUIZ HISTORY MANAGEMENT
   */
  saveTestResult(result: TestResult): void {
    const history = this.getHistory();
    // Prepend the new result so the latest is always at index 0
    const updatedHistory = [result, ...history].slice(0, 50); // Keep last 50 results
    this.set(STORAGE_KEYS.QUIZ_HISTORY, updatedHistory);
  },

  getHistory(): TestResult[] {
    return this.get<TestResult[]>(STORAGE_KEYS.QUIZ_HISTORY) || [];
  },

  clearHistory(): void {
    this.remove(STORAGE_KEYS.QUIZ_HISTORY);
  },

  /**
   * APP STATE & SETTINGS
   */
  saveLanguage(lang: string): void {
    this.set(STORAGE_KEYS.LANGUAGE, lang);
  },

  getLanguage(): string | null {
    return this.get<string>(STORAGE_KEYS.LANGUAGE);
  },

  setOnboardingComplete(): void {
    this.set(STORAGE_KEYS.ONBOARDING_COMPLETE, true);
  },

  isOnboardingComplete(): boolean {
    return !!this.get<boolean>(STORAGE_KEYS.ONBOARDING_COMPLETE);
  },

  /**
   * SYSTEM
   */
  clearAll(): void {
    try {
      window.localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
};
