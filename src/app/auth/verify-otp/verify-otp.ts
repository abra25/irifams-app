import { CommonModule } from '@angular/common';

import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-verify-otp',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],

  templateUrl: './verify-otp.html',

  styleUrl: './verify-otp.css'
})
export class VerifyOtp
  implements OnInit, OnDestroy {


  // =========================================================
  // OTP INPUT ELEMENT
  // =========================================================

  @ViewChild('otpInput')
  otpInput!: ElementRef<HTMLInputElement>;


  // =========================================================
  // USERNAME
  // =========================================================

  username = '';


  // =========================================================
  // OTP DISPLAY
  // =========================================================

  otp: string[] = [
    '',
    '',
    '',
    '',
    '',
    ''
  ];


  // =========================================================
  // REAL OTP VALUE
  // =========================================================

  otpValue = '';


  // =========================================================
  // LOADING
  // =========================================================

  loading = false;


  // =========================================================
  // COUNTDOWN
  // =========================================================

  countdown = 300;

  countdownInterval: any;


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

    this.route.queryParams.subscribe(params => {

      this.username =
        params['username'] || '';

    });

    this.startCountdown();

  }


  // =========================================================
  // FOCUS OTP INPUT
  // =========================================================

  focusOtpInput(): void {

    setTimeout(() => {

      this.otpInput
        ?.nativeElement
        ?.focus();

    });

  }


  // =========================================================
  // OTP INPUT
  // =========================================================

  onOtpInput(
    event: Event
  ): void {

    const input =
      event.target as HTMLInputElement;


    /*
     * Get only numbers.
     */
    let value =
      input.value.replace(/\D/g, '');


    /*
     * Maximum six digits.
     */
    value =
      value.slice(0, 6);


    /*
     * Store complete OTP.
     */
    this.otpValue =
      value;


    /*
     * Update six visual boxes.
     */
    this.updateOtpBoxes();

  }


  // =========================================================
  // UPDATE OTP BOXES
  // =========================================================

  private updateOtpBoxes(): void {

    this.otp = [
      '',
      '',
      '',
      '',
      '',
      ''
    ];


    for (
      let i = 0;
      i < this.otpValue.length &&
      i < 6;
      i++
    ) {

      this.otp[i] =
        this.otpValue.charAt(i);

    }

  }


  // =========================================================
  // KEYBOARD
  // =========================================================

  onKeyDown(
    event: KeyboardEvent
  ): void {

    /*
     * Allow normal editing.
     *
     * We do NOT manually move focus.
     * The browser handles typing naturally.
     */


    // -------------------------------------------------------
    // ALLOW CONTROL KEYS
    // -------------------------------------------------------

    const allowedKeys = [

      'Backspace',

      'Delete',

      'ArrowLeft',

      'ArrowRight',

      'Home',

      'End',

      'Tab'

    ];


    if (
      allowedKeys.includes(
        event.key
      )
    ) {

      return;

    }


    // -------------------------------------------------------
    // ALLOW NUMBERS ONLY
    // -------------------------------------------------------

    if (
      /^\d$/.test(event.key)
    ) {

      /*
       * If already six digits,
       * don't allow another digit.
       */
      if (
        this.otpValue.length >= 6
      ) {

        event.preventDefault();

      }

      return;

    }


    // -------------------------------------------------------
    // BLOCK OTHER CHARACTERS
    // -------------------------------------------------------

    event.preventDefault();

  }


  // =========================================================
  // PASTE OTP
  // =========================================================

  onPaste(
    event: ClipboardEvent
  ): void {

    event.preventDefault();


    const pastedText =
      event.clipboardData
        ?.getData('text') || '';


    const value =
      pastedText
        .replace(/\D/g, '')
        .slice(0, 6);


    if (!value) {

      return;

    }


    this.otpValue =
      value;


    this.updateOtpBoxes();


    /*
     * Keep actual input synchronized.
     */
    if (this.otpInput) {

      this.otpInput
        .nativeElement
        .value = value;

    }

  }


  // =========================================================
  // GET OTP VALUE
  // =========================================================

  getOtpValue(): string {

    return this.otpValue;

  }


  // =========================================================
  // OTP COMPLETE
  // =========================================================

  get isOtpComplete(): boolean {

    return (
      this.otpValue.length === 6 &&
      /^\d{6}$/.test(
        this.otpValue
      )
    );

  }


  // =========================================================
  // VERIFY OTP
  // =========================================================

  verifyOtp(): void {

    const otpValue =
      this.getOtpValue();


    // -------------------------------------------------------
    // USERNAME CHECK
    // -------------------------------------------------------

    if (!this.username) {

      Swal.fire({

        icon: 'error',

        title: 'Invalid Request',

        text:
          'Password recovery information is missing.'

      });

      return;

    }


    // -------------------------------------------------------
    // OTP CHECK
    // -------------------------------------------------------

    if (!this.isOtpComplete) {

      Swal.fire({

        icon: 'warning',

        title: 'Incomplete OTP',

        text:
          'Please enter the complete 6-digit verification code.'

      });

      this.focusOtpInput();

      return;

    }


    // -------------------------------------------------------
    // EXPIRATION
    // -------------------------------------------------------

    if (this.countdown <= 0) {

      Swal.fire({

        icon: 'error',

        title: 'OTP Expired',

        text:
          'This OTP has expired. Please request a new one.'

      });

      return;

    }


    this.loading = true;


    // -------------------------------------------------------
    // VERIFY WITH BACKEND
    // -------------------------------------------------------

    this.authService
      .verifyOtp({

        username:
          this.username,

        otp:
          otpValue

      })

      .subscribe({

        // ===================================================
        // SUCCESS
        // ===================================================

        next: (response) => {

          this.loading = false;


          /*
           * Make sure recovery token exists.
           */
          if (
            !response?.recoveryToken
          ) {

            Swal.fire({

              icon: 'error',

              title: 'Verification Error',

              text:
                'OTP was verified, but the recovery session could not be created.'

            });

            return;

          }


          // -------------------------------------------------
          // SAVE RECOVERY SESSION
          // -------------------------------------------------

          sessionStorage.setItem(

            'recoveryUsername',

            this.username

          );


          sessionStorage.setItem(

            'recoveryToken',

            response.recoveryToken

          );


          // -------------------------------------------------
          // SUCCESS MESSAGE
          // -------------------------------------------------

          Swal.fire({

            icon: 'success',

            title: 'OTP Verified',

            text:
              'Your identity has been verified successfully.',

            confirmButtonText:
              'Create New Password',

            allowOutsideClick:
              false

          }).then(() => {

            this.router.navigate([
              '/reset-password'
            ]);

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
            'Invalid OTP. Please try again.';


          Swal.fire({

            icon: 'error',

            title: 'Verification Failed',

            text:
              message

          });


          this.clearOtp();

        }

      });

  }


  // =========================================================
  // CLEAR OTP
  // =========================================================

  clearOtp(): void {

    this.otpValue = '';


    this.otp = [
      '',
      '',
      '',
      '',
      '',
      ''
    ];


    if (this.otpInput) {

      this.otpInput
        .nativeElement
        .value = '';

    }


    this.focusOtpInput();

  }


  // =========================================================
  // COUNTDOWN
  // =========================================================

  startCountdown(): void {

    this.countdown = 300;


    if (this.countdownInterval) {

      clearInterval(
        this.countdownInterval
      );

    }


    this.countdownInterval =
      setInterval(() => {

        if (
          this.countdown > 0
        ) {

          this.countdown--;

        } else {

          clearInterval(
            this.countdownInterval
          );

        }

      }, 1000);

  }


  // =========================================================
  // FORMATTED COUNTDOWN
  // =========================================================

  get formattedCountdown(): string {

    const minutes =
      Math.floor(
        this.countdown / 60
      );


    const seconds =
      this.countdown % 60;


    return `${minutes}:${seconds
      .toString()
      .padStart(2, '0')}`;

  }


  // =========================================================
  // RESEND OTP
  // =========================================================

  resendOtp(): void {

    if (!this.username) {

      this.router.navigate([
        '/forgot-password'
      ]);

      return;

    }


    this.router.navigate(

      ['/forgot-password'],

      {
        queryParams: {

          username:
            this.username

        }

      }

    );

  }


  // =========================================================
  // DESTROY
  // =========================================================

  ngOnDestroy(): void {

    if (
      this.countdownInterval
    ) {

      clearInterval(
        this.countdownInterval
      );

      this.countdownInterval = null;

    }

  }

}