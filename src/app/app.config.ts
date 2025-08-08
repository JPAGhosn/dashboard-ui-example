import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthenticationRemoteService } from './shared/remotes/authentication-remote.service';
import { AuthenticationStoreService } from './shared/services/authentication-store.service';
import { CookiesHelperService } from './shared/services/cookies-helper.service';
import { LoaderService } from './shared/services/loader.service';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from '@angular/material/form-field';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' } as MatFormFieldDefaultOptions,
    },
    AuthenticationStoreService,
    CookiesHelperService,
    LoaderService,
    AuthenticationRemoteService,
  ],
};
