import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-notifications',
  imports: [CommonModule],
  templateUrl: './admin-notifications.html',
  styleUrl: './admin-notifications.css'
})
export class AdminNotifications {

  notifications = [

    {
      id: 1,
      title: 'New Farmer Registered',
      message: 'Farmer Ali Hassan registered successfully.',
      type: 'success',
      date: '2 mins ago',
      read: false
    },

    {
      id: 2,
      title: 'Payment Waiting Verification',
      message: 'Payment CN-2026-001 requires verification.',
      type: 'warning',
      date: '10 mins ago',
      read: false
    },

    {
      id: 3,
      title: 'Low Input Stock',
      message: 'SARO 5 seed stock is running low.',
      type: 'danger',
      date: '1 hour ago',
      read: true
    },

    {
      id: 4,
      title: 'New Service Request',
      message: 'Farmer Fatma Omar submitted harvesting request.',
      type: 'info',
      date: 'Today',
      read: true
    }

  ];

  markAsRead(notification: any) {

    notification.read = true;

  }

  deleteNotification(notification: any) {

    this.notifications =
      this.notifications.filter(
        n => n.id !== notification.id
      );

  }

  get unreadCount(): number {

    return this.notifications.filter(
      n => !n.read
    ).length;

  }

}