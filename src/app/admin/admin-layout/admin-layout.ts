import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [
    CommonModule,
    RouterModule,
    DatePipe
  ],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css'
})
export class AdminLayout {

  sidebarCollapsed = false;

  mobileMenuOpen = false;

  today = new Date();

  menuItems = [

    {
      label:'Dashboard',
      icon:'fas fa-chart-line',
      route:'/admin/dashboard'
    },

    {
      label:'Users',
      icon:'fas fa-users-cog',
      route:'/admin/users'
    },

    {
      label:'Farm Plots',
      icon:'fas fa-map-marked-alt',
      route:'/admin/plots'
    },

    {
      label:'Requests',
      icon:'fas fa-clipboard-list',
      route:'/admin/requests'
    },

    {
      label:'Inputs',
      icon:'fas fa-seedling',
      route:'/admin/inputs'
    },

    {
      label:'Payments',
      icon:'fas fa-money-check-alt',
      route:'/admin/payments'
    },

    {
      label:'Reports',
      icon:'fas fa-chart-pie',
      route:'/admin/reports'
    },

    {
      label:'Notifications',
      icon:'fas fa-bell',
      route:'/admin/notifications'
    },

    {
      label: 'Activity Logs',
      icon: 'fas fa-history',
      route: '/admin/logs'
    },

    {
      label:'Logout',
      icon:'fas fa-sign-out-alt',
      route:'/login'
    }

  ];

  toggleSidebar(){

  if(window.innerWidth <= 992){

    this.mobileMenuOpen =
      !this.mobileMenuOpen;

  }else{

    this.sidebarCollapsed =
      !this.sidebarCollapsed;

  }

}

}
