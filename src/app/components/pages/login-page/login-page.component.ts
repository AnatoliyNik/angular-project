import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { LoginForm } from '@models/login-form.model';
import { Login } from '@models/login.model';

import { Store } from '@ngrx/store';
import { loginPageActions } from '@store/actions/login-page.actions';
import { loginFeature } from '@store/features/login-page.feature';
import { ShowErrorDirective } from '@directives/show-error.directive';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ShowErrorDirective,
    TranslateModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit {
  private store: Store = inject(Store);

  error: Signal<string> = this.store.selectSignal(loginFeature.selectError);

  form!: FormGroup<LoginForm>;

  ngOnInit(): void {
    this.form = new FormGroup<LoginForm>({
      name: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      password: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required]
      })
    });
  }

  onLogin(): void {
    if (this.form.invalid || this.form.pending) {
      return;
    }

    const user: Login = {
      login: this.form.controls.name.value,
      password: this.form.controls.password.value
    };

    this.store.dispatch(loginPageActions.auth({user}));
  }
}
