import { LoginState } from '@models/store/login-state.model';
import { Language } from '@data/constants';

export const loginInitialState: LoginState = {
  isAuth: false,
  userName: '',
  error: '',
  language: Language.En,
  languageError: ''
};
