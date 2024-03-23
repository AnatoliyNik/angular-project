import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Login } from '@models/login.model';
import { Language } from '@data/constants';

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
    'Change Language': props<{ language: Language }>(),
    'Change Language Success': props<{ language: Language }>(),
    'Change Language Error': props<{ error: string }>(),
    'Logout': emptyProps(),
  }
});
