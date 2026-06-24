import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  stats = [
    {
      title: 'My Plots',
      value: 4,
      icon: 'fas fa-map-marked-alt'
    },

    {
      title: 'Pending Requests',
      value: 3,
      icon: 'fas fa-clock'
    },

    {
      title: 'Completed Services',
      value: 12,
      icon: 'fas fa-check-circle'
    },

    {
      title: 'Outstanding Payments',
      value: 'TZS 80,000',
      icon: 'fas fa-money-bill-wave'
    }
  ];

  requests = [

    {
      id: 'REQ-001',
      service: 'Tractor Service',
      plot: 'PLT-001',
      date: '12 Jun 2026',
      status: 'Pending'
    },

    {
      id: 'REQ-002',
      service: 'Harvesting',
      plot: 'PLT-003',
      date: '08 Jun 2026',
      status: 'Approved'
    },

    {
      id: 'REQ-003',
      service: 'Tractor Service',
      plot: 'PLT-002',
      date: '03 Jun 2026',
      status: 'Completed'
    }

  ];

  schedules = [

    {
      block: 'Cheju Block A',
      day: 'Monday',
      start: '06:00 AM',
      end: '10:00 AM'
    },

    {
      block: 'Cheju Block A',
      day: 'Thursday',
      start: '02:00 PM',
      end: '06:00 PM'
    }

  ];

  notifications = [

    'Your tractor request REQ-002 has been approved.',

    'Water schedule for Block A has been updated.',

    'Control Number CN-2026-001 has been generated.'

  ];

}
