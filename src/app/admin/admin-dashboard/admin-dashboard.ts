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
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements AfterViewInit {

  stats = [
    {
      title: 'Farmers',
      value: '1,250',
      icon: 'fas fa-users',
      growth: '+12%'
    },

    {
      title: 'Farm Plots',
      value: '842',
      icon: 'fas fa-map-marked-alt',
      growth: '+8%'
    },

    {
      title: 'Requests',
      value: '356',
      icon: 'fas fa-clipboard-list',
      growth: '+15%'
    },

    {
      title: 'Revenue',
      value: 'TZS 12.4M',
      icon: 'fas fa-money-bill-wave',
      growth: '+18%'
    }
  ];

  activities = [

    {
      icon:'fas fa-user-plus',
      text:'New farmer registered',
      time:'5 min ago'
    },

    {
      icon:'fas fa-check-circle',
      text:'Payment verified',
      time:'25 min ago'
    },

    {
      icon:'fas fa-tractor',
      text:'Service approved',
      time:'1 hour ago'
    }

  ];

  notifications = [

    '12 payments waiting verification',
    '5 new service requests',
    'Water schedule updated'

  ];

  recentUsers = [

    {
      name:'Ali Hassan',
      role:'Farmer',
      status:'Active'
    },

    {
      name:'Fatma Omar',
      role:'Supervisor',
      status:'Active'
    },

    {
      name:'Ahmed Suleiman',
      role:'Farmer',
      status:'Inactive'
    }

  ];

  ngAfterViewInit(): void {

    new Chart('requestChart', {

      type:'line',

      data: {

        labels:[
          'Jan','Feb','Mar',
          'Apr','May','Jun'
        ],

        datasets:[{

          label:'Requests',

          data:[45,60,75,55,82,96],

          borderColor:'#16a34a',

          backgroundColor:'rgba(22,163,74,.15)',

          fill:true,

          tension:.4

        }]

      }

    });

    new Chart('paymentChart', {

      type:'doughnut',

      data: {

        labels:[
          'Paid',
          'Pending',
          'Rejected'
        ],

        datasets:[{

          data:[65,25,10],

          backgroundColor:[
            '#16a34a',
            '#f59e0b',
            '#ef4444'
          ]

        }]

      }

    });

  }

}