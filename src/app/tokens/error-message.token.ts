import { inject, InjectionToken } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormControlErrorMessage } from '@models/form-control-error-message.model';

export const ErrorMessage: InjectionToken<FormControlErrorMessage> = new InjectionToken<FormControlErrorMessage>('error messages', {
  providedIn: 'root',
  factory: (): FormControlErrorMessage => {
    const translateService: TranslateService = inject(TranslateService);

    return {
      required: () => translateService.instant('ERRORS.REQUIRED'),
      min: () => translateService.instant('ERRORS.MIN'),
      maxlength: ({requiredLength, actualLength}) => translateService.instant('ERRORS.MAX_LENGTH', {
        requiredLength,
        actualLength
      })
    };
  }
});
