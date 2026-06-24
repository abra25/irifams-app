import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-requests',
  imports: [CommonModule],
  templateUrl: './my-requests.html',
  styleUrl: './my-requests.css',
})
export class MyRequests {


  showModal = false;

  selectedRequest: any = null;

  requests = [

  {
    id: 'REQ-001',
    plot: 'PLT-001',
    service: 'Tractor Service',
    date: '2026-06-12',
    amount: 50000,
    status: 'Pending',
    controlNumber: null,
    notes: 'Land preparation for Season A'
  },

  {
    id: 'REQ-002',
    plot: 'PLT-002',
    service: 'Harvesting Service',
    date: '2026-06-08',
    amount: 70000,
    status: 'Approved',
    controlNumber: null,
    notes: 'Ready for harvesting'
  },

  {
    id: 'REQ-003',
    plot: 'PLT-003',
    service: 'Tractor Service',
    date: '2026-06-01',
    amount: 50000,
    status: 'Completed',
    controlNumber: 'CN-2026-001',
    notes: 'Completed successfully'
  }

];

generateControlNumber(request: any) {

  request.controlNumber =
    'CN-' + Math.floor(Math.random() * 1000000);

  alert(
    `Control Number ${request.controlNumber} generated successfully`
  );

}

  openDetails(request: any) {

    this.selectedRequest = request;
    this.showModal = true;

  }

}
