import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly userNameKey = 'userName';
  private readonly tokenKey = 'token';
  private readonly isAuth: WritableSignal<boolean> = signal<boolean>(true);

  login(name: string): void {
    localStorage.setItem(this.tokenKey, 'token');
    localStorage.setItem(this.userNameKey, name);
    this.isAuth.set(true);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userNameKey);
    this.isAuth.set(false);
  }

  isAuthenticated(): Signal<boolean> {
    return this.isAuth.asReadonly();
  }

  getUserInfo(): string {
    return localStorage.getItem(this.userNameKey) || '';
  }
}
