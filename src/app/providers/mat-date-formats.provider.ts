import { Provider } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { matDateFormats } from '@data/constants';

export const provideMatDateFormats = (): Provider => ({
  provide: MAT_DATE_FORMATS,
  useValue: matDateFormats
});
