import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-payments',standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-payments.html',
  styleUrl: './admin-payments.css'
})
export class AdminPayments {

  searchTerm = '';

  showModal = false;
  selectedPayment: any = null;

  payments = [

    {
      id:'PAY-001',
      farmer:'Ali Hassan',
      service:'Tractor Service',
      controlNumber:'CN-2026-001',
      amount:50000,
      paymentDate:'2026-06-20',
      status:'Waiting Verification',
      receiptNo:'-'
    },

    {
      id:'PAY-002',
      farmer:'Fatma Omar',
      service:'Harvesting Service',
      controlNumber:'CN-2026-002',
      amount:70000,
      paymentDate:'2026-06-18',
      status:'Paid',
      receiptNo:'RCT-001'
    },

    {
      id:'PAY-003',
      farmer:'Ahmed Suleiman',
      service:'Tractor Service',
      controlNumber:'CN-2026-003',
      amount:45000,
      paymentDate:'2026-06-15',
      status:'Rejected',
      receiptNo:'-'
    }

  ];

  get filteredPayments() {

    return this.payments.filter(payment =>

      payment.farmer.toLowerCase()
      .includes(this.searchTerm.toLowerCase())

      ||

      payment.controlNumber.toLowerCase()
      .includes(this.searchTerm.toLowerCase())

      ||

      payment.id.toLowerCase()
      .includes(this.searchTerm.toLowerCase())

    );

  }

  get paidCount(): number {

    return this.payments.filter(
      payment => payment.status === 'Paid'
    ).length;

  }

  get waitingCount(): number {

    return this.payments.filter(
      payment => payment.status === 'Waiting Verification'
    ).length;

  }

  openDetails(payment: any) {

    this.selectedPayment = payment;
    this.showModal = true;

  }

  verifyPayment(payment: any) {

    payment.status = 'Paid';

    payment.receiptNo =
      'RCT-' + Math.floor(Math.random() * 10000);

    alert('Payment verified successfully');

  }

  rejectPayment(payment: any) {

    payment.status = 'Rejected';

    alert('Payment rejected');

  }

}