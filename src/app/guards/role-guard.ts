import { inject } from '@angular/core';

import {
  CanActivateFn,
  Router
} from '@angular/router';

import { AuthService }
from '../services/auth.service';

export const roleGuard:
CanActivateFn = (route) => {

  const authService =
      inject(AuthService);

  const router =
      inject(Router);

  const user =
      authService.getUser();

  if(!user){

    return router.createUrlTree([
      '/login'
    ]);

  }

  const allowedRoles =
      route.data?.['roles'];

  if(
      allowedRoles?.includes(
        user.role
      )
    ){

    return true;

  }

  authService.logout();

  return router.createUrlTree([
    '/login'
  ]);

};