import { APP_INITIALIZER, Provider } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DateAdapter } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { initializeApplicationFactory } from '@factory/initialize-application.factory';

export const provideInitializeApplication = (): Provider => ({
  provide: APP_INITIALIZER,
  useFactory: initializeApplicationFactory,
  multi: true,
  deps: [TranslateService, DateAdapter, Store]
});
