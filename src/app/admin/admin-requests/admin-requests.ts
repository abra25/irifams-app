import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-requests',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-requests.html',
  styleUrl: './admin-requests.css'
})
export class AdminRequests {

  selectedStatus = 'All';
  searchTerm = '';

  showModal = false;
  selectedRequest: any = null;

  requests = [

    {
      id:'REQ-001',
      farmer:'Ali Hassan',
      plot:'PLT-001',
      service:'Tractor Service',
      date:'2026-06-20',
      amount:50000,
      status:'Pending',
      paymentStatus:'Pending',
      controlNumber:'-'
    },

    {
      id:'REQ-002',
      farmer:'Fatma Omar',
      plot:'PLT-005',
      service:'Harvesting Service',
      date:'2026-06-18',
      amount:70000,
      status:'Approved',
      paymentStatus:'Waiting Verification',
      controlNumber:'CN-2026-001'
    },

    {
      id:'REQ-003',
      farmer:'Ahmed Suleiman',
      plot:'PLT-003',
      service:'Tractor Service',
      date:'2026-06-10',
      amount:45000,
      status:'Completed',
      paymentStatus:'Paid',
      controlNumber:'CN-2026-002'
    }

  ];

  get filteredRequests() {

    return this.requests.filter(request => {

      const statusMatch =
        this.selectedStatus === 'All' ||
        request.status === this.selectedStatus;

      const searchMatch =
        request.farmer.toLowerCase()
        .includes(this.searchTerm.toLowerCase()) ||

        request.id.toLowerCase()
        .includes(this.searchTerm.toLowerCase()) ||

        request.plot.toLowerCase()
        .includes(this.searchTerm.toLowerCase());

      return statusMatch && searchMatch;

    });

  }

  openDetails(request:any) {

    this.selectedRequest = request;
    this.showModal = true;

  }

  verifyPayment(request:any) {

    request.paymentStatus = 'Paid';

    alert('Payment verified successfully');

  }

  rejectPayment(request:any) {

    request.paymentStatus = 'Rejected';

    alert('Payment rejected');

  }

  get pendingCount(): number {
  return this.requests.filter(
    request => request.status === 'Pending'
  ).length;
}

get approvedCount(): number {
  return this.requests.filter(
    request => request.status === 'Approved'
  ).length;
}

get completedCount(): number {
  return this.requests.filter(
    request => request.status === 'Completed'
  ).length;
}

}
