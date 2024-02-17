import { CanActivateFn } from '@angular/router';
import { inject, Signal } from '@angular/core';
import { AuthService } from '@services/auth.service';

export const courseGuard: CanActivateFn = (): boolean => {
  const authService: AuthService = inject(AuthService);
  const isAuth: Signal<boolean> = authService.isAuthenticated();

  return isAuth()
};
