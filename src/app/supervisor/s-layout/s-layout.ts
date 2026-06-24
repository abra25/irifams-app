import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-s-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './s-layout.html',
  styleUrl: './s-layout.css',
})
export class SLayout {

  

  sidebarOpen = false;

  menuItems = [

    {
      label: 'Dashboard',
      icon: 'fas fa-chart-line',
      route: '/supervisor/dashboard'
    },

    {
      label: 'Farmers',
      icon: 'fas fa-users',
      route: '/supervisor/farmers'
    },

    {
      label: 'Farm Plots',
      icon: 'fas fa-map-marked-alt',
      route: '/supervisor/farm-plots'
    },

    {
      label: 'Service Requests',
      icon: 'fas fa-clipboard-list',
      route: '/supervisor/requests'
    },

    {
      label: 'Water Schedules',
      icon: 'fas fa-tint',
      route: '/supervisor/schedules'
    },

    {
      label: 'Inputs',
      icon: 'fas fa-seedling',
      route: '/supervisor/inputs'
    },

    {
      label: 'Payments',
      icon: 'fas fa-money-bill-wave',
      route: '/supervisor/payments'
    },

    {
      label: 'Reports',
      icon: 'fas fa-chart-bar',
      route: '/supervisor/reports'
    },

    {
      label: 'Notifications',
      icon: 'fas fa-bell',
      route: '/supervisor/notifications'
    }

  ];

}