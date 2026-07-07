import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import Swal from 'sweetalert2';

import { PlotService }
from '../../services/plot.service';

import { AuthService }
from '../../services/auth.service';

@Component({
  selector: 'app-my-plots',
  imports: [CommonModule],
  templateUrl: './my-plots.html',
  styleUrl: './my-plots.css',
})

export class MyPlots implements OnInit {

  constructor(

    private plotService: PlotService,

    private authService: AuthService,

    private cdr: ChangeDetectorRef

  ){}

  showModal = false;

  selectedPlot:any = null;

  plots:any[] = [];

  farmerId!:number;

  ngOnInit(): void {

    const user =
      this.authService.getUser();

    if(user){

      this.farmerId = user.id;

      this.loadPlots();

    }

  }

  loadPlots(){

    this.plotService

        .getFarmerPlots(
          this.farmerId
        )

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

  viewPlot(plot:any){

    this.selectedPlot = plot;

    this.showModal = true;

  }

  get totalLandSize():number{

    return this.plots.reduce(

      (sum,plot)=>

        sum + (plot.size || 0),

      0

    );

  }

}