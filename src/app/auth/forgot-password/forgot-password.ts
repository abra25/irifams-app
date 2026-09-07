import { CommonModule } from '@angular/common';

import {
  Component,
  OnInit
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-forgot-password',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],

  templateUrl: './forgot-password.html',

  styleUrl: './forgot-password.css'
})
export class ForgotPassword
  implements OnInit {


  // =========================================================
  // LOADING
  // =========================================================

  loading = false;


  // =========================================================
  // SUBMITTED
  // =========================================================

  submitted = false;


  // =========================================================
  // FORM DATA
  // =========================================================

  formData = {
    username: ''
  };


  // =========================================================
  // CONSTRUCTOR
  // =========================================================

  constructor(
    private authService: AuthService,

    private router: Router,

    private route: ActivatedRoute
  ) {}


  // =========================================================
  // INIT
  // =========================================================

  ngOnInit(): void {

    /*
     * Check whether this page was opened from
     * the "Resend OTP" button.
     *
     * If a username exists in the URL,
     * automatically put it into the username field.
     */
    this.route.queryParams.subscribe(params => {

      const username =
        params['username'] || '';


      if (username) {

        this.formData.username =
          username;

      }

    });

  }


  // =========================================================
  // SUBMIT PASSWORD RECOVERY
  // =========================================================

  onSubmit(): void {

    this.submitted = true;


    const username =
      this.formData.username.trim();


    // -------------------------------------------------------
    // VALIDATE USERNAME
    // -------------------------------------------------------

    if (!username) {

      Swal.fire({

        icon: 'warning',

        title: 'Username Required',

        text:
          'Please enter your username.'

      });

      return;

    }


    this.loading = true;


    // -------------------------------------------------------
    // SEND OTP REQUEST
    // -------------------------------------------------------

    this.authService
      .forgotPassword({
        username: username
      })

      .subscribe({

        // ===================================================
        // SUCCESS
        // ===================================================

        next: (res) => {

          this.loading = false;


          Swal.fire({

            icon: 'success',

            title: 'OTP Sent',

            text:
              res?.message ||
              'A verification code has been sent to your registered email address.',

            confirmButtonText:
              'Verify OTP',

            allowOutsideClick:
              false

          }).then(() => {

            this.router.navigate(

              ['/verify-otp'],

              {
                queryParams: {
                  username: username
                }
              }

            );

          });

        },


        // ===================================================
        // ERROR
        // ===================================================

        error: (err) => {

          this.loading = false;


          const message =
            err?.error?.message ||
            err?.error ||
            'Unable to process password recovery request.';


          Swal.fire({

            icon: 'error',

            title: 'Recovery Failed',

            text: message

          });

        }

      });

  }

}