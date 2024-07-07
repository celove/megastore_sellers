import { HttpInterceptorFn } from '@angular/common/http';

export const intercept: HttpInterceptorFn = (req, next) => {
    const idToken = localStorage.getItem("access_token");
    if (idToken) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `${idToken}`
        }
      });
      return next(authReq);
    } else {
      return next(req);
    }
};