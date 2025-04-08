
import { en } from './en';
import { ka } from './ka';

export type Language = 'en' | 'ka';

export type TranslationKey = keyof typeof en;

export const translations = {
  en,
  ka
};
