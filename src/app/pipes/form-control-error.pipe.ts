import { inject, Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ErrorMessage } from '@tokens/error-message.token';
import { FormControlErrorMessage } from '@models/form-control-error-message.model';

@Pipe({
  name: 'formControlError',
  standalone: true,
})
export class FormControlErrorPipe implements PipeTransform {
  private errorMessagesMap: FormControlErrorMessage = inject(ErrorMessage);

  transform(key: string, value: ValidationErrors): string {
    if (!this.errorMessagesMap[key]) {
      console.warn(`Missing message for ${key} validator`);
      return '';
    }

    return this.errorMessagesMap[key](value);
  }
}
