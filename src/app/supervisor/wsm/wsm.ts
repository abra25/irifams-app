import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { WaterScheduleService }
from '../../services/water-schedule.service';

import { PlotService }
from '../../services/plot.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-wsm',
  imports: [CommonModule, FormsModule],
  templateUrl: './wsm.html',
  styleUrl: './wsm.css'
})
export class Wsm implements OnInit {
  constructor(

    private scheduleService:
    WaterScheduleService,

    private plotService:
    PlotService,

    private cdr:
    ChangeDetectorRef,
 
    private authService: 
    AuthService

  ){}

  showAddModal = false;
  showViewModal = false;
  showEditModal = false;

  selectedSchedule:any = null;

  schedules:any[] = [];

  plots:any[] = [];

  selectedPlotId!:number;

  supervisorId!:number;

  newSchedule = {

    irrigationDate:'',

    startTime:'',

    endTime:'',

    canal:'',

    season:'',

    notes:'',

    status:'ACTIVE'

  };

  ngOnInit(): void {

    const user = this.authService.getUser();

    this.supervisorId = user.id;

    this.loadSchedules();

    this.loadPlots();

  

console.log(user);

this.supervisorId = user.id;

  }

  loadSchedules(){

  this.scheduleService

      .getMySchedules()

      .subscribe({

        next:(res)=>{

          this.schedules = [...res];

          this.cdr.detectChanges();

        },

        error:()=>{

          Swal.fire(
            'Error',
            'Failed to load schedules',
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

          console.log(res);

          this.plots = [...res];

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

  addSchedule(){

    this.scheduleService.addSchedule(
    this.selectedPlotId,
    this.newSchedule
)

        .subscribe({

          next:()=>{

            Swal.fire(
              'Success',
              'Schedule created successfully',
              'success'
            );

            this.showAddModal = false;

            this.loadSchedules();

          },

          error:()=>{

            Swal.fire(
              'Error',
              'Failed to create schedule',
              'error'
            );

          }

        });

  }

  viewSchedule(schedule:any){

    this.selectedSchedule = schedule;

    this.showViewModal = true;

  }

  editSchedule(schedule:any){

    this.selectedSchedule = {
      ...schedule
    };

    this.showEditModal = true;

  }

  saveEdit(){

    this.scheduleService

        .updateSchedule(

          this.selectedSchedule.id,

          this.selectedSchedule

        )

        .subscribe({

          next:()=>{

            Swal.fire(
              'Success',
              'Schedule updated',
              'success'
            );

            this.showEditModal = false;

            this.loadSchedules();

          }

        });

  }

  get activeSchedulesCount(){

    return this.schedules.filter(

      s => s.status === 'ACTIVE'

    ).length;

  }

  toggleStatus(schedule:any){

  schedule.status =

    schedule.status === 'ACTIVE'
    ? 'COMPLETED'
    : 'ACTIVE';

}

}