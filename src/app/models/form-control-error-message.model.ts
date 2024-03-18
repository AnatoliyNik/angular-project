import { ValidationErrors } from '@angular/forms';

export interface FormControlErrorMessage {
  [key: string]: (arg: ValidationErrors) => string;
}


