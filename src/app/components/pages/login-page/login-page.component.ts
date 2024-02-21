import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginForm } from '@models/login-form.model';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { routePath } from '@data/constants';
import { Login } from '@models/login.model';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  error: WritableSignal<string> = signal('');

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private destroyRef: DestroyRef = inject(DestroyRef);

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

    this.error.set('');

    const user: Login = {
      login: this.form.controls.name.value,
      password: this.form.controls.password.value
    };

    this.authService.login(user).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: () => {
        this.router.navigate([routePath.courses]);
      },
      error: (err: HttpErrorResponse) => {
        const message = typeof err.error === 'string' ? err.error : err.statusText;
        this.error.set(message);
      }
    });
  }
}
