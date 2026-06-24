import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-s-notification',
  imports: [CommonModule],
  templateUrl: './s-notification.html',
  styleUrl: './s-notification.css',
})
export class SNotification {


  notifications = [

    {
      id: 1,
      title: 'New Service Request',
      message: 'Ali Hassan submitted a Tractor Service request.',
      time: '5 minutes ago',
      icon: 'fas fa-tractor',
      color: 'service',
      read: false
    },

    {
      id: 2,
      title: 'Payment Waiting Verification',
      message: 'Payment CN-2026-001 requires verification.',
      time: '30 minutes ago',
      icon: 'fas fa-money-check-alt',
      color: 'payment',
      read: false
    },

    {
      id: 3,
      title: 'Water Schedule Updated',
      message: 'Water schedule for Cheju Block A has been updated.',
      time: '2 hours ago',
      icon: 'fas fa-tint',
      color: 'water',
      read: true
    },

    {
      id: 4,
      title: 'Inputs Distributed',
      message: '50 Kg of SARO 5 Seeds distributed successfully.',
      time: 'Yesterday',
      icon: 'fas fa-seedling',
      color: 'input',
      read: true
    }

  ];

  markAsRead(notification: any) {
    notification.read = true;
  }

  markAllAsRead() {
    this.notifications.forEach(
      n => n.read = true
    );
  }

  get unreadCount(): number {
    return this.notifications.filter(
      n => !n.read
    ).length;
  }

}
