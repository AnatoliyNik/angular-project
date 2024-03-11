import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LoginPageComponent } from './login-page.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { loginFeature } from '@store/features/login-page.feature';
import { loginInitialState } from '@store/states/login.state';
import { loginPageActions } from '@store/actions/login-page.actions';
import { Login } from '@models/login.model';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { LoginForm } from '@models/login-form.model';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPageComponent, HttpClientTestingModule],
      providers: [provideMockStore({
        initialState: {
          [loginFeature.name]: {...loginInitialState}
        }
      })]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login when user clicks on login button', () => {
    const loginForm: DebugElement | null = fixture.debugElement.query(By.directive(FormGroupDirective));

    expect(loginForm).not.toBeNull();

    spyOn(store, 'dispatch');
    loginForm.triggerEventHandler('submit');

    const form: FormGroup<LoginForm> = component.form;
    const user: Login = {
      login: form.controls.name.value,
      password: form.controls.password.value
    };

    expect(store.dispatch).toHaveBeenCalledWith(loginPageActions.auth({user}));
  });
});
