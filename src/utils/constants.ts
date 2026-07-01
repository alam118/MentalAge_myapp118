/**
 * Application Constants
 * Standardized values used throughout the app for consistency and maintainability.
 */

import { appConfig } from '@/config/appConfig';

// --- Routing Paths ---
export const ROUTES = {
  SPLASH: '/',
  LANGUAGE_SELECT: '/language-selection',
  ONBOARDING: '/onboarding',
  PROFILE_SETUP: '/profile-setup',
  HOME: '/dashboard',
  QUIZ: {
    MENTAL_AGE: '/quiz/mental-age',
    PERSONALITY: '/quiz/personality',
    IQ_STYLE: '/quiz/iq-style',
    EMOTIONAL: '/quiz/emotional-maturity',
    CREATIVITY: '/quiz/creativity',
  },
  RESULTS: '/results',
  DETAILED_RESULTS: '/results/detailed',
  HISTORY: '/history',
  LEADERBOARD: '/leaderboard',
  SETTINGS: '/settings',
  PRIVACY: '/privacy-policy',
} as const;

// --- Local Storage Keys ---
export const STORAGE_KEYS = {
  USER_DATA: 'mat_user_profile',
  APP_STATE: 'mat_app_state',
  QUIZ_HISTORY: 'mat_history',
  LANGUAGE: 'mat_lang',
  THEME: 'mat_theme',
  ONBOARDING_COMPLETE: 'mat_onboarding_done',
  AUTH_TOKEN: 'mat_auth_token', // For potential future backend integration
} as const;

// --- Animation Variants (Framer Motion Defaults) ---
export const ANIMATIONS = {
  PAGE_TRANSITION: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  },
  STAGGER_CONTAINER: {
    animate: { transition: { staggerChildren: 0.1 } }
  },
  FADE_IN_UP: {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  },
  TAP_SCALE: {
    whileTap: { scale: 0.96 },
    whileHover: { scale: 1.02 }
  }
} as const;

// --- Quiz Configuration ---
export const QUIZ_CONSTANTS = {
  DEFAULT_TIMER_SECONDS: 15, // Seconds per question (optional)
  MAX_RETRIES: 3,
  MIN_PROGRESS_TO_SAVE: 1, // Minimum questions answered to trigger auto-save
} as const;

// --- AI Service Constants ---
export const AI_CONSTANTS = {
  REASONING_MODEL: appConfig.ai.models.reasoning,
  FAST_MODEL: appConfig.ai.models.fast,
  DEFAULT_TEMPERATURE: 0.7,
  MAX_TOKENS: 1000,
} as const;

// --- UI / UX Settings ---
export const UI_CONSTANTS = {
  SNACKBAR_DURATION: 3000,
  DOUBLE_BACK_EXIT_INTERVAL: 2000, // ms between back presses to exit
  MAX_HISTORY_ITEMS: 50,
} as const;

// --- Monetization ---
export const AD_PLACEMENT_IDS = {
  HOME_BANNER: 'home_banner',
  QUIZ_END_INTERSTITIAL: 'quiz_end',
  REWARDED_HISTORY_UNLOCK: 'rewarded_history',
} as const;

// --- Social & Share ---
export const SOCIAL_STRINGS = {
  SHARE_MESSAGE: (age: number) => `🎉 My Mental Age is ${age}! Find yours at ${appConfig.url}`,
  HASHTAGS: '#MentalAgeTest #AIAnalyzer #PersonalityQuiz',
} as const;

// --- Disclaimer ---
export const LEGAL = {
  DISCLAIMER_SHORT: "For entertainment purposes only. Not a scientific assessment.",
  DISCLAIMER_FULL: "This test is designed for entertainment purposes only and is not a scientific or medical assessment. It does not replace professional psychological evaluation.",
} as const;
