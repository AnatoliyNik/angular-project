import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withPreloading } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideCustomRouteReuseStrategy } from '@providers/custom-route-reuse-strategy.provider';
import { provideInitializeApplication } from '@providers/initialize-application.provider';
import { provideLoader } from '@providers/loader.provider';
import { NetworkAwarePreloadingStrategy } from '@strategies/network-aware-preloading.strategy';
import { authInterceptor } from '@interceptors/auth.interceptor';
import { loaderInterceptor } from '@interceptors/loader.interceptor';
import { environment } from '@environments/environment.development';

import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { loginFeature } from '@store/features/login-page.feature';
import * as loginEffects from '@store/effects/login-page.effects';

import { TranslateCompiler, TranslateModule } from '@ngx-translate/core';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';

import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

export const appConfig: ApplicationConfig = {
  providers: [
    provideInitializeApplication(),
    provideMomentDateAdapter(),
    provideRouter(routes, withPreloading(NetworkAwarePreloadingStrategy)),
    provideAnimations(),
    provideCustomRouteReuseStrategy(),
    provideHttpClient(withInterceptors([
      authInterceptor,
      loaderInterceptor
    ])),
    provideStore(),
    environment.providers,
    provideState(loginFeature),
    provideEffects(loginEffects),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: provideLoader(),
        compiler: {
          provide: TranslateCompiler,
          useClass: TranslateMessageFormatCompiler
        }
      })
    )
  ]
};
