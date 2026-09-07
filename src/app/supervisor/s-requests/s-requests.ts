import { CommonModule } from '@angular/common';

import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import Swal from 'sweetalert2';

import { RequestService } from '../../services/request.service';


@Component({
  selector: 'app-s-requests',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './s-requests.html',
  styleUrl: './s-requests.css'
})
export class SRequests implements OnInit {


  // =========================================================
  // CONSTRUCTOR
  // =========================================================

  constructor(
    private requestService: RequestService,
    private cdr: ChangeDetectorRef
  ) {}


  // =========================================================
  // DATA
  // =========================================================

  requests: any[] = [];

  selectedRequest: any = null;

  showViewModal = false;


  // =========================================================
  // SERVICE PRICES
  // =========================================================

  servicePrices: any = {

    KUBURUGIWA: 15000,

    KUCHIMBA: 20000,

    KUVUNA: 30000,

    DAWA_CHUPA: 25000,

    DAWA_VIFUKO_KUBWA: 30000,

    DAWA_VIFUKO_NDOGO: 12000,

    KUTILIWA_DAWA: 10000,

    MBOLEA: 1500,

    MBEGU_MPUNGA: 6000

  };


  // =========================================================
  // INITIALIZE
  // =========================================================

  ngOnInit(): void {

    this.loadRequests();

  }


  // =========================================================
  // LOAD SUPERVISOR REQUESTS
  // =========================================================

  loadRequests(): void {

    this.requestService
      .getMyRequests()
      .subscribe({

        next: (res: any[]) => {

          this.requests =
            res || [];

          this.cdr.detectChanges();

        },


        error: (err: any) => {

          console.log(
            'LOAD REQUESTS ERROR:',
            err
          );

          Swal.fire(
            'Error',
            err?.error?.message ||
            err?.error ||
            'Failed to load requests',
            'error'
          );

        }

      });

  }


  // =========================================================
  // VIEW REQUEST
  // =========================================================

  viewRequest(
    request: any
  ): void {

    this.selectedRequest =
      request;

    this.showViewModal =
      true;

    this.cdr.detectChanges();

  }


  // =========================================================
  // CLOSE VIEW MODAL
  // =========================================================

  closeViewModal(): void {

    this.showViewModal =
      false;

    this.selectedRequest =
      null;

    this.cdr.detectChanges();

  }


  // =========================================================
  // CHECK IF SERVICE REQUIRES QUANTITY
  // =========================================================

  requiresQuantity(
    serviceType: string
  ): boolean {

    const quantityServices = [

      'DAWA_CHUPA',

      'DAWA_VIFUKO_KUBWA',

      'DAWA_VIFUKO_NDOGO',

      'KUTILIWA_DAWA',

      'MBOLEA',

      'MBEGU_MPUNGA'

    ];

    return quantityServices.includes(
      serviceType
    );

  }


  // =========================================================
  // CHECK IF TRACTOR / MACHINE SERVICE
  // =========================================================

  isTractorService(
    serviceType: string
  ): boolean {

    const tractorServices = [

      'KUBURUGIWA',

      'KUCHIMBA',

      'KUVUNA'

    ];

    return tractorServices.includes(
      serviceType
    );

  }


  // =========================================================
  // GET SERVICE LABEL
  // =========================================================

  getServiceLabel(
    serviceType: string
  ): string {

    if (!serviceType) {

      return 'N/A';

    }

    const labels: any = {

      KUBURUGIWA:
        'Kuburugiwa',

      KUCHIMBA:
        'Kuchimba',

      KUVUNA:
        'Kuvuna',

      DAWA_CHUPA:
        'Dawa Chupa',

      DAWA_VIFUKO_KUBWA:
        'Dawa Vifuko Kubwa',

      DAWA_VIFUKO_NDOGO:
        'Dawa Vifuko Ndogo',

      KUTILIWA_DAWA:
        'Kutiliwa Dawa Shambani',

      MBOLEA:
        'Mbolea',

      MBEGU_MPUNGA:
        'Mbegu ya Mpunga'

    };

    return labels[serviceType]
      || serviceType.replaceAll(
        '_',
        ' '
      );

  }


  // =========================================================
  // GET QUANTITY UNIT
  // =========================================================

  getQuantityUnit(
    serviceType: string
  ): string {

    switch (serviceType) {

      case 'DAWA_CHUPA':

        return 'Bottle(s)';


      case 'DAWA_VIFUKO_KUBWA':

        return 'Large Bag(s)';


      case 'DAWA_VIFUKO_NDOGO':

        return 'Small Bag(s)';


      case 'KUTILIWA_DAWA':

        return 'Application(s)';


      case 'MBOLEA':

        return 'Kg';


      case 'MBEGU_MPUNGA':

        return 'Bag(s)';


      default:

        return 'Unit(s)';

    }

  }


