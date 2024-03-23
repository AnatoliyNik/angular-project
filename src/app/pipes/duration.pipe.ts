import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'duration',
  standalone: true,
  pure: false
})
export class DurationPipe implements PipeTransform {
  private translateService: TranslateService = inject(TranslateService);

  transform(value: number): string {
    value = Math.floor(value);

    if (value < 0) {
      value = 0;
    }

    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    if (hours) {
      return this.translateService.instant('COURSE.DURATION.SHORT_TIME', {hours, minutes});
    }

    return this.translateService.instant('COURSE.DURATION.FULL_TIME', {minutes});
  }
}
