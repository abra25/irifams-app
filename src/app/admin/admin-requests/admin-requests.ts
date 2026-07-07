import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-admin-requests',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-requests.html',
  styleUrl: './admin-requests.css'
})
export class AdminRequests implements OnInit {

  constructor(
    private requestService: RequestService,
    private cdr: ChangeDetectorRef
  ){}

  selectedStatus='All';
  searchTerm='';

  serviceCost = 0;

  showModal=false;
  selectedRequest:any;

  requests:any[]=[];

  ngOnInit(): void {

    this.loadRequests();

  }

  loadRequests(){

  this.requestService
      .getAllRequests()
      .subscribe({

        next:(res)=>{

          this.requests = [...res];
          this.cdr.detectChanges();

        },

        error:(err)=>{

          console.log("STATUS:", err.status);
          console.log("BODY:", err.error);
          console.log("HEADERS:", err.headers);

        }

      });

}

  get filteredRequests(){

    return this.requests.filter(request=>{

      const statusMatch =

        this.selectedStatus === 'All'

        ||

        request.status ===
        this.selectedStatus.toUpperCase();

      const searchMatch =

        request.farmer?.fullName
        ?.toLowerCase()
        .includes(
          this.searchTerm.toLowerCase()
        )

        ||

        request.id
        ?.toString()
        .includes(this.searchTerm)

        ||

        request.plot?.plotNo
        ?.toLowerCase()
        .includes(
          this.searchTerm.toLowerCase()
        );

      return statusMatch && searchMatch;

    });

  }

  openDetails(request:any){

    this.selectedRequest = request;

    this.showModal = true;

  }

  approveRequest(id:number){

  Swal.fire({

    title:'Approve Request?',

    icon:'question',

    showCancelButton:true

  }).then(result=>{

    if(result.isConfirmed){

       this.requestService

        .approveRequest(

            this.selectedRequest.id,

            this.serviceCost

        )

          .subscribe({

            next:()=>{

              Swal.fire(
                'Success',
                'Request Approved',
                'success'
              );

              this.loadRequests();

            }

          });

    }

  });

}

  rejectRequest(id:number){

  Swal.fire({

    title:'Reject Request?',

    icon:'warning',

    showCancelButton:true

  }).then(result=>{

    if(result.isConfirmed){

      this.requestService
          .rejectRequest(id)

          .subscribe({

            next:()=>{

              Swal.fire(
                'Rejected',
                'Request Rejected',
                'success'
              );

              this.loadRequests();

            }

          });

    }

  });

}

  generateControlNumber(id:number){

  Swal.fire({

    title:'Generate Control Number?',

    icon:'question',

    showCancelButton:true

  }).then(result=>{

    if(result.isConfirmed){

      this.requestService
          .generateControlNumber(id)

          .subscribe({

            next:()=>{

              Swal.fire(
                'Success',
                'Control Number Generated',
                'success'
              );

              this.loadRequests();

            }

          });

    }

  });

}

  get pendingCount(){

    return this.requests.filter(

      r => r.status === 'PENDING'

    ).length;

  }

 get waitingPaymentCount(){

    return this.requests.filter(

        r => r.status === 'WAITING_PAYMENT'

    ).length;

}

  get completedCount(){

    return this.requests.filter(

      r => r.status === 'COMPLETED'

    ).length;

  }

  verifyPayment(request:any) {



    request.paymentStatus = 'Paid';



    alert('Payment verified successfully');



  }



  rejectPayment(request:any) {



    request.paymentStatus = 'Rejected';



    alert('Payment rejected');



  }

}