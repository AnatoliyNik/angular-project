import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';

import { courseGuard } from '@guards/course.guard';
import { loginFeature } from '@store/features/login-page.feature';
import { loginInitialState } from '@store/states/login.state';

describe('courseGuard', () => {
  it('should allow access when user is authenticated', () => {
    const {result} = setup();

    (result as Observable<boolean>).subscribe(result => {
      expect(result).toBeTrue();
    });
  });

  it('should not allow access when user is not authenticated', () => {
    const {result} = setup(false);

    (result as Observable<boolean>).subscribe(result => {
      expect(result).toBeFalse();
    });
  });
});


function setup(isAuth = true) {
  TestBed.configureTestingModule({
    providers: [provideMockStore({
      initialState: {
        [loginFeature.name]: {
          ...loginInitialState,
          isAuth
        }
      }
    })]
  });

  const result = TestBed.runInInjectionContext(() =>
    courseGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
  );

  return {
    result
  };
}
