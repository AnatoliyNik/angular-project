import { Provider } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from '../strategies/custom-route-reuse.strategy';

export const provideCustomRouteReuseStrategy = (): Provider => ({
  provide: RouteReuseStrategy,
  useClass: CustomRouteReuseStrategy
});
