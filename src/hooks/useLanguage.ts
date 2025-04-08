
import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { TranslationKey } from '../translations';

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export type TranslateFunction = (key: TranslationKey | string) => string;
