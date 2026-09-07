import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import Swal from 'sweetalert2';

import { PaymentService } from '../../services/payment.service';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './payments.html',
  styleUrl: './payments.css'
})
export class Payments implements OnInit {

  showModal = false;

  showPaymentModal = false;

  selectedPayment: any = null;

  selectedRequest: any = null;

  payments: any[] = [];

  requests: any[] = [];

  loading = false;

  paymentLoading = false;

  controlNumber = '';


  constructor(
    private paymentService: PaymentService,
    private requestService: RequestService,
    private cdr: ChangeDetectorRef
  ) {}


  // =========================================================
  // INIT
  // =========================================================

  ngOnInit(): void {

    this.loadPayments();

    this.loadPaymentRequests();

  }


  // =========================================================
  // LOAD MY PAYMENTS
  // =========================================================

  loadPayments(): void {

    this.loading = true;

    this.paymentService
      .getMyPayments()
      .subscribe({

        next: (res) => {

          this.payments = res || [];

          this.loading = false;

          this.cdr.detectChanges();

        },

        error: (err) => {

          this.loading = false;

          console.log('LOAD PAYMENTS ERROR:', err);

          Swal.fire({

            icon: 'error',

            title: 'Failed to Load Payments',

            text:
              err?.error?.message ||
              err?.error ||
              'Unable to load your payment information.'

          });

        }

      });

  }


  // =========================================================
  // LOAD FARMER REQUESTS
  // =========================================================
  /*
   * We use farmer requests to identify requests that have
   * been approved and are now WAITING_PAYMENT.
   *
   * Payment has not necessarily been created yet, because
   * the farmer first needs to confirm the payment using
   * the official control number.
   */

  loadPaymentRequests(): void {

    this.requestService
      .getMyFarmRequests()
      .subscribe({

        next: (res) => {

          this.requests = res || [];

          this.cdr.detectChanges();

        },

        error: (err) => {

          console.log('LOAD PAYMENT REQUESTS ERROR:', err);

        }

      });

  }


  // =========================================================
  // GET REQUESTS WAITING FOR PAYMENT
  // =========================================================

  get waitingPaymentRequests(): any[] {

    return this.requests.filter(
      request =>
        request.status === 'WAITING_PAYMENT' &&
        request.controlNumber &&
        !request.paymentConfirmed
    );

  }


  // =========================================================
  // OPEN PAYMENT MODAL
  // =========================================================

  openPaymentModal(request: any): void {

    this.selectedRequest = request;

    this.controlNumber =
      request.controlNumber || '';

    this.showPaymentModal = true;

  }


  // =========================================================
  // CLOSE PAYMENT MODAL
  // =========================================================

  closePaymentModal(): void {

    this.showPaymentModal = false;

    this.selectedRequest = null;

    this.controlNumber = '';

    this.paymentLoading = false;

  }


  // =========================================================
  // CONFIRM PAYMENT
  // =========================================================
  /*
   * IMPORTANT:
   *
   * Farmer does NOT enter amount.
   *
   * Farmer does NOT generate control number.
   *
   * Farmer only confirms that payment has been made
   * using the official control number.
   *
   * Backend:
   * - checks request ownership
   * - checks WAITING_PAYMENT status
   * - validates control number
   * - gets official amount
   * - creates payment
   * - changes payment to WAITING_VERIFICATION
   * - changes request to WAITING_VERIFICATION
   */

  markAsPaid(request: any): void {

    if (!request?.id) {

      Swal.fire(
        'Error',
        'Invalid service request.',
        'error'
      );

      return;

    }


    if (!request.controlNumber) {

      Swal.fire(
        'Payment Error',
        'This request does not have a control number yet.',
        'error'
      );

      return;

    }


    const enteredControlNumber =
      this.controlNumber.trim();


    if (!enteredControlNumber) {

      Swal.fire(
        'Missing Control Number',
        'Please enter the control number used for payment.',
        'warning'
      );

      return;

    }


    if (
      enteredControlNumber !==
      request.controlNumber
    ) {

      Swal.fire({

        icon: 'error',

        title: 'Invalid Control Number',

        text:
          'The control number you entered does not match the official control number for this request.'

      });

      return;

    }


    Swal.fire({

      title: 'Confirm Payment',

      html: `
        <p>
          Please confirm that you have already made payment
          using the control number below.
        </p>

        <div style="
          margin:15px 0;
          padding:12px;
          background:#f4f8f5;
          border-radius:10px;
          font-weight:600;
        ">
          Control Number:
          <br>
          <strong>${request.controlNumber}</strong>
        </div>

        <div style="
          font-size:14px;
          color:#555;
        ">
          Amount:
          <strong>
            TZS ${Number(request.amount || 0).toLocaleString()}
          </strong>
        </div>
      `,

      icon: 'question',

      showCancelButton: true,

      confirmButtonText: 'Yes, I Have Paid',

      cancelButtonText: 'Cancel',

      reverseButtons: true

    }).then(result => {

      if (!result.isConfirmed) {
        return;
      }


      this.paymentLoading = true;


      this.paymentService
        .confirmPayment(
          request.id,
          {
            controlNumber:
              enteredControlNumber
          }
        )
        .subscribe({

          next: (response) => {

            this.paymentLoading = false;

            this.closePaymentModal();

            this.loadPayments();

            this.loadPaymentRequests();


            Swal.fire({

              icon: 'success',

              title: 'Payment Submitted',

              text:
                response?.message ||
                'Your payment has been submitted successfully and is waiting for verification.',

              confirmButtonText: 'OK',

              allowOutsideClick: false

            });

          },


          error: (err) => {

            this.paymentLoading = false;

            console.log(
              'CONFIRM PAYMENT ERROR:',
              err
            );


            Swal.fire({

              icon: 'error',

              title: 'Payment Submission Failed',

              text:
                err?.error?.message ||
                err?.error ||
                'Unable to submit payment confirmation.'

            });

          }

        });

    });

  }


  // =========================================================
  // OPEN PAYMENT DETAILS
  // =========================================================

  openDetails(payment: any): void {

    this.selectedPayment = payment;

    this.showModal = true;

  }


  // =========================================================
  // CLOSE PAYMENT DETAILS
  // =========================================================

  closeDetails(): void {

    this.showModal = false;

    this.selectedPayment = null;

  }


  // =========================================================
  // SUMMARY
  // =========================================================

  get totalPaid(): number {

    return this.payments

      .filter(
        p => p.status === 'PAID'
      )

      .reduce(
        (sum, p) =>
          sum + Number(p.amount || 0),
        0
      );

  }


  get pendingAmount(): number {

    return this.payments

      .filter(
        p =>
          p.status === 'PENDING' ||
          p.status === 'WAITING_VERIFICATION'
      )

      .reduce(
        (sum, p) =>
          sum + Number(p.amount || 0),
        0
      );

  }

}