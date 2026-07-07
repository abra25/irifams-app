import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payments',
  imports: [CommonModule],
  templateUrl: './payments.html',
  styleUrl: './payments.css',
})
export class Payments implements OnInit{

  showModal = false;

  selectedPayment: any = null;

   payments: any[] = [];

constructor(

  private paymentService: PaymentService,
    private cdr:ChangeDetectorRef

){}

ngOnInit(){

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

        error:(err)=>{

          console.log(err);

        }

      });

}

markAsPaid(payment: any) {

  payment.status = 'Waiting Verification';

  alert(
    'Payment submitted successfully. Waiting for verification.'
  );

}
  openDetails(payment: any) {

    this.selectedPayment = payment;
    this.showModal = true;

  }

  get totalPaid() {

    return this.payments
      .filter(p => p.status === 'Paid')
      .reduce((sum, p) => sum + p.amount, 0);

  }

  get pendingAmount() {

    return this.payments
      .filter(p => p.status === 'Pending')
      .reduce((sum, p) => sum + p.amount, 0);

  }

}