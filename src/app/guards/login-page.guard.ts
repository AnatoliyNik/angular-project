import { CanActivateFn, Router } from '@angular/router';
import { inject, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { loginFeature } from '@store/features/login-page.feature';
import { RoutePath } from '@data/constants';

export const loginPageGuard: CanActivateFn = (): boolean => {
  const store: Store = inject(Store);
  const isAuth: Signal<boolean> = store.selectSignal(loginFeature.selectIsAuth);
  const router: Router = inject(Router);

  if (!isAuth()) {
    return true;
  }

  router.navigate([RoutePath.Courses]);

  return false;
};
