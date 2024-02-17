import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { routePath } from '@data/constants';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundPageComponent {
  readonly title = '404';
  readonly returnButtonText = 'Go to main page';

  private router: Router = inject(Router);

  onReturn(): void {
    this.router.navigate([routePath.courses]);
  }
}
