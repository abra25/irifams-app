import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { DashboardService }
from '../../services/dashboard.service';

import {
  Chart,
  DoughnutController,
  ArcElement,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

Chart.register(
  DoughnutController,
  ArcElement,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard
implements OnInit, AfterViewInit {

  constructor(
    private dashboardService:DashboardService,
    private cdr: ChangeDetectorRef
  ){}

  dashboardStats:any;

  chartData:any;

  stats:any[]=[];

  activities:any[]=[];

  notifications:string[]=[];

  recentUsers:any[]=[];

  ngOnInit(): void {

    this.loadStats();

    this.loadChartData();

  }

  ngAfterViewInit(){}

  loadStats(){

    this.dashboardService
        .getStats()

        .subscribe({

          next:(res)=>{

            this.dashboardStats = res;
            

            this.stats = [

              {
                title:'Farmers',
                value:res.totalFarmers,
                icon:'fas fa-users',
                growth:'+12%'
              },

              {
                title:'Farm Plots',
                value:res.totalPlots,
                icon:'fas fa-map-marked-alt',
                growth:'+8%'
              },

              {
                title:'Requests',
                value:res.totalRequests,
                icon:'fas fa-clipboard-list',
                growth:'+15%'
              },

              {
                title:'Revenue',

                value:
                'TZS ' +
                Number(
                  res.totalRevenue || 0
                ).toLocaleString(),

                icon:
                'fas fa-money-bill-wave',

                growth:'+18%'
              }

            ];

          
            this.cdr.detectChanges();

          }

        });

  }

  loadChartData(){

    this.dashboardService
        .getCharts()

        .subscribe({

          next:(res)=>{

            this.chartData = res;

            this.renderCharts();

          }

        });

  }

  renderCharts(){

    new Chart('requestChart', {

      type:'line',

      data:{

        labels:[
          'Tractor Service',
          'Harvesting Service'
        ],

        datasets:[{

          label:'Requests',

          data:[

            this.chartData
            .tractorRequests,

            this.chartData
            .harvestingRequests

          ],

          borderColor:'#16a34a',

          backgroundColor:
          'rgba(22,163,74,.15)',

          fill:true,

          tension:.4

        }]

      },

      options:{
        responsive:true,
        maintainAspectRatio:false
      }

    });


    new Chart('paymentChart', {

      type:'doughnut',

      data:{

        labels:[
          'Paid',
          'Pending'
        ],

        datasets:[{

          data:[

            this.chartData
            .paidPayments,

            this.chartData
            .pendingPayments

          ],

          backgroundColor:[

            '#16a34a',

            '#f59e0b'

          ]

        }]

      },

      options:{
        responsive:true,
        maintainAspectRatio:false
      }

    });

  }

}