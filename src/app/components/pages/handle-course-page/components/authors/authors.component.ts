import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorsComponent {
  @Input()
  placeholder = ''
}
