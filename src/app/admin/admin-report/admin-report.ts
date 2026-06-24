import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
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
export class AdminReports implements AfterViewInit {

  summary = [
    {
      title:'Total Farmers',
      value:'1,245',
      icon:'fas fa-users'
    },

    {
      title:'Farm Plots',
      value:'865',
      icon:'fas fa-map'
    },

    {
      title:'Revenue',
      value:'TZS 56M',
      icon:'fas fa-coins'
    },

    {
      title:'Requests',
      value:'458',
      icon:'fas fa-clipboard-list'
    }
  ];

  ngAfterViewInit(): void {

    this.loadCharts();

  }

  loadCharts() {

  // SERVICE PIE CHART

  new Chart('serviceChart', {

    type: 'pie',

    data: {

      labels: [
        'Tractor',
        'Harvesting'
      ],

      datasets: [{
        data: [65, 35],

        backgroundColor: [
          '#16a34a',
          '#2563eb'
        ],

        borderColor: [
          '#ffffff',
          '#ffffff'
        ],

        borderWidth: 3
      }]
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }

  });



  // PAYMENT DOUGHNUT

  new Chart('paymentChart', {

    type: 'doughnut',

    data: {

      labels: [
        'Paid',
        'Pending',
        'Rejected'
      ],

      datasets: [{
        data: [70, 20, 10],

        backgroundColor: [
          '#22c55e',
          '#f59e0b',
          '#ef4444'
        ],

        borderColor: [
          '#ffffff',
          '#ffffff',
          '#ffffff'
        ],

        borderWidth: 3
      }]
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }

  });



  // REVENUE BAR CHART

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

        label: 'Revenue (TZS)',

        data: [
          3000000,
          5000000,
          6000000,
          8000000,
          9000000,
          11000000
        ],

        backgroundColor: [
          '#16a34a',
          '#2563eb',
          '#f59e0b',
          '#7c3aed',
          '#ec4899',
          '#06b6d4'
        ],

        borderRadius: 10

      }]

    },

    options: {

      responsive: true,
      maintainAspectRatio: false,

      plugins: {

        legend: {
          display: false
        }

      },

      scales: {

        y: {

          beginAtZero: true,

          ticks: {

            callback: function(value: any) {
              return (value / 1000000) + 'M';
            }

          }

        }

      }

    }

  });

}

  generateReport(type:string){

    alert(type + ' report generated successfully');

  }

}