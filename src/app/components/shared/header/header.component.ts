import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { LogoComponent } from './logo/logo.component';
import { IfAuthenticatedDirective } from '@directives/if-authenticated.directive';
import { AuthService } from '@services/auth.service';

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

  private authService: AuthService = inject(AuthService);

  private isAuth: Signal<boolean> = this.authService.isAuthenticated();

  userName: Signal<string> = computed(() => {
    if (this.isAuth()) {
      return this.authService.getUserInfo();
    }

    return '';
  });

  onLogout(): void {
    this.authService.logout();
  }
}
