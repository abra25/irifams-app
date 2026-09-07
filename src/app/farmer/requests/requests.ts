import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import Swal from 'sweetalert2';

import { RequestService } from '../../services/request.service';
import { PlotService } from '../../services/plot.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './requests.html',
  styleUrl: './requests.css'
})
export class Requests implements OnInit {

  constructor(
    private requestService: RequestService,
    private plotService: PlotService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}


  // =========================================================
  // DATA
  // =========================================================

  requests: any[] = [];

  plots: any[] = [];

  selectedPlot: any = null;

  selectedRequest: any = null;

  showAddModal = false;

  showDetailsModal = false;

  loading = false;

  currentUser: any;


  // =========================================================
  // FORM
  // =========================================================

  request = {
    plotId: 0,
    serviceType: '',
    quantity: null as number | null,
    preferredDate: '',
    notes: ''
  };


  // =========================================================
  // AVAILABLE SERVICES
  // =========================================================

  services = [

    // =====================================================
    // MACHINE / TRACTOR SERVICES
    // Quantity is calculated automatically from plot size
    // =====================================================

    {
      value: 'KUBURUGIWA',
      label: 'Kuburugiwa',
      description: 'Land preparation / tractor service',
      price: 'TZS 15,000 per 1/4 acre',
      quantityLabel: '',
      quantityPlaceholder: ''
    },

    {
      value: 'KUCHIMBA',
      label: 'Kuchimba',
      description: 'Ploughing service',
      price: 'TZS 20,000 per 1/4 acre',
      quantityLabel: '',
      quantityPlaceholder: ''
    },

    {
      value: 'KUVUNA',
      label: 'Kuvuna',
      description: 'Harvesting service',
      price: 'TZS 30,000 per 1/4 acre',
      quantityLabel: '',
      quantityPlaceholder: ''
    },


    // =====================================================
    // NON-MACHINE SERVICES
    // Farmer enters quantity
    // =====================================================

    {
      value: 'DAWA_CHUPA',
      label: 'Dawa Chupa',
      description: 'Farm chemical supplied in bottle',
      price: 'TZS 25,000 per bottle',
      quantityLabel: 'Number of Bottles',
      quantityPlaceholder: 'Enter number of bottles'
    },

    {
      value: 'DAWA_VIFUKO_KUBWA',
      label: 'Dawa Vifuko Kubwa',
      description: 'Large-pack farm chemical',
      price: 'TZS 30,000 per bag',
      quantityLabel: 'Number of Large Bags',
      quantityPlaceholder: 'Enter number of large bags'
    },

    {
      value: 'DAWA_VIFUKO_NDOGO',
      label: 'Dawa Vifuko Ndogo',
      description: 'Small-pack farm chemical',
      price: 'TZS 12,000 per bag',
      quantityLabel: 'Number of Small Bags',
      quantityPlaceholder: 'Enter number of small bags'
    },

    {
      value: 'KUTILIWA_DAWA',
      label: 'Kutiliwa Dawa Shambani',
      description: 'Farm spraying/application service',
      price: 'TZS 10,000 per application',
      quantityLabel: 'Number of Applications',
      quantityPlaceholder: 'Enter number of applications'
    },

    {
      value: 'MBOLEA',
      label: 'Mbolea',
      description: 'Fertilizer',
      price: 'TZS 1,500 per kg',
      quantityLabel: 'Quantity in Kilograms (KG)',
      quantityPlaceholder: 'Enter quantity in KG'
    },

    {
      value: 'MBEGU_MPUNGA',
      label: 'Mbegu ya Mpunga',
      description: 'Rice seed',
      price: 'TZS 6,000 per 5kg bag',
      quantityLabel: 'Number of 5KG Bags',
      quantityPlaceholder: 'Enter number of 5KG bags'
    }

  ];


  // =========================================================
  // INIT
  // =========================================================

  ngOnInit(): void {

    this.currentUser = this.authService.getUser();

    this.loadPlots();

    this.loadRequests();
  }


  // =========================================================
  // LOAD FARMER PLOTS
  // =========================================================

