import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

declare const lucide: any;

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements AfterViewInit {
  sidebarItems = [
    { label: 'Dashboard', icon: 'layout-dashboard', route: '/admin-dashboard', active: true },
    { label: 'Users', icon: 'user-cog', route: '/users', active: false },
    { label: 'Farm Plots', icon: 'map', route: '/farm-plots', active: false },
    { label: 'Service Requests', icon: 'clipboard-list', route: '/service-requests', active: false },
    { label: 'Input Management', icon: 'package', route: '/input-management', active: false },
    { label: 'Payments', icon: 'wallet', route: '/payments', active: false },
    { label: 'Reports', icon: 'bar-chart-3', route: '/reports', active: false },
    { label: 'Logout', icon: 'log-out', route: '/login', active: false }
  ];

  stats = [
    {
      title: 'Total Farmers',
      value: '1,250',
      icon: 'users',
      theme: 'green'
    },
    {
      title: 'Tractor Requests',
      value: '320',
      icon: 'tractor',
      theme: 'blue'
    },
    {
      title: 'Harvest Requests',
      value: '540',
      icon: 'cloud-sun',
      theme: 'orange'
    },
    {
      title: 'Inputs Distributed',
      value: '870',
      icon: 'package',
      theme: 'olive'
    }
  ];

  recentRequests = [
    {
      id: 'REQ1001',
      farmer: 'John Mushi',
      serviceType: 'Tractor Ploughing',
      date: '15 May 2024',
      status: 'Approved'
    },
    {
      id: 'REQ1002',
      farmer: 'Anna Komba',
      serviceType: 'Harvesting',
      date: '15 May 2024',
      status: 'Pending'
    },
    {
      id: 'REQ1003',
      farmer: 'Peter John',
      serviceType: 'Tractor Ploughing',
      date: '14 May 2024',
      status: 'Completed'
    }
  ];

  quickActions = [
    { label: 'Add Farmer', icon: 'user-plus' },
    { label: 'Add Service Request', icon: 'plus-square' },
    { label: 'Record Payment', icon: 'badge-dollar-sign' },
    { label: 'Generate Report', icon: 'file-text' }
  ];

  lineChartPoints = [
    { day: 'Mon', tractor: 35, harvest: 22 },
    { day: 'Tue', tractor: 45, harvest: 28 },
    { day: 'Wed', tractor: 26, harvest: 25 },
    { day: 'Thu', tractor: 48, harvest: 29 },
    { day: 'Fri', tractor: 32, harvest: 41 },
    { day: 'Sat', tractor: 44, harvest: 36 },
    { day: 'Sun', tractor: 30, harvest: 50 }
  ];

  get tractorPolyline(): string {
    return this.buildPolyline(this.lineChartPoints.map(item => item.tractor), 220, 110, 10);
  }

  get harvestPolyline(): string {
    return this.buildPolyline(this.lineChartPoints.map(item => item.harvest), 220, 110, 10);
  }

  buildPolyline(values: number[], width: number, height: number, padding: number): string {
    const max = Math.max(...values);
    const min = Math.min(...values);
    const usableWidth = width - padding * 2;
    const usableHeight = height - padding * 2;

    return values
      .map((value, index) => {
        const x = padding + (index * usableWidth) / (values.length - 1);
        const y =
          padding +
          usableHeight -
          ((value - min) / ((max - min) || 1)) * usableHeight;
        return `${x},${y}`;
      })
      .join(' ');
  }

  getStatusClass(status: string): string {
    const normalized = status.toLowerCase();
    if (normalized === 'approved') return 'approved';
    if (normalized === 'pending') return 'pending';
    if (normalized === 'completed') return 'completed';
    return 'default';
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }, 0);
  }
}