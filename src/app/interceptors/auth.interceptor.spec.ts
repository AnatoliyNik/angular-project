import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';

import {
  HttpTestingController,
  provideHttpClientTesting,
  TestRequest
} from '@angular/common/http/testing';

import { authInterceptor } from './auth.interceptor';
import { AuthService } from '@services/auth.service';

describe('authInterceptor', () => {
  it('should append Authorization header to the request if user authenticated', () => {
    const {httpTestingController, httpClient, url, token} = setup();
    httpClient.get(url).subscribe();
    const req: TestRequest = httpTestingController.expectOne(url);

    expect(req.request.headers.get('Authorization')).toBe(token);

    httpTestingController.verify();
  });

  it('should not append Authorization header to the request if user is not authenticated', () => {
    const {httpTestingController, httpClient, url} = setup(null);
    httpClient.get(url).subscribe();
    const req: TestRequest = httpTestingController.expectOne(url);

    expect(req.request.headers.has('Authorization')).toBeFalse();

    httpTestingController.verify();
  });
});

function setup(token: string | null = 'test token') {

  TestBed.configureTestingModule({
    providers: [
      provideHttpClient(withInterceptors([authInterceptor])),
      provideHttpClientTesting(),
      {
        provide: AuthService,
        useValue: {token}
      }
    ]
  });

  const httpTestingController: HttpTestingController = TestBed.inject(HttpTestingController);
  const httpClient: HttpClient = TestBed.inject(HttpClient);
  const url = '/api/test';

  return {
    httpTestingController,
    httpClient,
    url,
    token
  };
}
