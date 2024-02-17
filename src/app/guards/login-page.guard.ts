import { CanActivateFn, Router } from '@angular/router';
import { inject, Signal } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { routePath } from '@data/constants';

export const loginPageGuard: CanActivateFn = (): boolean => {
  const authService: AuthService = inject(AuthService);
  const isAuth: Signal<boolean> = authService.isAuthenticated(false);
  const router: Router = inject(Router);

  if (!isAuth()) {
    return true;
  }

  router.navigate([routePath.courses]);

  return false;
};
