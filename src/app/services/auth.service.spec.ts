import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { coursesServerUrl } from '@data/constants';
import { Login } from '@models/login.model';
import { UserToken } from '@models/user-token.model';
import { User } from '@models/user.model';
import { AuthService } from '@services/auth.service';
import { CourseService } from '@services/course.service';


describe('AuthService', () => {
  it('should be created', () => {
    const {authService} = setup();
    expect(authService).toBeTruthy();
  });

  it('should get token when login and save it to localStore', () => {
    const {authService, httpTestingController} = setup();
    const token: UserToken = {token: 'test'};
    spyOn(localStorage, 'setItem');

    authService.login({} as Login).subscribe((token) => {
      expect(token.token).toBeTruthy();
      expect(localStorage.setItem).toHaveBeenCalledWith(jasmine.anything(), token.token);
    });

    const req: TestRequest = httpTestingController.expectOne(coursesServerUrl.login);

    expect(req.request.method).toBe('POST');

    req.flush(token);
    httpTestingController.verify();
  });

  it('should remove token from localStore when logout', () => {
    const {authService} = setup();
    spyOn(localStorage, 'removeItem');

    authService.logout();

    expect(localStorage.removeItem).toHaveBeenCalled();
  });

  it('should reset initial data when logout', () => {
    const {authService, courseService} = setup();
    spyOn(courseService, 'resetInitialData');

    authService.logout();

    expect(courseService.resetInitialData).toHaveBeenCalled();
  });

  it('should return token from localStore', () => {
    const {authService} = setup();
    spyOn(localStorage, 'getItem');
    authService.token;

    expect(localStorage.getItem).toHaveBeenCalled();
  });

  it('should return boolean if user is authenticated', () => {
    const {authService} = setup();
    const getItemSpy = spyOn(localStorage, 'getItem');
    getItemSpy.and.returnValue(null);

    expect(authService.isAuthenticated()).toBeFalse();

    getItemSpy.and.returnValue('test');

    expect(authService.isAuthenticated()).toBeTrue();
  });

  it('should get user name', () => {
    const {authService, httpTestingController} = setup();
    const user: User = {
      name: {
        first: 'test first', last: 'test last'
      }
    } as User;

    authService.getUserInfo().subscribe((name) => {
      expect(name).toContain(user.name.first);
      expect(name).toContain(user.name.last);
    });

    const req: TestRequest = httpTestingController.expectOne(coursesServerUrl.userinfo);
    expect(req.request.method).toBe('POST');

    req.flush(user);
    httpTestingController.verify();
  });

  it('should call logout method if there was an error while getting user name', () => {
    const {authService, httpTestingController} = setup();
    spyOn(authService, 'logout');

    authService.getUserInfo().subscribe({
      error: () => {
        expect(authService.logout).toHaveBeenCalled();
      }
    });

    const req: TestRequest = httpTestingController.expectOne(coursesServerUrl.userinfo);
    req.error(new ProgressEvent('error'));
    httpTestingController.verify();
  });
});

function setup() {
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  });

  const authService: AuthService = TestBed.inject(AuthService);
  const httpTestingController: HttpTestingController = TestBed.inject(HttpTestingController);
  const courseService: CourseService = TestBed.inject(CourseService);

  return {
    authService, httpTestingController, courseService
  };
}
