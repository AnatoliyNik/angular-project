import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { loginFeature } from '@store/features/login-page.feature';
import { loginInitialState } from '@store/states/login.state';
import { loginPageActions } from '@store/actions/login-page.actions';

import { LoginPageComponent } from './login-page.component';
import { Login } from '@models/login.model';
import { LoginForm } from '@models/login-form.model';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPageComponent, HttpClientTestingModule, TranslateModule.forRoot()],
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

    const formGroup: FormGroupDirective = loginForm.injector.get(FormGroupDirective);
    (formGroup.form as FormGroup<LoginForm>).reset({name: 'test', password: 'test'});

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
