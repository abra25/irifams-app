import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-s-requests',
  imports: [CommonModule,FormsModule],
  templateUrl: './s-requests.html',
  styleUrl: './s-requests.css',
})
export class SRequests {

  showViewModal = false;
  showApproveModal = false;

  selectedRequest: any = null;

  serviceCost = 0;

  requests = [

    {
      id: 'REQ-001',
      farmer: 'Ali Hassan',
      plot: 'PLT-001',
      service: 'Tractor Service',
      requestDate: '2026-06-20',
      preferredDate: '2026-06-25',
      status: 'Pending',
      notes: 'Need land preparation.'
    },

    {
      id: 'REQ-002',
      farmer: 'Fatma Omar',
      plot: 'PLT-002',
      service: 'Harvesting Service',
      requestDate: '2026-06-18',
      preferredDate: '2026-06-24',
      status: 'Approved',
      amount: 70000,
      notes: 'Ready for harvesting.'
    },

    {
      id: 'REQ-003',
      farmer: 'Ahmed Suleiman',
      plot: 'PLT-003',
      service: 'Tractor Service',
      requestDate: '2026-06-16',
      preferredDate: '2026-06-23',
      status: 'Rejected',
      notes: 'No available tractor.'
    }

  ];

  viewRequest(request: any) {

    this.selectedRequest = request;
    this.showViewModal = true;

  }

  openApproveModal(request: any) {

    this.selectedRequest = request;
    this.serviceCost = 0;

    this.showApproveModal = true;

  }

  approveRequest() {

    this.selectedRequest.status = 'Approved';
    this.selectedRequest.amount = this.serviceCost;

    this.showApproveModal = false;

  }

  rejectRequest(request: any) {

    request.status = 'Rejected';

  }

  get pendingCount(): number {

    return this.requests.filter(
      r => r.status === 'Pending'
    ).length;

  }

}
