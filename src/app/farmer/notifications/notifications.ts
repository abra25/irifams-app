import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  imports: [CommonModule],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css',
})
export class Notifications {
  

  notifications = [

    {
      id: 1,
      title: 'Request Approved',
      message:
        'Your tractor service request REQ-002 has been approved.',
      date: '22 Jun 2026',
      type: 'success',
      read: false
    },

    {
      id: 2,
      title: 'Control Number Generated',
      message:
        'Control Number CN-2026-002 has been generated for payment.',
      date: '21 Jun 2026',
      type: 'info',
      read: false
    },

    {
      id: 3,
      title: 'Water Schedule Updated',
      message:
        'Water schedule for Cheju Block A has been updated.',
      date: '20 Jun 2026',
      type: 'warning',
      read: true
    },

    {
      id: 4,
      title: 'Payment Verified',
      message:
        'Your payment has been verified successfully.',
      date: '18 Jun 2026',
      type: 'success',
      read: true
    }

  ];

  markAsRead(notification: any) {
    notification.read = true;
  }

  markAllAsRead() {
    this.notifications.forEach(n => n.read = true);
  }

  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }


}