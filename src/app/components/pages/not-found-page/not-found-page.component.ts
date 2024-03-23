import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RoutePath } from '@data/constants';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundPageComponent {
  private router: Router = inject(Router);

  onReturn(): void {
    this.router.navigate([RoutePath.Courses]);
  }
}
