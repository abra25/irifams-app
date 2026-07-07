import {
  CommonModule
} from '@angular/common';

import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import Swal from 'sweetalert2';

import { PlotService }
from '../../services/plot.service';

interface Plot{

  id?:number;

  plotNo:string;

  farmer:any;

  block:string;

  size:number|null;

  soilType:string;

  season:string;

  status:string;

  locationDescription?:string;

  irrigationMethod?:string;

}

@Component({
  selector:'app-admin-plots',
  imports:[
    CommonModule,
    FormsModule
  ],
  templateUrl:'./admin-plots.html',
  styleUrl:'./admin-plots.css'
})
export class AdminPlots implements OnInit{

  constructor(
    private plotService:PlotService,
    private cdr:ChangeDetectorRef
  ){}

  ngOnInit(): void {

    this.loadPlots();

  }

  searchTerm='';

  showAddModal=false;
  showViewModal=false;
  showEditModal=false;

  selectedPlot!:Plot;

  plots:Plot[]=[];

  newPlot:any={

    plotNo:'',
    farmerId:'',
    block:'',
    size:null,
    soilType:'',
    season:'',
    irrigationMethod:'',
    locationDescription:'',
    status:'ACTIVE'

  };

  loadPlots(){

    this.plotService
        .getAllPlots()

        .subscribe({

          next:(res)=>{

            this.plots=[...res];

            this.cdr.detectChanges();

          },

          error:(err)=>{

            console.log(err);

            Swal.fire(
              'Error',
              'Failed to load plots',
              'error'
            );

          }

        });

  }

  get filteredPlots(){

    return this.plots.filter(plot=>

      plot.plotNo
          .toLowerCase()
          .includes(
            this.searchTerm.toLowerCase()
          )

      ||

      plot.block
          .toLowerCase()
          .includes(
            this.searchTerm.toLowerCase()
          )

      ||

      plot.farmer?.fullName
          ?.toLowerCase()
          .includes(
            this.searchTerm.toLowerCase()
          )

    );

  }

  addPlot(){

    const payload={

      plotNo:this.newPlot.plotNo,

      block:this.newPlot.block,

      size:this.newPlot.size,

      soilType:this.newPlot.soilType,

      season:this.newPlot.season,

      irrigationMethod:
      this.newPlot.irrigationMethod,

      locationDescription:
      this.newPlot.locationDescription,

      status:this.newPlot.status

    };

    this.plotService

        .addPlot(
          this.newPlot.farmerId,
          payload
        )

        .subscribe({

          next:()=>{

            Swal.fire(
              'Success',
              'Plot added successfully',
              'success'
            );

            this.showAddModal=false;

            this.newPlot={

              plotNo:'',
              farmerId:'',
              block:'',
              size:null,
              soilType:'',
              season:'',
              irrigationMethod:'',
              locationDescription:'',
              status:'ACTIVE'

            };

            this.loadPlots();

          },

          error:(err)=>{

            Swal.fire(
              'Error',
              err.error,
              'error'
            );

          }

        });

  }

 viewPlot(plot:any){

  this.selectedPlot = plot;

  this.showViewModal = true;

}

editPlot(plot:any){

  this.selectedPlot = {...plot};

  this.showEditModal = true;

}

savePlot(){

  this.plotService

      .updatePlot(
        this.selectedPlot.id!,
        this.selectedPlot
      )

      .subscribe({

        next:()=>{

          Swal.fire(
            'Success',
            'Plot updated successfully',
            'success'
          );

          this.showEditModal = false;

          this.loadPlots();

        }

      });

}

deletePlot(id:number){

  Swal.fire({

    title:'Delete Plot?',

    text:'You cannot undo this action',

    icon:'warning',

    showCancelButton:true

  })

  .then(result=>{

    if(result.isConfirmed){

      this.plotService

          .deletePlot(id)

          .subscribe({

            next:()=>{

              Swal.fire(
                'Deleted',
                'Plot removed successfully',
                'success'
              );

              this.loadPlots();

            }

          });

    }

  });

}



  get activePlotsCount(){

    return this.plots.filter(

      p=>p.status==='ACTIVE'

    ).length;

  }

  toggleStatus(plot: any) {

    plot.status =
      plot.status === 'Active'
      ? 'Inactive'
      : 'Active';

  }

}


