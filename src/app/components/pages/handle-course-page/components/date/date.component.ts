import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { MatDatepicker, MatDatepickerInput, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { dateFromString } from '@helpers/date-from-string';
import { validateDate } from '@helpers/date-validator';
import { provideMatDateFormats } from '@providers/mat-date-formats.provider';
import { provideNgValueAccessor } from '@providers/ng-value-accessor.provider';
import { ControlValueAccessor } from '@angular/forms';
import { OnTouchedFn } from '@models/on-touched-fn.model';
import { OnChangeFn } from '@models/on-change-fn.model';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [
    MatDatepicker,
    MatDatepickerInput,
  ],
  providers: [
    provideMatDateFormats(),
    provideNgValueAccessor(DateComponent)
  ],
  templateUrl: './date.component.html',
  styleUrl: './date.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateComponent implements ControlValueAccessor {
  minDate: Date = new Date('01/01/2000');
  maxDate: Date = new Date('12/31/2099');
  stringDate = '';
  date: Date | null = null;
  disabled!: boolean;

  private onChange!: OnChangeFn;
  private onTouched!: OnTouchedFn;

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
      this.onChange(this.date);
    }
  }

  onDateChange(event: MatDatepickerInputEvent<Date>): void {
    event.targetElement.dispatchEvent(new Event('input', {bubbles: true}));
  }

  openCalendar(): void {
    this.datePicker.open();
  }

  onBlur(): void {
    this.onTouched();
  }

  writeValue(date: Date): void {
    this.date = date;
  }

  registerOnChange(fn: OnChangeFn): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: OnTouchedFn): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}



