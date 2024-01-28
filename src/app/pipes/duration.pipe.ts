import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true
})
export class DurationPipe implements PipeTransform {

  transform(value: number): string {
    value = Math.floor(value);

    if (value < 0) {
      value = 0;
    }

    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    let result = '';

    if (hours) {
      result = `${hours}h ${minutes}min`;
    } else {
      result = minutes === 1 ? `1 minute` : `${minutes} minutes`;
    }

    return result;
  }
}
