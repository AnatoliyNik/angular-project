import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, exhaustMap, first, map, of, switchMap, tap } from 'rxjs';

import { AuthService } from '@services/auth.service';
import { RoutePath } from '@data/constants';

import { Store } from '@ngrx/store';
import { Actions, createEffect, FunctionalEffect, ofType } from '@ngrx/effects';
import { loginPageActions } from '@store/actions/login-page.actions';
import { loginFeature } from '@store/features/login-page.feature';
import { TranslateService } from '@ngx-translate/core';

export const init: FunctionalEffect = createEffect((
    actions$: Actions = inject(Actions),
    store: Store = inject(Store)
  ) => {
    return actions$.pipe(
      ofType(loginPageActions.init),
      switchMap(() => store.select(loginFeature.selectIsAuth).pipe(
        first()
      )),
      map((isAuth) => {
        if (isAuth) {
          return loginPageActions.getUserInfo();
        }

        return loginPageActions.logout();
      })
    );
  },
  {functional: true}
);

export const auth: FunctionalEffect = createEffect((
    actions$: Actions = inject(Actions),
    authService: AuthService = inject(AuthService),
  ) => {
    return actions$.pipe(
      ofType(loginPageActions.auth),
      exhaustMap(({user}) => authService.login(user).pipe(
        map(() => loginPageActions.authSuccess()),
        catchError((err: HttpErrorResponse) => {
          const error = typeof err.error === 'string' ? err.error : err.statusText;

          return of(loginPageActions.authError({error}));
        })
      ))
    );
  },
  {functional: true}
);

export const authSuccess: FunctionalEffect = createEffect((
    actions$: Actions = inject(Actions),
    router: Router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(loginPageActions.authSuccess),
      map(() => {
        router.navigate([RoutePath.Courses]);

        return loginPageActions.getUserInfo();
      })
    );
  },
  {functional: true}
);

export const getUserInfo: FunctionalEffect = createEffect((
    actions$: Actions = inject(Actions),
    authService: AuthService = inject(AuthService),
  ) => {
    return actions$.pipe(
      ofType(loginPageActions.getUserInfo),
      exhaustMap(() => authService.getUserInfo().pipe(
        map((userName) => loginPageActions.getUserInfoSuccess({userName})),
        catchError(() => of(loginPageActions.getUserInfoError()))
      ))
    );
  },
  {functional: true}
);

export const getUserInfoError: FunctionalEffect = createEffect((
    actions$: Actions = inject(Actions),
  ) => {
    return actions$.pipe(
      ofType(loginPageActions.getUserInfoError),
      map(() => loginPageActions.logout()),
    );
  },
  {functional: true}
);

export const languageChange: FunctionalEffect = createEffect((
    actions$: Actions = inject(Actions),
    translateService: TranslateService = inject(TranslateService)
  ) => {
    return actions$.pipe(
      ofType(loginPageActions.changeLanguage),
      switchMap(({language}) =>
        translateService.use(language).pipe(
          map(() => loginPageActions.changeLanguageSuccess({language})),
          catchError((error: HttpErrorResponse) => of(loginPageActions.changeLanguageError({error: error.message})))
        )
      )
    );
  },
  {functional: true}
);

export const logout: FunctionalEffect = createEffect((
    actions$: Actions = inject(Actions),
    authService: AuthService = inject(AuthService),
    router: Router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(loginPageActions.logout),
      tap(() => {
        authService.logout();
        router.navigate([RoutePath.Login]);
      })
    );
  },
  {functional: true, dispatch: false}
);
