import { ActionReducer, createReducer, on } from '@ngrx/store';
import { LoginState } from '@models/store/login-state.model';
import { loginInitialState } from '@store/states/login.state';
import { loginPageActions } from '@store/actions/login-page.actions';
import { inject } from '@angular/core';
import { AuthService } from '@services/auth.service';

export const loginReducer: ActionReducer<LoginState> = createReducer(
  loginInitialState,
  on(loginPageActions.init, (state): LoginState => {
    return ({
      ...state,
      isAuth: inject(AuthService).isAuthenticated()
    });
  }),
  on(loginPageActions.auth, (state): LoginState => ({...state, error: ''})),
  on(loginPageActions.authSuccess, (state): LoginState => ({...state, isAuth: true})),
  on(loginPageActions.authError, (state, {error}): LoginState => ({...state, error})),
  on(loginPageActions.getUserInfoSuccess, (state, {userName}): LoginState => ({...state, userName})),
  on(loginPageActions.logout, (): LoginState => ({...loginInitialState})),
);
