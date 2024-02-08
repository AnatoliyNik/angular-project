import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { MatDatepicker, MatDatepickerInput } from '@angular/material/datepicker';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { dateFromString } from '@helpers/date-from-string';
import { validateDate } from '@helpers/date-validator';
import { provideMatDateFormats } from '@providers/mat-date-formats.provider';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [
    MatDatepicker,
    MatDatepickerInput,
  ],
  providers: [
    provideMomentDateAdapter(),
    provideMatDateFormats()
  ],
  templateUrl: './date.component.html',
  styleUrl: './date.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateComponent {
  minDate: Date = new Date('01/01/2000');
  maxDate: Date = new Date('12/31/2099');
  stringDate = '';
  date: Date | null = null;

  @Input()
  placeholder = '';

  @ViewChild(MatDatepicker)
  datePicker!: MatDatepicker<Date>;

  onInput(event: Event): void {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    const value: string = inputElement.value;
    const validDateLength = 10;

    this.stringDate = validateDate(value, this.stringDate);

    inputElement.value = this.stringDate;

    if (this.stringDate.length === validDateLength) {
      this.date = dateFromString(this.stringDate);
    }
  }

  openCalendar(): void {
    this.datePicker.open();
  }
}



