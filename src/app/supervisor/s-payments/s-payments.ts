import { CommonModule } from '@angular/common';

import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import Swal from 'sweetalert2';

import { PaymentService }
from '../../services/payment.service';

@Component({
  selector: 'app-s-payments',
  imports: [CommonModule],
  templateUrl: './s-payments.html',
  styleUrl: './s-payments.css'
})

export class SPayments
implements OnInit {

  constructor(

    private paymentService:PaymentService,

    private cdr:ChangeDetectorRef

  ){}

  payments:any[]=[];

  selectedPayment:any;

  showModal=false;

  ngOnInit(): void {

    this.loadPayments();

  }

  loadPayments(){

    this.paymentService

        .getMyPayments()

        .subscribe({

          next:(res)=>{

            this.payments = [...res];

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

  openDetails(payment:any){

    this.selectedPayment = payment;

    this.showModal = true;

  }

  verifyPayment(payment:any){

    Swal.fire({

      title:'Verify Payment?',

      text:'Confirm this payment.',

      icon:'question',

      showCancelButton:true,

      confirmButtonText:'Verify'

    })

    .then(result=>{

      if(result.isConfirmed){

        this.paymentService

            .verifyPayment(payment.id)

            .subscribe({

              next:()=>{

                Swal.fire(
                  'Success',
                  'Payment verified successfully',
                  'success'
                );

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

    });

  }

  get waitingCount():number{

    return this.payments.filter(

      p=>

      p.status==='WAITING_VERIFICATION'

    ).length;

  }

  rejectPayment(payment:any){

  Swal.fire({

    title:'Reject Payment?',

    text:'This payment will be rejected.',

    icon:'warning',

    showCancelButton:true,

    confirmButtonText:'Reject'

  })

  .then(result=>{

    if(result.isConfirmed){

      this.paymentService

          .rejectPayment(payment.id)

          .subscribe({

            next:()=>{

              Swal.fire(
                'Success',
                'Payment rejected successfully',
                'success'
              );

              this.loadPayments();

            },

            error:()=>{

              Swal.fire(
                'Error',
                'Failed to reject payment',
                'error'
              );

            }

          });

    }

  });

}

  get totalPaid():number{

    return this.payments

      .filter(
        p=>p.status==='PAID'
      )

      .reduce(

        (sum,p)=>

        sum + (p.amount || 0),

        0

      );

  }

}