/**
 * Translation Index
 * Centralized export for all supported languages.
 */

import { en } from './en';
import { hi } from './hi';
import { es } from './es';
import { fr } from './fr';
import { de } from './de';
import { it } from './it';
import { TranslationSchema } from '@/types/language.types';

export const translations: Record<string, TranslationSchema> = {
  en,
  hi,
  es,
  fr,
  de,
  it,
};

export default translations;
