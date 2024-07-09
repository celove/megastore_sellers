import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LoadingService } from '../services/auth/loading.service';



export const intercept: HttpInterceptorFn = (req, next) => {
  let loadingService = inject(LoadingService)
  loadingService.load();
  const idToken = localStorage.getItem("access_token");
  if (idToken) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `${idToken}`
      }
    });
    return errorHandler(next(authReq));
  } else {
    return errorHandler(next(req));
  }
};


function errorHandler(next: Observable<HttpEvent<unknown>>) {
  let messageService = inject(MessageService)
  let router = inject(Router)
  let loadingService = inject(LoadingService)
  return next.pipe(
    tap((res: any)=>{
      if (res instanceof HttpResponse) {
        loadingService.loaded();
      }

    }),
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        // Handle HTTP errors
        if (err.status === 401) {
          // Specific handling for unauthorized errors         
          console.error('Unauthorized request:', err);
          console.info('Redirecting to login...');
          router.navigateByUrl('/login')
          // You might trigger a re-authentication flow or redirect the user here
        } else {
          messageService.add({ severity: 'error', summary: 'Error', detail: err.message })
          // Handle other HTTP error codes
          console.error('HTTP error:', err);
        }
      } else {
        messageService.add({ severity: 'error', summary: 'Error', detail: err.message })
        // Handle non-HTTP errors
        console.error('An error occurred:', err);
      }
      loadingService.loaded();
      // Re-throw the error to propagate it further
      return throwError(() => err); 
    })
  );;
  }