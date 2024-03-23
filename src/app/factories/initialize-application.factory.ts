import { registerLocaleData } from '@angular/common';
import localeRuUA from '@angular/common/locales/ru-UA';
import { DateAdapter } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, tap } from 'rxjs';
import 'moment/locale/ru.js';
import { Language } from '@data/constants';
import { isLanguage } from '@helpers/language-checker';
import { Store } from '@ngrx/store';
import { loginPageActions } from '@store/actions/login-page.actions';
import { loginFeature } from '@store/features/login-page.feature';

export const initializeApplicationFactory = (
  translateService: TranslateService,
  dateAdapter: DateAdapter<Date>,
  store: Store
) => {
  return (): Observable<unknown> => {
    const languageKey = 'language';
    const preferredLanguage: string | null = localStorage.getItem(languageKey);
    const browserLanguage: string | undefined = translateService.getBrowserLang();
    const currentLanguage: string | undefined = preferredLanguage || browserLanguage;

    registerLocaleData(localeRuUA, 'ru');

    translateService.addLangs(Object.values(Language));
    translateService.setDefaultLang(Language.En);

    store.select(loginFeature.selectLanguage).subscribe((language: Language) => {
      dateAdapter.setLocale(language);
      localStorage.setItem(languageKey, language);
    });

    if (isLanguage(currentLanguage)) {
      return translateService.use(currentLanguage).pipe(
        tap(() => store.dispatch(loginPageActions.changeLanguage({language: currentLanguage})))
      );
    }

    return translateService.use(Language.En);
  };
};
