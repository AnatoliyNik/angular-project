import { ApplicationConfig } from '@angular/core';
import { provideRouter, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideCustomRouteReuseStrategy } from '@providers/custom-route-reuse-strategy.provider';
import { NetworkAwarePreloadingStrategy } from './strategies/network-aware-preloading.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withPreloading(NetworkAwarePreloadingStrategy)
    ),
    provideAnimations(),
    provideCustomRouteReuseStrategy()
  ]
};
