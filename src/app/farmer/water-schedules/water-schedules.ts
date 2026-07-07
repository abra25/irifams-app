import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { WaterScheduleService } from '../../services/water-schedule.service';

@Component({
  selector: 'app-water-schedules',
  imports: [CommonModule],
  templateUrl: './water-schedules.html',
  styleUrl: './water-schedules.css',
})
export class WaterSchedules implements OnInit{

showModal=false;

selectedSchedule:any;

schedules:any[]=[];

constructor(

private waterService:WaterScheduleService,

private cdr:ChangeDetectorRef

){}

ngOnInit(){

this.loadSchedules();

}
  // showModal = false;

  // selectedSchedule: any = null;

  // schedules:any[] = [];

  loadSchedules(){

this.waterService

.getMyFarmSchedules()

.subscribe({

next:(res)=>{

this.schedules=[...res];

this.cdr.detectChanges();

},

error:(err)=>{

console.log(err);

}

});

}

  openDetails(schedule:any){

this.selectedSchedule=schedule;

this.showModal=true;

}

}