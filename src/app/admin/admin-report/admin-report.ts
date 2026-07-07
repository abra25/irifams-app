import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  AfterViewInit,
  Component
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

import Swal from 'sweetalert2';

import { ReportService }
from '../../services/report.service';

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
  selector: 'app-admin-reports',
  imports: [CommonModule],
  templateUrl: './admin-report.html',
  styleUrl: './admin-report.css'
})
export class AdminReports
implements AfterViewInit {

  constructor(
    private reportService: ReportService
  ){}

  summary:any[] = [];

  reportData:any;

  ngAfterViewInit(): void {

    this.loadSummary();

  }

  loadSummary(){

    this.reportService
        .getSummary()

        .subscribe({

          next:(res)=>{

            this.reportData = res;

            this.summary = [

              {
                title:'Total Farmers',
                value:res.totalFarmers,
                icon:'fas fa-users'
              },

              {
                title:'Farm Plots',
                value:res.totalPlots,
                icon:'fas fa-map'
              },

              {
                title:'Revenue',
                value:
                  'TZS ' +
                  (res.totalRevenue || 0)
                    .toLocaleString(),

                icon:'fas fa-coins'
              },

              {
                title:'Requests',
                value:res.totalRequests,
                icon:'fas fa-clipboard-list'
              }

            ];

            this.loadCharts();

          },

          error:()=>{

            Swal.fire(
              'Error',
              'Failed to load reports',
              'error'
            );

          }

        });

  }

  loadCharts() {

    // REQUEST CHART

    new Chart('serviceChart', {

      type:'pie',

      data:{

        labels:[
          'Approved',
          'Completed'
        ],

        datasets:[{

          data:[
            this.reportData.approvedRequests || 0,
            this.reportData.completedRequests || 0
          ],

          backgroundColor:[
            '#16a34a',
            '#2563eb'
          ]

        }]

      },

      options:{
        responsive:true
      }

    });



    // PAYMENT CHART

    new Chart('paymentChart', {

      type:'doughnut',

      data:{

        labels:[
          'Payments'
        ],

        datasets:[{

          data:[
            this.reportData.totalPayments || 0
          ],

          backgroundColor:[
            '#22c55e'
          ]

        }]

      },

      options:{
        responsive:true
      }

    });



    // REVENUE CHART

    new Chart('revenueChart', {

      type:'bar',

      data:{

        labels:[
          'Revenue'
        ],

        datasets:[{

          label:'TZS',

          data:[
            this.reportData.totalRevenue || 0
          ],

          backgroundColor:[
            '#2563eb'
          ],

          borderRadius:10

        }]

      },

      options:{

        responsive:true,

        scales:{

          y:{
            beginAtZero:true
          }

        }

      }

    });

  }

generateReport(type:string){

  this.reportService

      .exportPdf()

      .subscribe(blob=>{

        const url =
          window.URL.createObjectURL(blob);

        const a =
          document.createElement('a');

        a.href = url;

        a.download =
          'IRIFAMS-Report.pdf';

        a.click();

        window.URL.revokeObjectURL(url);

        Swal.fire(
          'Success',
          'Report downloaded successfully',
          'success'
        );

      });

}

}