import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
export class AdminLayout implements OnInit{
  currentUser:any;

notificationCount = 0;

darkMode = false;

  sidebarCollapsed = false;

  mobileMenuOpen = false;


  today = new Date();


  
constructor(
  private authService: AuthService, private router:Router
){}

ngOnInit(){

  this.authService.startAutoLogout();

  this.currentUser =
    this.authService.getUser();

}

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
      label: 'Activity Logs',
      icon: 'fas fa-history',
      route: '/admin/logs'
    },

    {
      label:'Logout',
      icon:'fas fa-sign-out-alt',
      route:'logout'
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

toggleTheme(){

  this.darkMode = !this.darkMode;

  document.body.classList.toggle(
    'dark-theme'
  );

}

  logout() {

  this.authService.logout();

}

closeMobileMenu(){

  if(window.innerWidth <= 992){

    this.mobileMenuOpen = false;

  }

}

}
