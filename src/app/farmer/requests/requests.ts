import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import Swal from 'sweetalert2';

import { RequestService } from '../../services/request.service';
import { PlotService } from '../../services/plot.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './requests.html',
  styleUrl: './requests.css'
})
export class Requests implements OnInit {
showModal: any;

  constructor(

    private requestService: RequestService,

    private plotService: PlotService,

    private authService:AuthService,

    private cdr: ChangeDetectorRef

  ){}

  //=========================
  // DATA
  //=========================

  requests:any[]=[];

  plots:any[]=[];

  selectedPlot:any=null;

  selectedRequest:any=null;

  
  showAddModal = false;

  showDetailsModal = false;

  loading=false;

  currentUser:any;

  //=========================
  // FORM
  //=========================

  request={

    plotId:0,

    serviceType:'',

    preferredDate:'',

    notes:''

};

  services=[

    'TRACTOR_SERVICE',

    'HARVESTING_SERVICE'

  ];

  //=========================
  // INIT
  //=========================

  ngOnInit(): void {

    this.currentUser =

    this.authService.getUser();

    this.loadPlots();

    this.loadRequests();

  }

  //=========================
  // LOAD PLOTS
  //=========================

  loadPlots(){

    this.plotService
        .getMyFarmPlots()

        .subscribe({

          next:(res)=>{

            this.plots=res;

            this.cdr.detectChanges();

          },

          error:()=>{

            Swal.fire(
              'Error',
              'Failed to load plots',
              'error'
            );

          }

        });

  }

  //=========================
  // LOAD REQUESTS
  //=========================

  loadRequests(){

    this.requestService

        .getMyFarmRequests()

        .subscribe({

          next:(res)=>{

            this.requests=res;

            this.cdr.detectChanges();

          },

          error:()=>{

            Swal.fire(
              'Error',
              'Unable to load requests',
              'error'
            );

          }

        });

  }

  //=========================
  // SELECT PLOT
  //=========================

  onPlotChange(){

    this.selectedPlot=

      this.plots.find(

        p=>p.id==this.request.plotId

      );

  }

  //=========================
  // OPEN MODAL
  //=========================

  openCreateModal(){

    this.showAddModal=true;

  }

  //=========================
  // CLOSE MODAL
  //=========================

  closeModal(){

    this.showAddModal=false;

    this.clearForm();

  }

  //=========================
  // SUBMIT REQUEST
  //=========================

  submitRequest(){

  if(

    !this.request.plotId ||

    !this.request.serviceType ||

    !this.request.preferredDate

  ){

    Swal.fire(

      'Validation',

      'Please complete all required fields',

      'warning'

    );

    return;

  }

  this.loading = true;

  this.requestService

      .submitRequest(

        this.currentUser.id,

        this.request.plotId,

        {

          serviceType:this.request.serviceType,

          preferredDate:this.request.preferredDate,

          notes:this.request.notes

        }

      )

      .subscribe({

        next:()=>{

          this.loading = false;

          this.showAddModal = false;

          this.clearForm();

          this.loadRequests();

          Swal.fire({

            icon:'success',

            title:'Success',

            text:'Service request submitted successfully',

            timer:1800,

            showConfirmButton:false

          });

        },

        error:(err)=>{

          this.loading = false;

          Swal.fire(

            'Error',

            err.error ||

            'Failed to submit request',

            'error'

          );

        }

      });

}

  //=========================
  // DETAILS
  //=========================

  openDetails(request:any){

    this.selectedRequest=request;

    this.showDetailsModal=true;

  }

  //=========================
  // CLEAR
  //=========================

  clearForm(){

    this.request={

    plotId:0,

    serviceType:'',

    preferredDate:'',

    notes:''

};

    this.selectedPlot=null;

  }

  //=========================
  // SUMMARY
  //=========================

  get totalRequests(){

    return this.requests.length;

  }

   get pendingCount(){

  return this.requests.filter(

    x => x.status === 'PENDING'

  ).length;

}

get completedCount(){

  return this.requests.filter(

    x => x.status === 'COMPLETED'

  ).length;

}

  get approvedCount(){

    return this.requests.filter(

      x=>x.status==='APPROVED'

    ).length;

  }

  

}