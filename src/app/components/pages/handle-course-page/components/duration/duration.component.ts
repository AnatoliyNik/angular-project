import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DurationPipe } from '@pipes/duration.pipe';

@Component({
  selector: 'app-duration',
  standalone: true,
  imports: [
    DurationPipe
  ],
  templateUrl: './duration.component.html',
  styleUrl: './duration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DurationComponent {
  minutes = 0;

  @Input()
  placeholder = '';

  onInput(event: Event): void {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    const value: string = inputElement.value;
    const regexp: RegExp = /^\d*$/;
    const maxLength = 10;
    const isValidInput: boolean = regexp.test(value) && value.length < maxLength;

    if (isValidInput) {
      this.minutes = Number(value);
    }

    inputElement.value = String(this.minutes || '');
  }

}