  // =========================================================
  // GET SERVICE PRICE
  // =========================================================

  getServicePrice(
    serviceType: string
  ): string {

    const price =
      Number(
        this.servicePrices[
          serviceType
        ]
      ) || 0;


    if (!price) {

      return 'N/A';

    }


    if (
      serviceType === 'KUBURUGIWA' ||
      serviceType === 'KUCHIMBA' ||
      serviceType === 'KUVUNA'
    ) {

      return `TZS ${price.toLocaleString()} per 1/4 Acre`;

    }


    if (
      serviceType === 'MBOLEA'
    ) {

      return `TZS ${price.toLocaleString()} per Kg`;

    }


    if (
      serviceType === 'MBEGU_MPUNGA'
    ) {

      return `TZS ${price.toLocaleString()} per Bag`;

    }


    return `TZS ${price.toLocaleString()} per Unit`;

  }


  // =========================================================
  // GET STATUS LABEL
  // =========================================================

  getStatusLabel(
    status: string
  ): string {

    if (!status) {

      return 'N/A';

    }


    return status
      .replaceAll(
        '_',
        ' '
      )
      .replace(
        /\b\w/g,
        letter =>
          letter.toUpperCase()
      );

  }


  // =========================================================
  // GET REQUEST QUANTITY
  // =========================================================

  getRequestQuantity(
    request: any
  ): number {

    const quantity =
      Number(
        request?.quantity
      );


    if (
      !quantity ||
      quantity <= 0
    ) {

      return 1;

    }


    return quantity;

  }


  // =========================================================
  // CALCULATE QUANTITY SERVICE ESTIMATE
  // =========================================================

  getQuantityEstimatedAmount(
    request: any
  ): number {

    const quantity =
      this.getRequestQuantity(
        request
      );


    const price =
      Number(
        this.servicePrices[
          request?.serviceType
        ]
      ) || 0;


    return price * quantity;

  }


  // =========================================================
  // GET TRACTOR UNITS
  // =========================================================

  getTractorUnits(
    request: any
  ): number {

    const plotSize =
      Number(
        request?.plot?.size
      ) || 0;


    if (
      plotSize <= 0
    ) {

      return 0;

    }


    return Math.ceil(
      plotSize / 0.25
    );

  }


  // =========================================================
  // GET TRACTOR ESTIMATED AMOUNT
  // =========================================================

  getTractorEstimatedAmount(
    request: any
  ): number {

    const units =
      this.getTractorUnits(
        request
      );


    const price =
      Number(
        this.servicePrices[
          request?.serviceType
        ]
      ) || 0;


    return units * price;

  }


  // =========================================================
  // APPROVE REQUEST
  // =========================================================

  approveRequest(
    request: any
  ): void {

    if (!request?.id) {

      Swal.fire(
        'Error',
        'Invalid service request.',
        'error'
      );

      return;

    }


    // =====================================================
    // TRACTOR SERVICE
    // =====================================================

    if (
      this.isTractorService(
        request.serviceType
      )
    ) {

      this.confirmTractorApproval(
        request
      );

      return;

    }


    // =====================================================
    // QUANTITY BASED SERVICE
    // =====================================================

    if (
      this.requiresQuantity(
        request.serviceType
      )
    ) {

      this.confirmQuantityApproval(
        request
      );

      return;

    }


    this.confirmNormalApproval(
      request
    );

  }


  // =========================================================
  // CONFIRM QUANTITY BASED REQUEST
  // =========================================================

