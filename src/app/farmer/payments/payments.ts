import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-payments',
  imports: [CommonModule],
  templateUrl: './payments.html',
  styleUrl: './payments.css',
})
export class Payments {

  showModal = false;

  selectedPayment: any = null;

   payments = [

  {
    controlNumber: 'CN-2026-001',
    service: 'Tractor Service',
    amount: 50000,
    paymentDate: '-',
    status: 'Pending',
    receiptNo: '-'
  },

  {
    controlNumber: 'CN-2026-002',
    service: 'Harvesting Service',
    amount: 70000,
    paymentDate: '-',
    status: 'Waiting Verification',
    receiptNo: '-'
  },

  {
    controlNumber: 'CN-2026-003',
    service: 'Tractor Service',
    amount: 45000,
    paymentDate: '2026-06-05',
    status: 'Paid',
    receiptNo: 'RCT-002'
  }

];

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