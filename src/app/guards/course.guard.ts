import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { loginFeature } from '@store/features/login-page.feature';
import { Observable } from 'rxjs';

export const courseGuard: CanActivateFn = (): Observable<boolean> => {
  const store: Store = inject(Store);

  return store.select(loginFeature.selectIsAuth);
};
