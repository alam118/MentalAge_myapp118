/**
 * useLanguage Hook
 * Refined hook for language switching and accessing translation data.
 */

import { useLanguage as useLangContext } from '@/context/LanguageContext';
import { appConfig, AppLanguage } from '@/config/appConfig';
import { en } from '@/data/translations/en';
import { hi } from '@/data/translations/hi';
import { es } from '@/data/translations/es';
import { fr } from '@/data/translations/fr';
import { de } from '@/data/translations/de';
import { it } from '@/data/translations/it';

const translations: Record<string, any> = { en, hi, es, fr, de, it };

export const useLanguage = () => {
  const { language, setLanguage } = useLangContext();

  const t = (path: string): string => {
    const keys = path.split('.');
    let current = translations[language] || translations['en'];
    
    for (const key of keys) {
      if (current[key] === undefined) return path;
      current = current[key];
    }
    
    return current;
  };

  const changeLanguage = (code: AppLanguage) => {
    setLanguage(code);
  };

  const currentLanguageInfo = appConfig.languages.find(l => l.code === language);

  return {
    language,
    changeLanguage,
    t,
    currentLanguageInfo,
    supportedLanguages: appConfig.languages
  };
};
