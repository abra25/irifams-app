import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlotService } from '../../services/plot.service';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

interface Plot {

  id?: number;

  plotNo: string;

  farmer?: any;

  block: string;

  size: number;

  soilType: string;

  locationDescription?: string;

  irrigationMethod?: string;

  season?: string;

  status?: string;

}

@Component({
  selector: 'app-s-plots',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './s-plots.html',
  styleUrl: './s-plots.css',
})
export class SPlots implements OnInit {
  constructor(
    private plotService: PlotService,
    private userService: UserService,
    private cdr: ChangeDetectorRef

  ){}

  searchTerm = '';

  showAddModal = false;
  showViewModal = false;
  showEditModal = false;
  selectedPlot: any = null;
  plots: Plot[] = [];
  selectedFarmerId!: number;
  farmers: any[] = [];

  newPlot: Plot = {
  plotNo: '',
  block: '',
  size: 0,
  soilType: '',
  locationDescription: '',
  irrigationMethod: '',
  season: '',
  status: 'Active'

};

ngOnInit(): void {

  this.loadPlots();

  this.loadFarmers();

}

loadFarmers(){

  this.userService

      .getMyFarmers()

      .subscribe({

        next:(res)=>{

          this.farmers = [...res];

          this.cdr.detectChanges();

        },

        error:()=>{

          Swal.fire(
            'Error',
            'Failed to load farmers',
            'error'
          );

        }

      });

}

loadPlots(){

  this.plotService

      .getMyPlots()

      .subscribe({

        next:(res)=>{

          this.plots = [...res];

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

  addPlot(){

  this.plotService

      .addPlot(

        this.selectedFarmerId,

        this.newPlot

      )

      .subscribe({

        next:()=>{

          Swal.fire(
            'Success',
            'Plot registered successfully',
            'success'
          );

          this.showAddModal = false;

          this.loadPlots();

          this.newPlot = {

            plotNo:'',
            block:'',
            size:0,
            soilType:'',
            locationDescription:'',
            irrigationMethod:'',
            season:'',
            status:'Active'

          };

        },

        error:(err)=>{

          Swal.fire(
            'Error',
            err.error ||
            'Failed to register plot',
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

  saveEdit(){

  this.plotService

      .updatePlot(

        this.selectedPlot.id,

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

        },

        error:()=>{

          Swal.fire(
            'Error',
            'Failed to update plot',
            'error'
          );

        }

      });

}

  toggleStatus(plot: any) {

    plot.status =
      plot.status === 'Active'
      ? 'Inactive'
      : 'Active';

  }

  get activePlotsCount(): number {

  return this.plots.filter(

    (p: Plot) => p.status === 'Active'

  ).length;

}

}
