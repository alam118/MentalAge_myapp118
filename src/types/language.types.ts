/**
 * Language Type Definitions
 * Interfaces for localization strings and translation files.
 */

export interface TranslationSchema {
  common: {
    next: string;
    back: string;
    continue: string;
    start: string;
    finish: string;
    loading: string;
    save: string;
    cancel: string;
  };
  onboarding: {
    title1: string;
    desc1: string;
    title2: string;
    desc2: string;
    title3: string;
    desc3: string;
  };
  home: {
    welcome: string;
    pickTest: string;
    realAge: string;
  };
  quiz: {
    question: string;
    of: string;
    mentalAge: string;
  };
  results: {
    title: string;
    share: string;
    backHome: string;
    personality: string;
  };
}

export type LanguageCode = 'en' | 'hi' | 'es' | 'fr' | 'de' | 'it';
