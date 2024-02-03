import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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

  onLogout(): void {
    this.authService.logout();
  }
}
