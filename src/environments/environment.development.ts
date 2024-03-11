import { isDevMode } from '@angular/core';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const environment = {
  production: false,
  coursesServerUrl: 'http://localhost:3004/',
  providers: [
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    })
  ]
};
