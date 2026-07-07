import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit{
  stats:any[]=[];

requests:any[]=[];

schedules:any[]=[];

notifications:any[]=[];

   constructor(

private dashboardService:DashboardService,

private cdr:ChangeDetectorRef

){}

ngOnInit(){

this.loadStats();

this.loadRequests();

this.loadSchedules();

this.loadNotifications();

}

loadStats(){

this.dashboardService

.getFarmerStats()

.subscribe(res=>{

this.stats=[

{

title:'My Plots',

value:res.myPlots,

icon:'fas fa-map'

},

{

title:'Pending Requests',

value:res.pendingRequests,

icon:'fas fa-clock'

},

{

title:'Completed Services',

value:res.completedRequests,

icon:'fas fa-check-circle'

},

{

title:'Outstanding Payments',

value:'TZS '+(res.outstandingPayments ?? 0),

icon:'fas fa-money-bill-wave'

}

];

this.cdr.detectChanges();

});

}

loadRequests(){

this.dashboardService

.getFarmerRequests()

.subscribe(res=>{

this.requests=res;


});

}

loadSchedules(){

this.dashboardService

.getFarmerSchedules()

.subscribe(res=>{

this.schedules=[...res];
this.cdr.detectChanges();

});

}

loadNotifications(){

this.dashboardService

.getFarmerNotifications()

.subscribe(res=>{

this.notifications=res;

});

}
}
