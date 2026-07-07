import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

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
export class FLayout implements OnInit {
  sidebarOpen = false;

collapsed = false;

user:any = {};
  
  constructor(

private authService:AuthService,

private router:Router,

private userService:UserService,

private cdr:ChangeDetectorRef

){}

ngOnInit(){

  this.authService.startAutoLogout();
  this.loadProfile();

}

  menuItems = [

    {
      label: 'Dashboard',
      icon: 'fas fa-chart-pie',
      route: '/farmer/dashboard'
    },

    {
      label: 'My Plots',
      icon: 'fas fa-map-marked-alt',
      route: '/farmer/plots'
    },

    {
      label: 'Requests',
      icon: 'fas fa-tractor',
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
    },
    
  ];


logout() {

  this.authService.logout();

}

loadProfile(){

this.userService

.getMyProfile()

.subscribe({

next:(res)=>{

this.user = res;

this.cdr.detectChanges();

}

});

}

toggleSidebar(){

this.collapsed = !this.collapsed;

}

goProfile(){

this.router.navigate(

['/farmer/profile']

);

}

}