  loadPlots(): void {

    this.plotService
      .getMyFarmPlots()
      .subscribe({

        next: (res) => {

          this.plots = res || [];

          this.cdr.detectChanges();
        },

        error: (err) => {

          console.log(
            'LOAD PLOTS ERROR:',
            err
          );

          Swal.fire(
            'Error',
            err?.error?.message ||
            err?.error ||
            'Failed to load your farm plots',
            'error'
          );
        }

      });
  }


  // =========================================================
  // LOAD FARMER REQUESTS
  // =========================================================

  loadRequests(): void {

    this.requestService
      .getMyFarmRequests()
      .subscribe({

        next: (res) => {

          this.requests = res || [];

          this.cdr.detectChanges();
        },

        error: (err) => {

          console.log(
            'LOAD REQUESTS ERROR:',
            err
          );

          Swal.fire(
            'Error',
            err?.error?.message ||
            err?.error ||
            'Unable to load your service requests',
            'error'
          );
        }

      });
  }


  // =========================================================
  // SELECT PLOT
  // =========================================================

  onPlotChange(): void {

    this.selectedPlot =
      this.plots.find(
        p => Number(p.id) === Number(this.request.plotId)
      ) || null;

    this.cdr.detectChanges();
  }


  // =========================================================
  // SERVICE CHANGE
  // =========================================================

  onServiceChange(): void {

    /*
     * Reset quantity whenever service changes
     */

    this.request.quantity = null;

    this.cdr.detectChanges();
  }


  // =========================================================
  // GET SELECTED SERVICE
  // =========================================================

  get selectedService(): any {

    return this.services.find(
      service =>
        service.value === this.request.serviceType
    );
  }


  // =========================================================
  // CHECK IF SERVICE IS MACHINE SERVICE
  // =========================================================

  isMachineService(): boolean {

    return [

      'KUBURUGIWA',

      'KUCHIMBA',

      'KUVUNA'

    ].includes(
      this.request.serviceType
    );
  }


  // =========================================================
  // CHECK IF QUANTITY IS REQUIRED
  // =========================================================

  get requiresQuantity(): boolean {

    if (!this.request.serviceType) {
      return false;
    }

    return !this.isMachineService();
  }


  // =========================================================
  // GET QUANTITY LABEL
  // =========================================================

  get quantityLabel(): string {

    return this.selectedService?.quantityLabel ||
      'Quantity';
  }


  // =========================================================
  // GET QUANTITY PLACEHOLDER
  // =========================================================

  get quantityPlaceholder(): string {

    return this.selectedService?.quantityPlaceholder ||
      'Enter quantity';
  }


  // =========================================================
  // GET SERVICE LABEL
  // =========================================================

  getServiceLabel(serviceType: string): string {

    if (!serviceType) {
      return 'N/A';
    }

    const service =
      this.services.find(
        item => item.value === serviceType
      );

    return service
      ? service.label
      : serviceType.replaceAll('_', ' ');
  }


  // =========================================================
  // GET STATUS LABEL
  // =========================================================

  getStatusLabel(status: string): string {

    if (!status) {
      return 'N/A';
    }

    return status
      .replaceAll('_', ' ')
      .replace(
        /\b\w/g,
        letter => letter.toUpperCase()
      );
  }


  // =========================================================
  // OPEN CREATE MODAL
  // =========================================================

  openCreateModal(): void {

    this.clearForm();

    this.showAddModal = true;

    this.cdr.detectChanges();
  }


  // =========================================================
  // CLOSE CREATE MODAL
  // =========================================================

  closeModal(): void {

    this.showAddModal = false;

    this.clearForm();

    this.cdr.detectChanges();
  }


  // =========================================================
  // SUBMIT REQUEST
  // =========================================================

