import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { EffectiveType, NavigatorWithConnection } from '@models/network-information.model';

@Injectable({
  providedIn: 'root'
})
export class NetworkAwarePreloadingStrategy implements PreloadingStrategy {
  preload(_route: Route, fn: () => Observable<unknown>): Observable<unknown> {
    const navigator: NavigatorWithConnection = window.navigator;
    const saveData: boolean | undefined = navigator.connection?.saveData;
    const effectiveType: EffectiveType | undefined = navigator.connection?.effectiveType;
    const isPropertiesNotExist: boolean = saveData === undefined || effectiveType === undefined;

    if (isPropertiesNotExist) {
      return of(null);
    }

    const slowSpeed: EffectiveType[] = ['slow-2g', '2g', '3g'];
    const isSlowSpeed: boolean = saveData || slowSpeed.includes(effectiveType!);

    if (isSlowSpeed) {
      return of(null);
    }

    return fn();
  }
}
