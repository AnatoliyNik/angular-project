import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { coursesServerUrl, routePath } from '@data/constants';
import { HttpClient } from '@angular/common/http';
import { Login } from '@models/login.model';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { UserToken } from '@models/user-token.model';
import { User } from '@models/user.model';
import { CourseService } from '@services/course.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'token';
  private readonly isAuth: WritableSignal<boolean> = signal<boolean>(false);

  private router: Router = inject(Router);
  private http: HttpClient = inject(HttpClient);
  private courseService: CourseService = inject(CourseService);

  login(user: Login): Observable<UserToken> {
    return this.http.post<UserToken>(coursesServerUrl.login, user).pipe(
      tap((token: UserToken) => {
        localStorage.setItem(this.tokenKey, token.token);
        this.isAuth.set(true);
      })
    );
  }

  logout(isNavigateToLoginPage = true): void {
    localStorage.removeItem(this.tokenKey);

    this.isAuth.set(false);

    if (isNavigateToLoginPage) {
      this.courseService.resetInitialLoadingStatus();
      this.router.navigate([routePath.login]);
    }
  }

  isAuthenticated(isNavigateToLoginPage = true): Signal<boolean> {
    const token: string | null = localStorage.getItem(this.tokenKey);

    if (token === null) {
      this.logout(isNavigateToLoginPage);
    } else {
      this.isAuth.set(true);
    }

    return this.isAuth.asReadonly();
  }

  getUserInfo(): Observable<string> {
    const token: UserToken = {
      token: localStorage.getItem(this.tokenKey) || ''
    };

    return this.http.post<User>(coursesServerUrl.userinfo, token).pipe(
      map((user: User) => `${user.name.first} ${user.name.last}`),
      catchError((error) => {
        this.logout();

        return throwError(() => error);
      })
    );
  }

  get token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