  submitRequest(): void {

    // =====================================================
    // USER CHECK
    // =====================================================

    if (!this.currentUser?.id) {

      Swal.fire(
        'Session Error',
        'Your user session could not be found. Please login again.',
        'error'
      );

      return;
    }


    // =====================================================
    // PLOT CHECK
    // =====================================================

    if (!this.request.plotId) {

      Swal.fire(
        'Validation',
        'Please select a farm plot.',
        'warning'
      );

      return;
    }


    // =====================================================
    // SERVICE CHECK
    // =====================================================

    if (!this.request.serviceType) {

      Swal.fire(
        'Validation',
        'Please select a service type.',
        'warning'
      );

      return;
    }


    // =====================================================
    // QUANTITY CHECK
    // ONLY FOR NON-MACHINE SERVICES
    // =====================================================

    if (
      this.requiresQuantity &&
      (
        this.request.quantity === null ||
        this.request.quantity === undefined ||
        Number(this.request.quantity) <= 0
      )
    ) {

      Swal.fire(
        'Validation',
        `Please enter a valid ${this.quantityLabel}.`,
        'warning'
      );

      return;
    }


    // =====================================================
    // DATE CHECK
    // =====================================================

    if (!this.request.preferredDate) {

      Swal.fire(
        'Validation',
        'Please select your preferred service date.',
        'warning'
      );

      return;
    }


    // =====================================================
    // PREVENT PAST DATES
    // =====================================================

    const selectedDate =
      new Date(this.request.preferredDate);

    selectedDate.setHours(
      0,
      0,
      0,
      0
    );


    const today =
      new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );


    if (selectedDate < today) {

      Swal.fire(
        'Validation',
        'Preferred service date cannot be in the past.',
        'warning'
      );

      return;
    }


    // =====================================================
    // LOADING
    // =====================================================

    this.loading = true;


    // =====================================================
    // PAYLOAD
    // =====================================================

    const payload = {

      serviceType:
        this.request.serviceType,

      /*
       * Machine services:
       * quantity = null
       *
       * Other services:
       * farmer enters quantity
       */

      quantity:
        this.requiresQuantity
          ? Number(this.request.quantity)
          : null,

      preferredDate:
        this.request.preferredDate,

      notes:
        this.request.notes?.trim() || ''
    };


    // =====================================================
    // SUBMIT
    // =====================================================

    this.requestService
      .submitRequest(

        this.currentUser.id,

        this.request.plotId,

        payload

      )
      .subscribe({

        next: () => {

          this.loading = false;

          this.showAddModal = false;

          this.clearForm();

          this.loadRequests();


          Swal.fire({

            icon: 'success',

            title: 'Request Submitted',

            text:
              'Your service request has been submitted successfully and is awaiting review.',

            confirmButtonText:
              'OK',

            timer:
              3000,

            timerProgressBar:
              true
          });


          this.cdr.detectChanges();
        },


        error: (err) => {

          this.loading = false;

          console.log(
            'SUBMIT REQUEST ERROR:',
            err
          );


          Swal.fire({

            icon:
              'error',

            title:
              'Request Failed',

            text:
              err?.error?.message ||
              err?.error ||
              'Failed to submit service request.'
          });


          this.cdr.detectChanges();
        }

      });
  }


  // =========================================================
  // OPEN REQUEST DETAILS
  // =========================================================

  openDetails(request: any): void {

    this.selectedRequest =
      request;

    this.showDetailsModal =
      true;

    this.cdr.detectChanges();
  }


  // =========================================================
  // CLOSE DETAILS
  // =========================================================

  closeDetails(): void {

    this.showDetailsModal =
      false;

    this.selectedRequest =
      null;

    this.cdr.detectChanges();
  }


  // =========================================================
  // CLEAR FORM
  // =========================================================

  clearForm(): void {

    this.request = {

      plotId:
        0,

      serviceType:
        '',

      quantity:
        null,

      preferredDate:
        '',

      notes:
        ''
    };


    this.selectedPlot =
      null;

    this.loading =
      false;
  }


  // =========================================================
  // TRACK BY REQUEST
  // =========================================================

  trackByRequestId(
    index: number,
    request: any
  ): number {

    return request.id;
  }


  // =========================================================
  // SUMMARY
  // =========================================================

  get totalRequests(): number {

    return this.requests.length;
  }


  get pendingCount(): number {

    return this.requests.filter(
      x => x.status === 'PENDING'
    ).length;
  }


  get completedCount(): number {

    return this.requests.filter(
      x => x.status === 'COMPLETED'
    ).length;
  }


  get waitingPaymentCount(): number {

    return this.requests.filter(
      x => x.status === 'WAITING_PAYMENT'
    ).length;
  }


  get paidCount(): number {

    return this.requests.filter(
      x =>
        x.status === 'PAID' ||
        x.paymentConfirmed === true
    ).length;
  }


  get rejectedCount(): number {

    return this.requests.filter(
      x => x.status === 'REJECTED'
    ).length;
  }

}