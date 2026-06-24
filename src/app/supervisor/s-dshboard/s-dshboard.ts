import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-s-dshboard',
  imports: [CommonModule],
  templateUrl: './s-dshboard.html',
  styleUrl: './s-dshboard.css',
})
export class SDshboard {

  stats = [
    {
      title: 'Total Farmers',
      value: 245,
      icon: 'fas fa-users'
    },

    {
      title: 'Farm Plots',
      value: 320,
      icon: 'fas fa-map-marked-alt'
    },

    {
      title: 'Pending Requests',
      value: 18,
      icon: 'fas fa-clipboard-list'
    },

    {
      title: 'Pending Payments',
      value: 12,
      icon: 'fas fa-money-bill-wave'
    }
  ];


  recentRequests = [

    {
      id: 'REQ-001',
      farmer: 'Ahmed Suleiman',
      service: 'Tractor Service',
      plot: 'PLT-001',
      date: '22 Jun 2026',
      status: 'Pending'
    },

    {
      id: 'REQ-002',
      farmer: 'Ali Hassan',
      service: 'Harvesting Service',
      plot: 'PLT-007',
      date: '21 Jun 2026',
      status: 'Approved'
    },

    {
      id: 'REQ-003',
      farmer: 'Fatma Omar',
      service: 'Tractor Service',
      plot: 'PLT-010',
      date: '20 Jun 2026',
      status: 'Completed'
    }

  ];


  payments = [

    {
      controlNo: 'CN-2026-001',
      farmer: 'Ali Hassan',
      amount: 50000,
      status: 'Waiting Verification'
    },

    {
      controlNo: 'CN-2026-002',
      farmer: 'Ahmed Suleiman',
      amount: 70000,
      status: 'Pending'
    }

  ];


  notifications = [

    'New farmer registered successfully.',

    'Water schedule updated for Block A.',

    '3 payments waiting verification.',

    '5 new service requests submitted.'

  ];

}