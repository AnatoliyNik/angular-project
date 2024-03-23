import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { loginPageGuard } from '@guards/login-page.guard';
import { loginFeature } from '@store/features/login-page.feature';
import { loginInitialState } from '@store/states/login.state';
import { RoutePath } from '@data/constants';

describe('loginPageGuard', () => {
  it('should allow access when user is not authenticated', () => {
    const {result} = setup();
    expect(result).toBe(true);
  });

  it('should not allow access when user is authenticated and should navigate to courses page', () => {
    const {result, router} = setup(true);

    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith([RoutePath.Courses]);
  });
});

function setup(isAuth = false) {
  TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    providers: [
      provideMockStore({
        initialState: {
          [loginFeature.name]: {
            ...loginInitialState,
            isAuth
          }
        }
      })
    ]
  });

  const router: Router = TestBed.inject(Router);
  spyOn(router, 'navigate');

  const result = TestBed.runInInjectionContext(() =>
    loginPageGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
  );

  return {
    result,
    router
  };
}
