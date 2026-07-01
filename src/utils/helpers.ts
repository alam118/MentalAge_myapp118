/**
 * General Purpose Utility Helpers
 * Production-grade functions for formatting, validation, and system interactions.
 */

import { v4 as uuidv4 } from 'uuid';

/**
 * ID GENERATION
 * Returns a unique string ID for users, results, and sessions.
 */
export const generateId = (): string => uuidv4();

/**
 * DATE FORMATTING
 * Formats timestamps into readable localized strings for History items.
 */
export const formatDate = (timestamp: number, locale: string = 'en-US'): string => {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp));
};

/**
 * ASYNC DELAY
 * Useful for smooth transitions and simulating AI "thinking" time for better UX.
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * TEXT MANIPULATION
 */
export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const truncate = (str: string, length: number): string => {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
};

/**
 * DEVICE INTERACTION
 * Haptic feedback (vibration) for quiz interactions if supported by the device.
 */
export const triggerHaptic = (pattern: number | number[] = 10): void => {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
};

/**
 * NUMBER HELPERS
 */
export const clamp = (num: number, min: number, max: number): number => {
  return Math.min(Math.max(num, min), max);
};

export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

/**
 * OBJECT / ARRAY HELPERS
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * ERROR HANDLING
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'An unexpected error occurred';
};

/**
 * PWA / BROWSER CHECKS
 */
export const isPWA = (): boolean => {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone ||
    document.referrer.includes('android-app://')
  );
};

export const isOnline = (): boolean => {
  return typeof navigator !== 'undefined' && navigator.onLine;
};
