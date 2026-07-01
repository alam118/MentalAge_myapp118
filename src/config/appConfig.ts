/**
 * Global Application Configuration
 * Centralizes environment variables, API settings, and app-wide constants.
 */

export const appConfig = {
  // Environment
  env: import.meta.env.MODE,
  isProduction: import.meta.env.PROD,

  // App Metadata
  name: import.meta.env.VITE_APP_NAME || 'Mental Age Test',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  url: import.meta.env.VITE_APP_URL || 'http://localhost:3000',

  // AI Configuration (Strictly following prompt requirements)
  ai: {
    openRouterApiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
    baseUrl: 'https://openrouter.ai/api/v1/chat/completions',
    models: {
      reasoning: 'liquid/lfm-2.5-1.2b-thinking:free',
      fast: 'google/gemma-3-4b-it:free',
    },
    systemPromptDefaults: {
      temperature: 0.7,
      max_tokens: 1500,
    }
  },

  // Language Support
  languages: [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
    { code: 'de', name: 'German', nativeName: 'Deutsch' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  ] as const,
  defaultLanguage: 'en',

  // Quiz Engine Configuration
  quiz: {
    minQuestions: 20,
    maxQuestions: 40,
    defaultQuestionCount: 20,
    categories: [
      'Lifestyle',
      'Humor',
      'Emotions',
      'Social behavior',
      'Decision making',
      'Habits',
      'Preferences'
    ]
  }
} as const;

export type AppLanguage = typeof appConfig.languages[number]['code'];
