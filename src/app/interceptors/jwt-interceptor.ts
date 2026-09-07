import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (

  req,
  next

) => {

  if (
      req.url.includes('/auth/login') ||
      req.url.includes('/auth/register')
  ) {

    return next(req);

  }

  // BADILISHA HAPA
  const token = sessionStorage.getItem('token');

  // console.log('JWT TOKEN => ', token);

  if (token) {

    req = req.clone({

      setHeaders: {

        Authorization: `Bearer ${token}`

      }

    });

  }

  return next(req);

};