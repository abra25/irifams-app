import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-admin-requests',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-requests.html',
  styleUrl: './admin-requests.css'
})
export class AdminRequests implements OnInit {

  constructor(
    private requestService: RequestService,
    private cdr: ChangeDetectorRef
  ) {}

  selectedStatus = 'All';
  searchTerm = '';

  showModal = false;
  selectedRequest: any = null;

  requests: any[] = [];

  ngOnInit(): void {
    this.loadRequests();
  }

  // =========================================================
  // LOAD ALL REQUESTS
  // =========================================================

  loadRequests(): void {

    this.requestService
      .getAllRequests()
      .subscribe({

        next: (res) => {

          this.requests = [...res];

          this.cdr.detectChanges();

        },

        error: (err) => {

          console.log('STATUS:', err.status);
          console.log('BODY:', err.error);
          console.log('HEADERS:', err.headers);

          Swal.fire({
            icon: 'error',
            title: 'Failed to Load Requests',
            text:
              err?.error?.message ||
              err?.error ||
              'Unable to load service requests.'
          });

        }

      });

  }


  // =========================================================
  // FILTER REQUESTS
  // =========================================================

  get filteredRequests(): any[] {

    return this.requests.filter(request => {

      const statusMatch =
        this.selectedStatus === 'All' ||
        request.status === this.selectedStatus.toUpperCase();

      const searchValue =
        this.searchTerm.toLowerCase().trim();

      const searchMatch =
        !searchValue ||

        request.farmer?.fullName
          ?.toLowerCase()
          .includes(searchValue)

        ||

        request.id
          ?.toString()
          .includes(searchValue)

        ||

        request.plot?.plotNo
          ?.toLowerCase()
          .includes(searchValue)

        ||

        request.serviceType
          ?.toLowerCase()
          .includes(searchValue);

      return statusMatch && searchMatch;

    });

  }


  // =========================================================
  // OPEN REQUEST DETAILS
  // =========================================================

  openDetails(request: any): void {

    this.selectedRequest = request;

    this.showModal = true;

  }


  // =========================================================
  // APPROVE REQUEST
  // =========================================================
  /*
   * IMPORTANT:
   * Frontend does NOT send serviceCost.
   *
   * Backend automatically:
   * - Calculates service amount
   * - Generates control number
   * - Changes status to WAITING_PAYMENT
   */

  approveRequest(id: number): void {

    Swal.fire({

      title: 'Approve Request?',
      text: 'The system will automatically calculate the service amount and generate a control number.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Approve',
      cancelButtonText: 'Cancel',
      reverseButtons: true

    }).then(result => {

      if (!result.isConfirmed) {
        return;
      }

      this.requestService
        .approveRequest(id)
        .subscribe({

          next: (response) => {

            Swal.fire({

              icon: 'success',
              title: 'Request Approved',
              html: `
                <p>The request has been approved successfully.</p>

                ${
                  response?.amount != null
                    ? `<strong>Amount: TZS ${Number(response.amount).toLocaleString()}</strong><br>`
                    : ''
                }

                ${
                  response?.controlNumber
                    ? `<strong>Control Number: ${response.controlNumber}</strong>`
                    : ''
                }
              `,
              confirmButtonText: 'OK'

            });

            this.loadRequests();

          },

          error: (err) => {

            console.log('APPROVE ERROR:', err);

            Swal.fire({

              icon: 'error',
              title: 'Approval Failed',
              text:
                err?.error?.message ||
                err?.error ||
                'Unable to approve this request.'

            });

          }

        });

    });

  }


  // =========================================================
  // REJECT REQUEST
  // =========================================================

  rejectRequest(id: number): void {

    Swal.fire({

      title: 'Reject Request?',
      text: 'Are you sure you want to reject this service request?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Reject',
      cancelButtonText: 'Cancel',
      reverseButtons: true

    }).then(result => {

      if (!result.isConfirmed) {
        return;
      }

      this.requestService
        .rejectRequest(id)
        .subscribe({

          next: () => {

            Swal.fire({

              icon: 'success',
              title: 'Request Rejected',
              text: 'The service request has been rejected successfully.',
              timer: 2000,
              showConfirmButton: false

            });

            this.loadRequests();

          },

          error: (err) => {

            console.log('REJECT ERROR:', err);

            Swal.fire({

              icon: 'error',
              title: 'Rejection Failed',
              text:
                err?.error?.message ||
                err?.error ||
                'Unable to reject this request.'

            });

          }

        });

    });

  }


  // =========================================================
  // SUMMARY COUNTS
  // =========================================================

  get pendingCount(): number {

    return this.requests.filter(
      r => r.status === 'PENDING'
    ).length;

  }


  get waitingPaymentCount(): number {

    return this.requests.filter(
      r => r.status === 'WAITING_PAYMENT'
    ).length;

  }


  get completedCount(): number {

    return this.requests.filter(
      r => r.status === 'COMPLETED'
    ).length;

  }


  // =========================================================
  // PAYMENT METHODS
  // =========================================================
  /*
   * Payment verification is now handled by PaymentController.
   *
   * These old local methods are intentionally removed:
   *
   * verifyPayment()
   * rejectPayment()
   *
   * The Admin Requests component should not change
   * payment status locally.
   */

}