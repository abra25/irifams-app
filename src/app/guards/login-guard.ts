import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const loginGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getUser();

  // kama hajalogin, ruhusu afungue login page
  if(!user){

    return true;

}

if(user.temporaryPassword){

    return router.createUrlTree([
        '/change-password'
    ]);

}

  // kama amelogin, mpeleke dashboard yake
  switch (user.role) {

    case 'ADMIN':
      return router.createUrlTree(['/admin/dashboard']);

    case 'SUPERVISOR':
      return router.createUrlTree(['/supervisor/dashboard']);

    case 'FARMER':
      return router.createUrlTree(['/farmer/dashboard']);

    case 'STAKEHOLDER':
      return router.createUrlTree(['/stakeholder']);

    default:
      return true;
  }
};