  confirmQuantityApproval(
    request: any
  ): void {

    const requestedQuantity =
      this.getRequestQuantity(
        request
      );


    const price =
      Number(
        this.servicePrices[
          request.serviceType
        ]
      ) || 0;


    Swal.fire({

      title:
        'Confirm Quantity',


      html: `

        <div style="text-align:left;">

          <p>

            <strong>Service:</strong>

            ${this.getServiceLabel(
              request.serviceType
            )}

          </p>


          <p>

            <strong>Farmer Requested:</strong>

            ${requestedQuantity}

            ${this.getQuantityUnit(
              request.serviceType
            )}

          </p>


          <p>

            <strong>Price:</strong>

            TZS ${price.toLocaleString()}

            per ${this.getQuantityUnit(
              request.serviceType
            )}

          </p>


          <label
            style="
              display:block;
              margin-top:15px;
              margin-bottom:7px;
              font-weight:600;
            "
          >

            Confirm Quantity

          </label>


          <input
            id="confirmedQuantity"
            type="number"
            min="0.01"
            step="0.01"
            value="${requestedQuantity}"
            class="swal2-input"
            style="
              width:100%;
              margin:0;
              box-sizing:border-box;
            "
          />


          <small
            style="
              display:block;
              margin-top:10px;
              color:#777;
            "
          >

            Confirm the quantity before approving.
            The final amount will be calculated automatically.

          </small>

        </div>

      `,


      icon:
        'question',


      showCancelButton:
        true,


      confirmButtonText:
        'Confirm & Approve',


      cancelButtonText:
        'Cancel',


      reverseButtons:
        true,


      preConfirm: () => {

        const input =
          document.getElementById(
            'confirmedQuantity'
          ) as HTMLInputElement;


        const quantity =
          Number(
            input?.value
          );


        if (
          !quantity ||
          quantity <= 0
        ) {

          Swal.showValidationMessage(
            'Please enter a valid quantity greater than zero.'
          );

          return false;

        }


        return quantity;

      }

    })
    .then(result => {

      if (!result.isConfirmed) {

        return;

      }


      const confirmedQuantity =
        Number(
          result.value
        );


      this.sendApproval(
        request,
        confirmedQuantity
      );

    });

  }


  // =========================================================
  // CONFIRM TRACTOR APPROVAL
  // =========================================================

  confirmTractorApproval(
    request: any
  ): void {

    const plotSize =
      Number(
        request?.plot?.size
      ) || 0;


    const pricePerQuarter =
      Number(
        this.servicePrices[
          request.serviceType
        ]
      ) || 0;


    const units =
      this.getTractorUnits(
        request
      );


    const estimatedAmount =
      this.getTractorEstimatedAmount(
        request
      );


    Swal.fire({

      title:
        'Approve Request?',


      html: `

        <div style="text-align:left;">

          <p>

            <strong>Service:</strong>

            ${this.getServiceLabel(
              request.serviceType
            )}

          </p>


          <p>

            <strong>Plot:</strong>

            ${request?.plot?.plotNo || 'N/A'}

          </p>


          <p>

            <strong>Plot Size:</strong>

            ${plotSize} Acre(s)

          </p>


          <p>

            <strong>Units:</strong>

            ${units}

            (1 Unit = 1/4 Acre)

          </p>


          <p>

            <strong>Rate:</strong>

            TZS
            ${pricePerQuarter.toLocaleString()}

            per 1/4 Acre

          </p>


          <p style="
            margin-top:20px;
            padding:12px;
            background:#f5f7f6;
            border-radius:8px;
          ">

            <strong>
              Estimated Amount:
            </strong>

            <br>

            TZS
            ${estimatedAmount.toLocaleString()}

          </p>


          <small>

            The final amount will be calculated
            automatically by the system based
            on the plot size.

          </small>

        </div>

      `,


      icon:
        'question',


      showCancelButton:
        true,


      confirmButtonText:
        'Yes, Approve',


      cancelButtonText:
        'Cancel',


      reverseButtons:
        true

    })
    .then(result => {

      if (!result.isConfirmed) {

        return;

      }


      // Tractor service does NOT send quantity
      this.sendApproval(
        request
      );

    });

  }


  // =========================================================
  // CONFIRM NORMAL APPROVAL
  // =========================================================

  confirmNormalApproval(
    request: any
  ): void {

    Swal.fire({

      title:
        'Approve Request?',


      html: `

        <div style="text-align:left;">

          <p>

            <strong>Service:</strong>

            ${this.getServiceLabel(
              request.serviceType
            )}

          </p>


          <p>

            <strong>Farmer:</strong>

            ${request?.farmer?.fullName || 'N/A'}

          </p>


          <p>

            <strong>Plot:</strong>

            ${request?.plot?.plotNo || 'N/A'}

          </p>


          <p>

            The system will automatically
            calculate the final amount and
            generate a control number.

          </p>

        </div>

      `,


      icon:
        'question',


      showCancelButton:
        true,


      confirmButtonText:
        'Yes, Approve',


      cancelButtonText:
        'Cancel',


      reverseButtons:
        true

    })
    .then(result => {

      if (!result.isConfirmed) {

        return;

      }


      this.sendApproval(
        request
      );

    });

  }


  // =========================================================
  // SEND APPROVAL TO BACKEND
  // =========================================================

