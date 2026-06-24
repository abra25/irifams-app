import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-logs',
  imports: [CommonModule],
  templateUrl: './admin-logs.html',
  styleUrl: './admin-logs.css'
})
export class AdminLogs {

  logs = [

    {
      action:'Farmer Registration',
      user:'Ali Hassan',
      role:'Farmer',
      date:'2026-06-23 09:00 AM',
      status:'Success'
    },

    {
      action:'Payment Verification',
      user:'Admin',
      role:'Admin',
      date:'2026-06-23 10:20 AM',
      status:'Success'
    },

    {
      action:'Service Request Approval',
      user:'Supervisor A',
      role:'Supervisor',
      date:'2026-06-23 11:00 AM',
      status:'Success'
    },

    {
      action:'Login Attempt',
      user:'Unknown User',
      role:'Guest',
      date:'2026-06-23 11:30 AM',
      status:'Failed'
    }

  ];

}