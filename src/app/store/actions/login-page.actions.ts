import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Login } from '@models/login.model';

export const loginPageActions = createActionGroup({
  source: 'Login Page',
  events: {
    'Init': emptyProps(),
    'Auth': props<{ user: Login }>(),
    'Auth Success': emptyProps(),
    'Auth Error': props<{ error: string }>(),
    'Get User Info': emptyProps(),
    'Get User Info Success': props<{ userName: string }>(),
    'Get User Info Error': emptyProps(),
    'Logout': emptyProps(),
  }
});
