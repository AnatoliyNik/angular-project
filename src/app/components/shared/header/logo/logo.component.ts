import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UpperCasePipe } from "@angular/common";

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [
    UpperCasePipe
  ],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent {
  readonly logo = 'video course';
}
