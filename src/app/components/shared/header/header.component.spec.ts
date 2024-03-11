import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { HeaderComponent } from './header.component';
import { loginFeature } from '@store/features/login-page.feature';
import { loginInitialState } from '@store/states/login.state';
import { loginPageActions } from '@store/actions/login-page.actions';

describe('HeaderComponent', () => {
  it('should create', () => {
    const {headerComponent} = setup();

    expect(headerComponent).toBeTruthy();
  });

  it('should display user name if he pass authentication', () => {
    const {headerComponent, fixture, store} = setup();
    const mockName = 'mock name';

    store.overrideSelector(loginFeature.selectUserName, mockName);
    store.refreshState();
    fixture.detectChanges();

    expect(headerComponent.userName()).toBe(mockName);
  });

  it('should logout when click logout button', () => {
    const {fixture, store} = setup();
    const logoutBtn: DebugElement | null = fixture.debugElement.query(By.css('button'));

    expect(logoutBtn).not.toBeNull();

    spyOn(store, 'dispatch');
    logoutBtn.triggerEventHandler('click');

    expect(store.dispatch).toHaveBeenCalledWith(loginPageActions.logout());
  });
});

function setup() {
  TestBed.configureTestingModule({
    imports: [HeaderComponent],
    providers: [provideMockStore({
      initialState: {
        [loginFeature.name]: {
          ...loginInitialState,
          isAuth: true
        }
      }
    })]
  });

  const fixture: ComponentFixture<HeaderComponent> = TestBed.createComponent(HeaderComponent);
  const headerComponent: HeaderComponent = fixture.componentInstance;
  const store: MockStore = TestBed.inject(MockStore);

  fixture.detectChanges();

  return {
    fixture,
    headerComponent,
    store
  };
}
