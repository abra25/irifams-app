import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-f-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './f-layout.html',
  styleUrl: './f-layout.css',
})
export class FLayout {
  sidebarOpen = false;

  menuItems = [

    {
      label: 'Dashboard',
      icon: 'fas fa-chart-pie',
      route: '/farmer/dashboard'
    },

    {
      label: 'My Profile',
      icon: 'fas fa-user',
      route: '/farmer/profile'
    },

    {
      label: 'My Plots',
      icon: 'fas fa-map-marked-alt',
      route: '/farmer/plots'
    },

    {
      label: 'Request Services',
      icon: 'fas fa-tractor',
      route: '/farmer/request-service'
    },

    {
      label: 'My Requests',
      icon: 'fas fa-clipboard-list',
      route: '/farmer/requests'
    },

    {
      label: 'Payments',
      icon: 'fas fa-money-bill-wave',
      route: '/farmer/payments'
    },

    {
      label: 'Water Schedules',
      icon: 'fas fa-tint',
      route: '/farmer/water-schedules'
    },

    {
      label: 'Notifications',
      icon: 'fas fa-bell',
      route: '/farmer/notifications'
    }
  ];

}