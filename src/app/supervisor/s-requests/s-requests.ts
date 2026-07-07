import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import Swal from 'sweetalert2';

import { RequestService }
from '../../services/request.service';

@Component({
  selector: 'app-s-requests',
  imports: [CommonModule, FormsModule],
  templateUrl: './s-requests.html',
  styleUrl: './s-requests.css'
})
export class SRequests
implements OnInit {

  constructor(

    private requestService: RequestService,

    private cdr: ChangeDetectorRef

  ){}

  requests:any[]=[];

  selectedRequest:any;

  showViewModal=false;

  showApproveModal=false;

  serviceCost=0;

  ngOnInit(): void {

    this.loadRequests();

  }

  loadRequests(){

    this.requestService

        .getMyRequests()

        .subscribe({

          next:(res)=>{

            this.requests = [...res];

            this.cdr.detectChanges();

          },

          error:()=>{

            Swal.fire(
              'Error',
              'Failed to load requests',
              'error'
            );

          }

        });

  }

  viewRequest(request:any){

    this.selectedRequest = request;

    this.showViewModal = true;

  }

  openApproveModal(request:any){

    this.selectedRequest = request;

    this.serviceCost =
      request.amount || 0;

    this.showApproveModal = true;

  }

  approveRequest(){

   this.requestService

.approveRequest(

this.selectedRequest.id,

this.serviceCost

)

        .subscribe({

          next:()=>{

            Swal.fire(
              'Success',
              'Request approved successfully',
              'success'
            );

            this.showApproveModal = false;

            this.loadRequests();

          },

          error:()=>{

            Swal.fire(
              'Error',
              'Failed to approve request',
              'error'
            );

          }

        });

  }

  rejectRequest(request:any){

    Swal.fire({

      title:'Reject Request?',

      icon:'warning',

      showCancelButton:true

    }).then(result=>{

      if(result.isConfirmed){

        this.requestService

            .rejectRequest(request.id)

            .subscribe({

              next:()=>{

                Swal.fire(
                  'Success',
                  'Request rejected',
                  'success'
                );

                this.loadRequests();

              }

            });

      }

    });

  }

  get pendingCount(): number {

    return this.requests.filter(

      r => r.status === 'PENDING'

    ).length;

  }

}