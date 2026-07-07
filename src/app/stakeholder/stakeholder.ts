import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  DoughnutController,
  ArcElement,
  PieController,
  Tooltip,
  Legend
} from 'chart.js';

import { AuthService }
from '../services/auth.service';

import { DashboardService }
from '../services/dashboard.service';

import { ReportService }
from '../services/report.service';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  DoughnutController,
  ArcElement,
  PieController,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-stakeholder',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './stakeholder.html',
  styleUrl: './stakeholder.css'
})

export class Stakeholder
implements OnInit, AfterViewInit {

  constructor(

    private authService: AuthService,

    private dashboardService:
    DashboardService,

    private reportService:
    ReportService,
      private userService:
       UserService,

    private cdr: ChangeDetectorRef

  ){}

  stats:any[] = [];

  chartData:any;

  farmerChart:any;

  paymentChart:any;

  reports = [

    'Farmers Report',

    'Farm Plots Report',

    'Service Requests Report',

    'Payments Report',

    'Inputs Distribution Report',

    'Water Distribution Report'

  ];

  activities:any[] = [];

  notifications:any[] = [];

 showProfileMenu = false;

showEditModal = false;

mobileMenuOpen = false;

currentUser:any;

ngOnInit(){

  this.currentUser =
    this.authService.getUser();

  this.authService.startAutoLogout();

  this.loadStats();

  this.loadChartsData();

  this.loadActivities();

  this.loadNotifications();

}

  ngAfterViewInit(): void {}

  /*
   * LOAD DASHBOARD STATS
   */

  loadStats(){

    this.dashboardService

        .getStats()

        .subscribe({

          next:(res)=>{

            this.stats = [

              {

                title:'Registered Farmers',

                value:res.totalFarmers,

                icon:'fas fa-users'

              },

              {

                title:'Farm Plots',

                value:res.totalPlots,

                icon:'fas fa-map-marked-alt'

              },

              {

                title:'Service Requests',

                value:res.totalRequests,

                icon:'fas fa-clipboard-list'

              },

              {

                title:'Revenue Collected',

                value:'TZS ' + (
                  res.totalRevenue || 0
                ),

                icon:'fas fa-coins'

              }

            ];

            this.cdr.detectChanges();

          }

        });

  }

  /*
   * LOAD CHART DATA
   */

  loadChartsData(){

    this.dashboardService

        .getCharts()

        .subscribe({

          next:(res)=>{

            this.chartData = res;

            setTimeout(()=>{

              this.loadCharts();

            },100);

          }

        });

  }

  /*
   * LOAD CHARTS
   */

  loadCharts(){

    if(!this.chartData) return;

    // destroy old charts

    if(this.farmerChart){

      this.farmerChart.destroy();

    }

    if(this.paymentChart){

      this.paymentChart.destroy();

    }

    // REQUEST CHART

    this.farmerChart = new Chart(

      'farmerChart',

      {

        type:'bar',

        data:{

          labels:[

            'Tractor',

            'Harvesting'

          ],

          datasets:[{

            label:'Requests',

            data:[

              this.chartData
              .tractorRequests,

              this.chartData
              .harvestingRequests

            ],

            backgroundColor:[

              '#4CAF50',

              '#2E7D32'

            ],

            borderRadius:8

          }]

        },

        options:{

          responsive:true,

          maintainAspectRatio:false

        }

      }

    );

    // PAYMENT CHART

    this.paymentChart = new Chart(

      'paymentChart',

      {

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

              '#4CAF50',

              '#f59e0b'

            ]

          }]

        },

        options:{

          responsive:true,

          maintainAspectRatio:false

        }

      }

    );

  }

  /*
   * ACTIVITIES
   */

  loadActivities(){

    this.dashboardService

        .getActivities()

        .subscribe({

          next:(res)=>{

            this.activities = res;

            this.cdr.detectChanges();

          }

        });

  }

  /*
   * NOTIFICATIONS
   */

  loadNotifications(){

    this.dashboardService

        .getNotifications()

        .subscribe({

          next:(res)=>{

            this.notifications = res;

            this.cdr.detectChanges();

          }

        });

  }

  /*
   * EXPORT REPORT
   */

  exportReport(){

    this.reportService

        .exportPdf()

        .subscribe(blob => {

          const url =
            window.URL.createObjectURL(blob);

          const a =
            document.createElement('a');

          a.href = url;

          a.download =
            'irifams-report.pdf';

          a.click();

        });

  }

  logout(){

  this.authService.logout();

}

updateProfile(){

  this.userService

      .updateUser(

        this.currentUser.id,

        this.currentUser

      )

      .subscribe({

        next:(res)=>{

          this.currentUser = res;

          sessionStorage.setItem(

            'user',

            JSON.stringify({

              ...JSON.parse(
                sessionStorage.getItem('user')!
              ),

              ...res

            })

          );

          Swal.fire(

            'Success',

            'Profile updated successfully',

            'success'

          );

          this.showEditModal = false;

        },

        error:()=>{

          Swal.fire(

            'Error',

            'Failed to update profile',

            'error'

          );

        }

      });

}

}