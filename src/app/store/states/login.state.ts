import { LoginState } from '@models/store/login-state.model';

export const loginInitialState: LoginState = {
  isAuth: false,
  userName: '',
  error: ''
};
