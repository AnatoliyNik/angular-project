import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '@services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const authService: AuthService = inject(AuthService);
  const token: string | null = authService.token;

  if (token) {
    const cloned: HttpRequest<unknown> = req.clone({
      headers: req.headers.append('Authorization', token)
    });

    return next(cloned);
  }

  return next(req);
};
