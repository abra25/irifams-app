import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { DashboardService }
from '../../services/dashboard.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-s-dshboard',
  standalone:true,
  imports:[CommonModule],
  templateUrl:'./s-dshboard.html',
  styleUrl:'./s-dshboard.css'
})
export class SDshboard implements OnInit{

  constructor(

    private dashboardService:
    DashboardService,

    private cdr:ChangeDetectorRef

  ){}

  stats:any[]=[];

  recentRequests:any[]=[];

  payments:any[]=[];

  notifications:any[]=[];

  ngOnInit(): void {

    this.loadStats();

    this.loadRequests();

    this.loadPayments();

    this.loadNotifications();

  }

  loadStats(){

    this.dashboardService
        .getSupervisorStats()
        .subscribe({

          next:(res)=>{

            this.stats=[

              {
                title:'Total Farmers',
                value:res.totalFarmers,
                icon:'fas fa-users'
              },

              {
                title:'Farm Plots',
                value:res.totalPlots,
                icon:'fas fa-map-marked-alt'
              },

              {
                title:'Pending Requests',
                value:res.pendingRequests,
                icon:'fas fa-clipboard-list'
              },

              {
                title:'Waiting Payments',
                value:res.totalPayments,
                icon:'fas fa-money-bill-wave'
              }

            ];

            this.cdr.detectChanges();

          }

        });

  }

  loadRequests(){

    this.dashboardService
        .getSupervisorRequests()
        .subscribe({

          next:(res)=>{

            this.recentRequests = [...res];

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

  loadPayments(){

    this.dashboardService
        .getSupervisorPayments()
        .subscribe({

          next:(res)=>{

            this.payments=[...res];

            this.cdr.detectChanges();

          }

        });

  }

  loadNotifications(){

    this.dashboardService
        .getSupervisorNotifications()
        .subscribe({

          next:(res)=>{

            this.notifications=[...res];

            this.cdr.detectChanges();

          }

        });

  }

}