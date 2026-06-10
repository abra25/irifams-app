import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-officer-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './officer-layout.html',
  styleUrl: './officer-layout.css',
})
export class OfficerLayout {
  sidebarOpen = false;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }

  logout() {
    // UI only
    this.router.navigateByUrl('/login');
  }

}
