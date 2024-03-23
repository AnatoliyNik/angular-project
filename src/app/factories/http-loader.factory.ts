import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export const httpLoaderFactory = (httpClient: HttpClient): TranslateHttpLoader => new TranslateHttpLoader(httpClient);
