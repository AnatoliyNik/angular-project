import { Language } from '@data/constants';

export interface LoginState {
  isAuth: boolean;
  userName: string;
  error: string;
  language: Language;
  languageError: string;
}
