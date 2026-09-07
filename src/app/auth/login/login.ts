import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  showPassword = false;
  loading = false;

  loginData = {
    username: '',
    password: '',
    rememberMe: false
  };

  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // =========================================================
  // TOGGLE PASSWORD
  // =========================================================

  togglePassword(): void {

    this.showPassword =
      !this.showPassword;

  }

  // =========================================================
  // LOGIN
  // =========================================================

  onLogin(): void {

    if (
      !this.loginData.username ||
      !this.loginData.password
    ) {

      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please enter your username and password.'
      });

      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService
      .login(this.loginData)
      .subscribe({

        next: (response) => {

          this.loading = false;

          /*
           * =====================================================
           * TEMPORARY PASSWORD
           * =====================================================
           *
           * User must change password before accessing dashboard.
           */

          if (response.temporaryPassword) {

            Swal.fire({
              icon: 'warning',
              title: 'Password Change Required',
              text: 'You must change your temporary password before continuing.',
              confirmButtonText: 'Change Password',
              allowOutsideClick: false
            }).then(() => {

              this.router.navigate([
                '/change-password'
              ]);

            });

            return;
          }


          /*
           * =====================================================
           * NORMAL LOGIN
           * =====================================================
           */

          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: `Welcome ${response.fullName}`,
            timer: 1500,
            showConfirmButton: false
          }).then(() => {

            this.navigateByRole(response.role);

          });

        },

        error: (err) => {

          this.loading = false;

          const message =
            err?.error?.message ||
            err?.error ||
            'Invalid username or password';

          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: message
          });

        }

      });

  }

  // =========================================================
  // ROLE NAVIGATION
  // =========================================================

  private navigateByRole(role: string): void {

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

        Swal.fire({
          icon: 'error',
          title: 'Access Denied',
          text: 'Your account role is not supported.'
        });

        break;
    }

  }

}