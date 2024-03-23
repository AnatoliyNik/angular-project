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
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatOption, MatSelect, MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    LogoComponent,
    IfAuthenticatedDirective,
    TranslateModule,
    MatSelect,
    MatOption
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  private store: Store = inject(Store);
  private translateService: TranslateService = inject(TranslateService);

  readonly languages: Array<string> = this.translateService.getLangs();

  userName: Signal<string> = this.store.selectSignal(loginFeature.selectUserName);
  currentLanguage: Signal<string> = this.store.selectSignal(loginFeature.selectLanguage);

  onLogout(): void {
    this.store.dispatch(loginPageActions.logout());
  }

  onSelectLanguage(event: MatSelectChange): void {
    this.store.dispatch(loginPageActions.changeLanguage({language: event.value}));
  }
}
