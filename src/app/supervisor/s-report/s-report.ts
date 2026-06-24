import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
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
  imports: [CommonModule],
  standalone: true,
  templateUrl: './s-report.html',
  styleUrl: './s-report.css',
})

export class SReports implements AfterViewInit {

  stats = [
    {
      icon: 'fas fa-users',
      value: 128,
      title: 'Total Farmers'
    },
    {
      icon: 'fas fa-map-marked-alt',
      value: 245,
      title: 'Total Plots'
    },
    {
      icon: 'fas fa-clipboard-list',
      value: 84,
      title: 'Total Requests'
    },
    {
      icon: 'fas fa-money-bill-wave',
      value: 56,
      title: 'Total Payments'
    }
  ];

  reports = [
    'Farmers Report',
    'Plots Report',
    'Service Requests Report',
    'Payments Report',
    'Inputs Distribution Report'
  ];

  ngAfterViewInit(): void {

    // PIE CHART

    new Chart('serviceChart', {

      type: 'doughnut',

      data: {

        labels: [
          'Tractor',
          'Harvesting',
          'Irrigation'
        ],

        datasets: [{

          data: [45, 30, 25],

          backgroundColor: [
            '#16a34a',
            '#2563eb',
            '#f59e0b'
          ]

        }]

      }

    });


    // BAR CHART

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

          label: 'Revenue',

          data: [
            450000,
            520000,
            610000,
            480000,
            650000,
            720000
          ]

        }]

      }

    });


    // LINE CHART

    new Chart('trendChart', {

      type: 'line',

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

          label: 'Requests',

          data: [
            20,
            40,
            50,
            35,
            60,
            80
          ],

          fill: true,
          tension: .4

        }]

      }

    });

  }

}