import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit
} from '@angular/core';

import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';

import { AuthService }
from '../../services/auth.service';

import { NotificationService }
from '../../services/notification.service';

@Component({
  selector: 'app-s-layout',
  standalone:true,

  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],

  templateUrl: './s-layout.html',
  styleUrl: './s-layout.css',
})
export class SLayout implements OnInit {

  constructor(

    private authService:AuthService,

    private notificationService:
    NotificationService,

    private router:Router

  ){}

  sidebarOpen = false;

  user:any;

  unreadCount = 0;

  ngOnInit(): void {

    this.authService.startAutoLogout();

    this.user =
      this.authService.getUser();

    this.loadUnreadCount();

  }

  loadUnreadCount(){

    if(!this.user) return;

    this.notificationService
    .getUnreadCount()

        .subscribe({

          next:(res)=>{

            this.unreadCount = res;

          },

          error:(err)=>{

            console.log(err);

          }

        });

  }

  menuItems = [

    {
      label:'Dashboard',
      icon:'fas fa-chart-line',
      route:'/supervisor/dashboard'
    },

    {
      label:'Farmers',
      icon:'fas fa-users',
      route:'/supervisor/farmers'
    },

    {
      label:'Farm Plots',
      icon:'fas fa-map-marked-alt',
      route:'/supervisor/farm-plots'
    },

    {
      label:'Service Requests',
      icon:'fas fa-clipboard-list',
      route:'/supervisor/requests'
    },

    {
      label:'Water Schedules',
      icon:'fas fa-tint',
      route:'/supervisor/schedules'
    },

    {
      label:'Inputs',
      icon:'fas fa-seedling',
      route:'/supervisor/inputs'
    },

    {
      label:'Payments',
      icon:'fas fa-money-bill-wave',
      route:'/supervisor/payments'
    },

    {
      label:'Reports',
      icon:'fas fa-chart-bar',
      route:'/supervisor/reports'
    },

    {
      label:'Notifications',
      icon:'fas fa-bell',
      route:'/supervisor/notifications'
    },

  

    {
    label:'Logout',
    icon:'fas fa-sign-out-alt',
    route:'logout'
  }

  ];

  logout(){

    this.authService.logout();

  }

}