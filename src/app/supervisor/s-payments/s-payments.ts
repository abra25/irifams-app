import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-s-payments',
  imports: [CommonModule],
  templateUrl: './s-payments.html',
  styleUrl: './s-payments.css',
})
export class SPayments {


  showModal = false;
  selectedPayment: any = null;

  payments = [

    {
      id: 1,
      farmer: 'Ali Hassan',
      controlNumber: 'CN-2026-001',
      service: 'Tractor Service',
      amount: 50000,
      paymentDate: '2026-06-20',
      status: 'Waiting Verification',
      receiptNo: '-'
    },

    {
      id: 2,
      farmer: 'Fatma Omar',
      controlNumber: 'CN-2026-002',
      service: 'Harvesting Service',
      amount: 70000,
      paymentDate: '2026-06-18',
      status: 'Paid',
      receiptNo: 'RCT-002'
    }

  ];

  openDetails(payment: any) {

    this.selectedPayment = payment;
    this.showModal = true;

  }

  verifyPayment(payment: any) {

    payment.status = 'Paid';
    payment.receiptNo =
      'RCT-' + Math.floor(Math.random() * 1000);

  }

  rejectPayment(payment: any) {

    payment.status = 'Rejected';

  }

  get waitingCount(): number {

    return this.payments.filter(
      p => p.status === 'Waiting Verification'
    ).length;

  }

  get totalPaid(): number {

    return this.payments
      .filter(p => p.status === 'Paid')
      .reduce((sum, p) => sum + p.amount, 0);

  }

}