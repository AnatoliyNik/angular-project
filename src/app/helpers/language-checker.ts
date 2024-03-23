import { Language } from '@data/constants';

export const isLanguage = (language: string | undefined): language is Language =>
  Boolean(language && Object.values(Language).includes(language as Language));
