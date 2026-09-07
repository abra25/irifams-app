import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const loginGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  /*
   * User is not logged in
   */
  if (!authService.isLoggedIn()) {

    return true;

  }


  const user = authService.getUser();

  if (!user) {

    return true;

  }


  /*
   * Temporary password must be changed
   */
  if (user.temporaryPassword) {

    return router.createUrlTree([
      '/change-password'
    ]);

  }


  /*
   * Already logged in users
   * should not remain on login page.
   */
  switch (user.role) {

    case 'ADMIN':

      return router.createUrlTree([
        '/admin/dashboard'
      ]);


    case 'SUPERVISOR':

      return router.createUrlTree([
        '/supervisor/dashboard'
      ]);


    case 'FARMER':

      return router.createUrlTree([
        '/farmer/dashboard'
      ]);


    default:

      authService.logout(false);

      return true;

  }

};