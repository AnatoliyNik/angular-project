import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

import { HeaderComponent } from '@component/shared/header/header.component';
import { FooterComponent } from '@component/shared/footer/footer.component';
import { BreadcrumbsComponent } from '@component/pages/courses-page/components/breadcrumbs/breadcrumbs.component';
import { IfAuthenticatedDirective } from '@directives/if-authenticated.directive';
import { loginPageActions } from '@store/actions/login-page.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, BreadcrumbsComponent, IfAuthenticatedDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(store: Store) {
    store.dispatch(loginPageActions.init())
  }
}
