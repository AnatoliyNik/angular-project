import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { KeyValuePipe } from '@angular/common';
import { FormControlErrorPipe } from '@pipes/form-control-error.pipe';

@Component({
  selector: 'app-input-error-message',
  standalone: true,
  imports: [
    KeyValuePipe,
    FormControlErrorPipe,
  ],
  templateUrl: './input-error-message.component.html',
  styleUrl: './input-error-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputErrorMessageComponent {
  @Input({required: true})
  errors: ValidationErrors = {};
}
