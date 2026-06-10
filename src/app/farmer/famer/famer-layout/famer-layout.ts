import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-famer-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './famer-layout.html',
  styleUrl: './famer-layout.css',
})
export class FamerLayout implements AfterViewInit {
  constructor(private router: Router) {
    // 🔥 Re-render lucide icons after route change
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => setTimeout(() => (window as any).lucide?.createIcons(), 0));
  }

  sidebarOpen = false;

  // Dropdown states
  notifOpen = false;
  profileOpen = false;

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
    this.closeDropdowns();
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }

  toggleNotif(e: MouseEvent): void {
    e.stopPropagation();
    this.notifOpen = !this.notifOpen;
    if (this.notifOpen) this.profileOpen = false;
  }

  toggleProfile(e: MouseEvent): void {
    e.stopPropagation();
    this.profileOpen = !this.profileOpen;
    if (this.profileOpen) this.notifOpen = false;
  }

  // click inside menu should not close
  stop(e: MouseEvent): void {
    e.stopPropagation();
  }

  // close when click outside
  @HostListener('document:click')
  onDocClick(): void {
    this.closeDropdowns();
  }

  closeDropdowns(): void {
    this.notifOpen = false;
    this.profileOpen = false;
  }

  logout(): void {
    this.router.navigate(['/home']);
  }

  ngAfterViewInit(): void {
    setTimeout(() => (window as any).lucide?.createIcons(), 0);
  }
}
