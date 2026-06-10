import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-famer-dashboard',
  imports: [],
  templateUrl: './famer-dashboard.html',
  styleUrl: './famer-dashboard.css',
})
export class FamerDashboard implements AfterViewInit {
  ngAfterViewInit(): void {
    setTimeout(() => (window as any).lucide?.createIcons(), 0);
  }
}
