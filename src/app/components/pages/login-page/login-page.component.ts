import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginForm } from '@models/login-form.model';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { routePath } from '@data/constants';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit {
  readonly title = 'Login';
  readonly nameLabelText = 'Name';
  readonly nameInputPlaceholderText = 'Enter name';
  readonly passwordLabelText = 'Password';
  readonly passwordInputPlaceholderText = 'Enter password';
  readonly loginButtonText = 'Login';
  readonly forgotButtonText = 'Forgot password?';
  readonly required = '*required';

  form!: FormGroup<LoginForm>;

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  ngOnInit(): void {
    this.form = new FormGroup<LoginForm>({
      name: new FormControl<string>('', {nonNullable: true}),
      password: new FormControl<string>('', {nonNullable: true})
    });
  }

  onLogin(): void {
    if (this.form.invalid) {
      return;
    }

    this.authService.login(this.form.controls.name.value);
    this.router.navigate([routePath.courses]);
  }
}
