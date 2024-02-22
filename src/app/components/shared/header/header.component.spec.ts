import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Signal, signal } from '@angular/core';

import { HeaderComponent } from './header.component';
import { AuthService } from '@services/auth.service';
import { Observable, of } from 'rxjs';

describe('HeaderComponent', () => {
  it('should create', () => {
    const {headerComponent} = setup();

    expect(headerComponent).toBeTruthy();
  });

  it('should display user name if he pass authentication', () => {
    const {headerComponent, fixture, authServiceStub} = setup();

    expect(headerComponent.userName()).toBe('');

    authServiceStub.isAuth.set(true);
    fixture.detectChanges();

    expect(headerComponent.userName()).toBe(authServiceStub.user);
  });

  it('should logout when click logout button', () => {
    const {fixture, authServiceStub} = setup(true);
    const logoutSpy = spyOn(authServiceStub, 'logout');
    const logoutBtn: DebugElement | null = fixture.debugElement.query(By.css('button'));

    expect(logoutBtn).not.toBeNull();

    logoutBtn.triggerEventHandler('click');

    expect(logoutSpy).toHaveBeenCalled();
  });
});

function setup(isAuth = false) {
  const authServiceStub = {
    isAuth: signal<boolean>(isAuth),
    user: 'mock user',

    isAuthenticated(): Signal<boolean> {
      return this.isAuth.asReadonly();
    },

    getUserInfo(): Observable<string> {
      return of(this.user);
    },

    logout(): void {
    }
  };

  TestBed.configureTestingModule({
    imports: [HeaderComponent, HttpClientTestingModule],
    providers: [{provide: AuthService, useValue: authServiceStub}]
  });

  const fixture: ComponentFixture<HeaderComponent> = TestBed.createComponent(HeaderComponent);
  const headerComponent: HeaderComponent = fixture.componentInstance;

  fixture.detectChanges();

  return {
    fixture,
    headerComponent,
    authServiceStub
  };
}
