import { ApplicationConfig } from '@angular/core';
import { provideRouter, withPreloading } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideCustomRouteReuseStrategy } from '@providers/custom-route-reuse-strategy.provider';
import { NetworkAwarePreloadingStrategy } from '@strategies/network-aware-preloading.strategy';
import { authInterceptor } from '@interceptors/auth.interceptor';
import { loaderInterceptor } from '@interceptors/loader.interceptor';
import { environment } from '@environments/environment.development';

import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { loginFeature } from '@store/features/login-page.feature';
import * as loginEffects from '@store/effects/login-page.effects';

export const appConfig: ApplicationConfig = {
  providers: [
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
    provideEffects(loginEffects)
  ]
};