  sendApproval(
    request: any,
    quantity?: number
  ): void {

    Swal.fire({

      title:
        'Approving Request...',


      text:
        'Please wait while the request is being processed.',


      allowOutsideClick:
        false,


      allowEscapeKey:
        false,


      didOpen: () => {

        Swal.showLoading();

      }

    });


    // =====================================================
    // SEND REQUEST TO BACKEND
    //
    // For quantity services:
    // {
    //   quantity: confirmedQuantity
    // }
    //
    // For tractor services:
    // {}
    // =====================================================

    this.requestService
      .approveRequest(
        request.id,
        quantity
      )
      .subscribe({

        next: (response: any) => {

          const finalQuantity =
            response?.quantity;


          const finalAmount =
            response?.amount;


          const controlNumber =
            response?.controlNumber;


          Swal.fire({

            icon:
              'success',


            title:
              'Request Approved',


            html: `

              <div>

                <p>

                  The service request has been
                  approved successfully.

                </p>


                ${

                  finalQuantity != null

                    ? `

                      <p>

                        <strong>

                          Quantity:

                          ${finalQuantity}

                          ${this.getQuantityUnit(
                            response?.serviceType
                          )}

                        </strong>

                      </p>

                    `

                    : ''

                }


                ${

                  finalAmount != null

                    ? `

                      <p>

                        <strong>

                          Final Amount:

                          TZS
                          ${Number(
                            finalAmount
                          ).toLocaleString()}

                        </strong>

                      </p>

                    `

                    : ''

                }


                ${

                  controlNumber

                    ? `

                      <p>

                        <strong>

                          Control Number:

                          ${controlNumber}

                        </strong>

                      </p>

                    `

                    : ''

                }


                <p>

                  The farmer can now proceed
                  with payment.

                </p>

              </div>

            `,


            confirmButtonText:
              'OK',


            allowOutsideClick:
              false

          });


          this.closeViewModal();


          this.loadRequests();

        },


        error: (err: any) => {

          console.log(
            'APPROVE REQUEST ERROR:',
            err
          );


          Swal.fire({

            icon:
              'error',


            title:
              'Approval Failed',


            text:

              err?.error?.message ||

              err?.error ||

              'Failed to approve request.'

          });

        }

      });

  }


  // =========================================================
  // REJECT REQUEST
  // =========================================================

  rejectRequest(
    request: any
  ): void {

    if (!request?.id) {

      Swal.fire(
        'Error',
        'Invalid service request.',
        'error'
      );

      return;

    }


    Swal.fire({

      title:
        'Reject Request?',


      text:
        'Are you sure you want to reject this service request?',


      icon:
        'warning',


      showCancelButton:
        true,


      confirmButtonText:
        'Yes, Reject',


      cancelButtonText:
        'Cancel',


      reverseButtons:
        true

    })
    .then(result => {

      if (!result.isConfirmed) {

        return;

      }


      Swal.fire({

        title:
          'Rejecting Request...',


        text:
          'Please wait...',


        allowOutsideClick:
          false,


        didOpen: () => {

          Swal.showLoading();

        }

      });


      this.requestService
        .rejectRequest(
          request.id
        )
        .subscribe({

          next: () => {

            Swal.fire({

              icon:
                'success',


              title:
                'Request Rejected',


              text:
                'The service request has been rejected successfully.',


              timer:
                2000,


              showConfirmButton:
                false

            });


            this.closeViewModal();


            this.loadRequests();

          },


          error: (err: any) => {

            console.log(
              'REJECT REQUEST ERROR:',
              err
            );


            Swal.fire({

              icon:
                'error',


              title:
                'Rejection Failed',


              text:

                err?.error?.message ||

                err?.error ||

                'Failed to reject request.'

            });

          }

        });

    });

  }


  // =========================================================
  // PENDING REQUEST COUNT
  // =========================================================

  get pendingCount(): number {

    return this.requests
      .filter(
        request =>
          request.status === 'PENDING'
      )
      .length;

  }


  // =========================================================
  // WAITING PAYMENT COUNT
  // =========================================================

  get waitingPaymentCount(): number {

    return this.requests
      .filter(
        request =>
          request.status === 'WAITING_PAYMENT'
      )
      .length;

  }


  // =========================================================
  // APPROVED COUNT
  // =========================================================

  get approvedCount(): number {

    return this.requests
      .filter(
        request =>
          request.status === 'APPROVED'
      )
      .length;

  }


  // =========================================================
  // REJECTED COUNT
  // =========================================================

  get rejectedCount(): number {

    return this.requests
      .filter(
        request =>
          request.status === 'REJECTED'
      )
      .length;

  }

}