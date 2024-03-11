import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { LogoComponent } from './logo/logo.component';
import { IfAuthenticatedDirective } from '@directives/if-authenticated.directive';
import { Store } from '@ngrx/store';
import { loginFeature } from '@store/features/login-page.feature';
import { loginPageActions } from '@store/actions/login-page.actions';

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

  private store: Store = inject(Store)

  userName: Signal<string> = this.store.selectSignal(loginFeature.selectUserName);

  onLogout(): void {
    this.store.dispatch(loginPageActions.logout())
  }
}
