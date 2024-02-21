import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
  Signal,
  WritableSignal
} from '@angular/core';
import { LogoComponent } from './logo/logo.component';
import { IfAuthenticatedDirective } from '@directives/if-authenticated.directive';
import { AuthService } from '@services/auth.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    LogoComponent,
    IfAuthenticatedDirective
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  readonly logoutButtonText = 'Log out';
  userName: WritableSignal<string> = signal<string>('');

  private authService: AuthService = inject(AuthService);

  private isAuth: Signal<boolean> = this.authService.isAuthenticated();

  constructor() {
    effect(() => {
      if (this.isAuth()) {
        this.authService.getUserInfo().pipe(
          first()
        ).subscribe((userName: string) => {
          this.userName.set(userName);
        });
      }
    });
  }

  onLogout(): void {
    this.authService.logout();
  }
}
