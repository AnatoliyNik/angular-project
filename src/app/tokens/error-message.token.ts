import { InjectionToken } from '@angular/core';
import { FormControlErrorMessage } from '@models/form-control-error-message.model';

const message: FormControlErrorMessage = {
  required: () => 'This field is required',
  min: () => 'This field is required',
  maxlength: ({requiredLength, actualLength}) =>
    `Maximum allowed - ${requiredLength} symbols. Now it is - ${actualLength} symbols`
};

export const ErrorMessage: InjectionToken<FormControlErrorMessage> = new InjectionToken<FormControlErrorMessage>('error messages', {
  providedIn: 'root',
  factory: () => message
});
