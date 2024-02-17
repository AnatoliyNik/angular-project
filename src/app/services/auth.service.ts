import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { routePath } from '@data/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly userNameKey = 'userName';
  private readonly tokenKey = 'token';
  private readonly isAuth: WritableSignal<boolean> = signal<boolean>(false);

  private router: Router = inject(Router);

  login(name: string): void {
    localStorage.setItem(this.tokenKey, 'token');
    localStorage.setItem(this.userNameKey, name);

    this.isAuth.set(true);
  }

  logout(isNavigateToLoginPage = true): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userNameKey);

    this.isAuth.set(false);

    if (isNavigateToLoginPage) {
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

  getUserInfo(): string {
    return localStorage.getItem(this.userNameKey) || '';
  }
}
