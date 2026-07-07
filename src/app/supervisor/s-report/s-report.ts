import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnInit
} from '@angular/core';

import { ReportService }
from '../../services/report.service';

import Swal from 'sweetalert2';

import {
  Chart,
  DoughnutController,
  ArcElement,
  BarController,
  BarElement,
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
  BarController,
  BarElement,
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
  selector: 'app-s-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './s-report.html',
  styleUrl: './s-report.css'
})
export class SReports
implements OnInit, AfterViewInit {

  constructor(
    private reportService: ReportService
  ){}

  stats:any[] = [];

  reports = [

    'Farmers Report',

    'Plots Report',

    'Service Requests Report',

    'Payments Report',

    'Inputs Distribution Report',

    'Water Schedule Report'

  ];

  ngOnInit(): void {

    this.loadSummary();

  }

  ngAfterViewInit(): void {

    setTimeout(()=>{

      this.loadCharts();

    },500);

  }

  loadSummary(){

    this.reportService

        .getSummary()

        .subscribe({

          next:(res)=>{

            this.stats = [

              {
                icon:'fas fa-users',
                value:res.totalFarmers,
                title:'Total Farmers'
              },

              {
                icon:'fas fa-map-marked-alt',
                value:res.totalPlots,
                title:'Total Plots'
              },

              {
                icon:'fas fa-clipboard-list',
                value:res.totalRequests,
                title:'Requests'
              },

              {
                icon:'fas fa-money-bill-wave',
                value:'TZS ' +
                (res.totalRevenue || 0),

                title:'Revenue'
              }

            ];

          },

          error:()=>{

            Swal.fire(
              'Error',
              'Failed to load report summary',
              'error'
            );

          }

        });

  }

  exportPdf(){

    this.reportService

        .exportPdf()

        .subscribe({

          next:(blob:any)=>{

            const url =
              window.URL.createObjectURL(blob);

            const a =
              document.createElement('a');

            a.href = url;

            a.download =
              'irifams-report.pdf';

            a.click();

            window.URL.revokeObjectURL(url);

          },

          error:()=>{

            Swal.fire(
              'Error',
              'Failed to export report',
              'error'
            );

          }

        });

  }

  loadCharts(){

    new Chart('serviceChart', {

      type: 'doughnut',

      data: {

        labels: [

          'Approved',

          'Completed',

          'Pending'

        ],

        datasets: [{

          data: [40,30,20],

          backgroundColor: [

            '#16a34a',

            '#2563eb',

            '#f59e0b'

          ]

        }]

      }

    });

    new Chart('revenueChart', {

      type: 'bar',

      data: {

        labels: [

          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun'

        ],

        datasets: [{

          label:'Revenue',

          data:[

            200000,
            300000,
            450000,
            400000,
            650000,
            750000

          ]

        }]

      }

    });

    new Chart('trendChart', {

      type:'line',

      data:{

        labels:[

          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun'

        ],

        datasets:[{

          label:'Requests',

          data:[

            10,
            20,
            35,
            28,
            40,
            55

          ],

          fill:true,

          tension:.4

        }]

      }

    });

  }

}