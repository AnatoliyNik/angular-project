import { Provider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { httpLoaderFactory } from '@factory/http-loader.factory';

export const provideLoader = (): Provider => ({
  provide: TranslateLoader,
  useFactory: httpLoaderFactory,
  deps: [HttpClient]
});
