import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  ControlValueAccessor,
  ReactiveFormsModule
} from '@angular/forms';
import { DurationPipe } from '@pipes/duration.pipe';
import { provideNgValueAccessor } from '@providers/ng-value-accessor.provider';
import { OnChangeFn } from '@models/on-change-fn.model';
import { OnTouchedFn } from '@models/on-touched-fn.model';

@Component({
  selector: 'app-duration',
  standalone: true,
  imports: [
    DurationPipe,
    ReactiveFormsModule
  ],
  templateUrl: './duration.component.html',
  styleUrl: './duration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNgValueAccessor(DurationComponent)]
})
export class DurationComponent implements ControlValueAccessor {
  minutes!: number;
  disabled!: boolean;

  private onChange!: OnChangeFn;
  private onTouched!: OnTouchedFn;

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

    this.onChange(this.minutes);
  }

  onBlur(): void {
    this.onTouched();
  }

  writeValue(minutes: number): void {
    this.minutes = minutes;
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
