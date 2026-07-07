import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { PaymentService } from '../../services/payment.service';

interface Payment {

  id?:number;

  amount:number;

  controlNumber:string;

  receiptNo?:string;

  paymentDate?:string;

  status:string;

  farmer:any;

  serviceRequest:any;

}

@Component({
  selector: 'app-admin-payments',
  standalone:true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-payments.html',
  styleUrl: './admin-payments.css'
})
export class AdminPayments implements OnInit {

  constructor(
    private paymentService: PaymentService,
        private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {

    this.loadPayments();

  }

  searchTerm='';

  showModal=false;

  selectedPayment!:Payment;

  payments:Payment[]=[];

  loadPayments(){

    this.paymentService
        .getAllPayments()

        .subscribe({

          next:(res)=>{

            this.payments=[...res];
            
            this.cdr.detectChanges();

          },

          error:()=>{

            Swal.fire(
              'Error',
              'Failed to load payments',
              'error'
            );

          }

        });

  }

  get filteredPayments(){

    return this.payments.filter(payment =>

      payment.farmer?.fullName
      ?.toLowerCase()
      .includes(this.searchTerm.toLowerCase())

      ||

      payment.controlNumber
      ?.toLowerCase()
      .includes(this.searchTerm.toLowerCase())

      ||

      payment.id
      ?.toString()
      .includes(this.searchTerm)

    );

  }

  get paidCount(){

    return this.payments.filter(
      p => p.status === 'PAID'
    ).length;

  }

  get waitingCount(){

    return this.payments.filter(
      p => p.status === 'WAITING_VERIFICATION'
    ).length;

  }

  openDetails(payment:Payment){

    this.selectedPayment = payment;

    this.showModal = true;

  }

  verifyPayment(){

    this.paymentService

        .verifyPayment(
          this.selectedPayment.id!
        )

        .subscribe({

          next:()=>{

            Swal.fire(
              'Success',
              'Payment verified successfully',
              'success'
            );

            this.showModal=false;

            this.loadPayments();

          },

          error:()=>{

            Swal.fire(
              'Error',
              'Verification failed',
              'error'
            );

          }

        });

  }

  rejectPayment(){

    Swal.fire(
      'Info',
      'Reject API not implemented yet.',
      'info'
    );

  }

}