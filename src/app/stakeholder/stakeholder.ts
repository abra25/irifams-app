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
  selector: 'app-stakeholder',
  imports: [CommonModule],
  templateUrl: './stakeholder.html',
  styleUrl: './stakeholder.css'
})
export class Stakeholder implements AfterViewInit {

  stats = [
    {
      title: 'Registered Farmers',
      value: '1,250',
      icon: 'fas fa-users'
    },

    {
      title: 'Farm Plots',
      value: '860',
      icon: 'fas fa-map-marked-alt'
    },

    {
      title: 'Service Requests',
      value: '540',
      icon: 'fas fa-clipboard-list'
    },

    {
      title: 'Revenue Collected',
      value: 'TZS 58M',
      icon: 'fas fa-coins'
    }
  ];

  reports = [
    'Farmers Report',
    'Farm Plots Report',
    'Service Requests Report',
    'Payments Report',
    'Inputs Distribution Report',
    'Water Distribution Report'
  ];

  activities = [

    {
      text:'120 farmers registered this month',
      time:'Today'
    },

    {
      text:'Harvesting services increased by 20%',
      time:'Yesterday'
    },

    {
      text:'Block A received seeds distribution',
      time:'2 days ago'
    }

  ];

  notifications = [

    'Low seed stock in Block B',
    'Revenue target achieved for June',
    'Water shortage reported in Block C'

  ];

  ngAfterViewInit(): void {

    this.loadCharts();

  }

  loadCharts() {

    new Chart('farmerChart', {

      type: 'bar',

      data: {

        labels: [
          'Block A',
          'Block B',
          'Block C',
          'Block D'
        ],

        datasets: [{

          label: 'Farmers',

          data: [250, 320, 180, 420],

          backgroundColor: [
            '#16a34a',
            '#2563eb',
            '#f59e0b',
            '#7c3aed'
          ],

          borderRadius: 8

        }]
      },

      options: {
        responsive: true,
        maintainAspectRatio: false
      }

    });



    new Chart('paymentChart', {

      type: 'doughnut',

      data: {

        labels: ['Paid', 'Pending', 'Rejected'],

        datasets: [{

          data: [70,20,10],

          backgroundColor: [
            '#22c55e',
            '#f59e0b',
            '#ef4444'
          ]

        }]
      },

      options: {
        responsive: true,
        maintainAspectRatio: false
      }

    });

  }

}