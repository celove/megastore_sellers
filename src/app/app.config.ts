import { ApplicationConfig, ChangeDetectorRef, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { intercept } from './interptors/auth.interceptor';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { ProductService } from './services/auth/product.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {provideEnvironmentNgxMask, } from 'ngx-mask'
import { ConfirmationService, MessageService } from 'primeng/api';
import { LoadingService } from './services/auth/loading.service';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(withInterceptors([intercept])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    ProductService,
    ConfirmationService,
    MessageService,
    LoadingService
  ]
};
