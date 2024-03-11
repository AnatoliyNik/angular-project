import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

import { CourseService } from '@services/course.service';
import { Login } from '@models/login.model';
import { UserToken } from '@models/user-token.model';
import { User } from '@models/user.model';
import { coursesServerUrl } from '@data/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'token';

  private http: HttpClient = inject(HttpClient);
  private courseService: CourseService = inject(CourseService);

  login(user: Login): Observable<UserToken> {
    return this.http.post<UserToken>(coursesServerUrl.login, user).pipe(
      tap((token: UserToken) => {
        localStorage.setItem(this.tokenKey, token.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.courseService.resetInitialData();
  }

  isAuthenticated(): boolean {
    return Boolean(this.token);
  }

  getUserInfo(): Observable<string> {
    const token: UserToken = {
      token: this.token || ''
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
