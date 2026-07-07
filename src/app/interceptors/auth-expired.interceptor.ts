import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';

import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, throwError } from 'rxjs';

import Swal from 'sweetalert2';

export const authExpiredInterceptor: HttpInterceptorFn = (

  req,
  next

) => {

  const router = inject(Router);

  return next(req).pipe(

    catchError((error: HttpErrorResponse) => {

      if (error.status === 401) {

        localStorage.clear();
        sessionStorage.clear();

        Swal.fire({

          icon: 'warning',
          title: 'Session Expired',
          text: 'Please login again.'

        }).then(() => {

          router.navigate(['/login']);

        });

      }

      return throwError(() => error);

    })

  );

};