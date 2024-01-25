import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LogoComponent } from "./logo/logo.component";

@Component({
  selector: 'app-header',
  standalone: true,
    imports: [
        LogoComponent
    ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  readonly logoutButtonText = 'Log out';
}
