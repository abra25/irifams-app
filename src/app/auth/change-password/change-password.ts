import { CommonModule } from '@angular/common';

import {
  Component,
  OnInit
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import Swal from 'sweetalert2';

import { UserService } from '../../services/user.service';

import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-change-password',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],

  templateUrl: './change-password.html',

  styleUrl: './change-password.css'
})
export class ChangePassword
  implements OnInit {


  // =========================================================
  // UI
  // =========================================================

  showCurrent = false;

  showNew = false;

  showConfirm = false;

  loading = false;


  // =========================================================
  // RECOVERY MODE
  // =========================================================

  /*
   * TRUE:
   * OTP password recovery
   *
   * FALSE:
   * Temporary password change
   */

  recoveryMode = false;


  // =========================================================
  // PASSWORD DATA
  // =========================================================

  passwordData = {

    currentPassword: '',

    newPassword: '',

    confirmPassword: ''

  };


  // =========================================================
  // CONSTRUCTOR
  // =========================================================

  constructor(

    private userService: UserService,

    private authService: AuthService,

    private router: Router

  ) {}


  // =========================================================
  // INIT
  // =========================================================

  ngOnInit(): void {

    const recoveryToken =
      sessionStorage.getItem(
        'recoveryToken'
      );


    const recoveryUsername =
      sessionStorage.getItem(
        'recoveryUsername'
      );


    /*
     * Recovery mode is active only when
     * BOTH values exist.
     */

    this.recoveryMode =
      !!recoveryToken &&
      !!recoveryUsername;


    /*
     * If this page is opened through
     * /reset-password without a valid
     * recovery session, return to Forgot Password.
     */

    if (
      !this.recoveryMode &&
      this.router.url.includes(
        '/reset-password'
      )
    ) {

      Swal.fire({

        icon: 'warning',

        title: 'Recovery Session Missing',

        text:
          'Please request a new OTP before resetting your password.',

        confirmButtonText:
          'Go to Forgot Password',

        allowOutsideClick:
          false

      }).then(() => {

        this.router.navigate([
          '/forgot-password'
        ]);

      });

    }

  }


  // =========================================================
  // CHANGE PASSWORD
  // =========================================================

  changePassword(): void {


    // -------------------------------------------------------
    // NEW PASSWORD
    // -------------------------------------------------------

    if (
      !this.passwordData.newPassword ||
      !this.passwordData.confirmPassword
    ) {

      Swal.fire({

        icon: 'warning',

        title: 'Missing Information',

        text:
          'Please enter and confirm your new password.'

      });

      return;

    }


    // -------------------------------------------------------
    // CURRENT PASSWORD
    // TEMPORARY MODE ONLY
    // -------------------------------------------------------

    if (!this.recoveryMode) {

      if (
        !this.passwordData.currentPassword
      ) {

        Swal.fire({

          icon: 'warning',

          title: 'Missing Information',

          text:
            'Please enter your current password.'

        });

        return;

      }

    }


    // -------------------------------------------------------
    // PASSWORD MATCH
    // -------------------------------------------------------

    if (

      this.passwordData.newPassword !==
      this.passwordData.confirmPassword

    ) {

      Swal.fire({

        icon: 'error',

        title: 'Password Mismatch',

        text:
          'New password and confirmation password do not match.'

      });

      return;

    }


    // -------------------------------------------------------
    // PASSWORD LENGTH
    // -------------------------------------------------------

    if (
      this.passwordData.newPassword.length < 4
    ) {

      Swal.fire({

        icon: 'warning',

        title: 'Weak Password',

        text:
          'Password must contain at least 4 characters.'

      });

      return;

    }


    this.loading = true;


    // -------------------------------------------------------
    // OTP RECOVERY
    // -------------------------------------------------------

    if (this.recoveryMode) {

      this.resetPasswordWithOtp();

      return;

    }


    // -------------------------------------------------------
    // TEMPORARY PASSWORD
    // -------------------------------------------------------

    this.changeTemporaryPassword();

  }


  // =========================================================
  // RESET PASSWORD USING OTP
  // =========================================================

  private resetPasswordWithOtp(): void {

    const username =
      sessionStorage.getItem(
        'recoveryUsername'
      );


    const recoveryToken =
      sessionStorage.getItem(
        'recoveryToken'
      );


    // -------------------------------------------------------
    // VALIDATE RECOVERY SESSION
    // -------------------------------------------------------

    if (
      !username ||
      !recoveryToken
    ) {

      this.loading = false;


      Swal.fire({

        icon: 'error',

        title: 'Recovery Session Expired',

        text:
          'Your password recovery session is no longer valid. Please request a new OTP.',

        confirmButtonText:
          'Request New OTP',

        allowOutsideClick:
          false

      }).then(() => {

        this.clearRecoverySession();

        this.router.navigate([
          '/forgot-password'
        ]);

      });


      return;

    }


    // -------------------------------------------------------
    // RESET PASSWORD
    // -------------------------------------------------------

    this.authService
      .resetPassword({

        username:
          username,

        recoveryToken:
          recoveryToken,

        newPassword:
          this.passwordData.newPassword

      })

      .subscribe({

        // ===================================================
        // SUCCESS
        // ===================================================

        next: (response: string) => {

  this.loading = false;

  this.clearRecoverySession();

  Swal.fire({

    icon: 'success',

    title:
      'Password Reset Successfully',

    text:
      response ||
      'Your password has been changed successfully. Please login with your new password.',

    confirmButtonText:
      'Go to Login',

    allowOutsideClick:
      false

  }).then(() => {

    this.router.navigate([
      '/login'
    ]);

  });

},

        // ===================================================
        // ERROR
        // ===================================================

        error: (err) => {

          this.loading = false;


          /*
           * Angular HttpClient can receive different
           * error response formats from Spring Boot.
           *
           * For example:
           *
           * String:
           * "Invalid or expired password recovery session."
           *
           * Object:
           * {
           *   message: "Invalid or expired password recovery session."
           * }
           *
           * Without checking the type, SweetAlert may show:
           *
           * [object Object]
           */

          let message =
            'Unable to reset your password.';


          if (
            typeof err?.error === 'string' &&
            err.error.trim()
          ) {

            message =
              err.error;

          } else if (
            err?.error?.message
          ) {

            message =
              err.error.message;

          } else if (
            typeof err?.message === 'string' &&
            err.message.trim()
          ) {

            message =
              err.message;

          }


          Swal.fire({

            icon: 'error',

            title:
              'Password Reset Failed',

            text:
              message

          });

        }

      });

  }


  // =========================================================
  // TEMPORARY PASSWORD CHANGE
  // =========================================================

  private changeTemporaryPassword(): void {

    this.userService

      .changePassword({

        currentPassword:
          this.passwordData.currentPassword,

        newPassword:
          this.passwordData.newPassword

      })

      .subscribe({

        // ===================================================
        // SUCCESS
        // ===================================================

        next: () => {

          this.loading = false;


          const user =
            this.authService.getUser();


          if (!user) {

            this.authService.logout(false);

            return;

          }


          /*
           * Temporary password has been replaced.
           */

          user.temporaryPassword =
            false;


          sessionStorage.setItem(

            'user',

            JSON.stringify(user)

          );


          Swal.fire({

            icon: 'success',

            title:
              'Password Updated',

            text:
              'Your password has been changed successfully.',

            confirmButtonText:
              'Continue',

            allowOutsideClick:
              false

          }).then(() => {

            this.navigateByRole(
              user.role
            );

          });

        },


        // ===================================================
        // ERROR
        // ===================================================

        error: (err) => {

          this.loading = false;


          /*
           * Handle both String and Object
           * responses from the backend.
           */

          let message =
            'Unable to change your password.';


          if (
            typeof err?.error === 'string' &&
            err.error.trim()
          ) {

            message =
              err.error;

          } else if (
            err?.error?.message
          ) {

            message =
              err.error.message;

          } else if (
            typeof err?.message === 'string' &&
            err.message.trim()
          ) {

            message =
              err.message;

          }


          Swal.fire({

            icon: 'error',

            title:
              'Password Change Failed',

            text:
              message

          });

        }

      });

  }


  // =========================================================
  // CLEAR RECOVERY SESSION
  // =========================================================

  private clearRecoverySession(): void {

    sessionStorage.removeItem(
      'recoveryUsername'
    );


    sessionStorage.removeItem(
      'recoveryToken'
    );

  }


  // =========================================================
  // ROLE NAVIGATION
  // =========================================================

  private navigateByRole(
    role: string
  ): void {

    switch (role) {

      case 'ADMIN':

        this.router.navigate([
          '/admin/dashboard'
        ]);

        break;


      case 'SUPERVISOR':

        this.router.navigate([
          '/supervisor/dashboard'
        ]);

        break;


      case 'FARMER':

        this.router.navigate([
          '/farmer/dashboard'
        ]);

        break;


      default:

        this.authService.logout(false);

        break;

    }

  }

}