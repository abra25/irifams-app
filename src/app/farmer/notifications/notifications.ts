import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import Swal from 'sweetalert2';

import { NotificationService }
from '../../services/notification.service';

@Component({
  selector:'app-notifications',
  imports:[CommonModule],
  templateUrl:'./notifications.html',
  styleUrl:'./notifications.css'
})
export class Notifications implements OnInit{

  notifications:any[]=[];

  unreadCount=0;

  constructor(

    private notificationService:NotificationService,

    private cdr:ChangeDetectorRef

  ){}

  ngOnInit(){

    this.loadNotifications();

    this.loadUnreadCount();

  }

  loadNotifications(){

  this.notificationService

      .getMyNotifications()

      .subscribe({

        next:(res)=>{

          this.notifications = res.map((n:any)=>({

            ...n,

            title: this.getTitle(n.message),

            type: this.getType(n.message)

          }));

          this.cdr.detectChanges();

        },

        error:()=>{

          Swal.fire(
            'Error',
            'Failed to load notifications',
            'error'
          );

        }

      });

}
  loadUnreadCount(){

    this.notificationService

        .getUnreadCount()

        .subscribe({

          next:(count)=>{

            this.unreadCount=count;

          }

        });

  }

  markAsRead(notification:any){

    this.notificationService

        .markAsRead(notification.id)

        .subscribe({

          next:()=>{

            notification.read = true;

            this.loadUnreadCount();

          }

        });

  }

  markAllAsRead(){

    const unread = this.notifications.filter(
  n => !n.read
    );

    unread.forEach(n=>{

      this.notificationService

          .markAsRead(n.id)

          .subscribe();

      n.read = true;

    });

    this.loadUnreadCount();

  }

  getTitle(message:string):string{

  const msg = message.toLowerCase();

  if(msg.includes('approved'))
    return 'Request Approved';

  if(msg.includes('submitted'))
    return 'Request Submitted';

  if(msg.includes('control number'))
    return 'Control Number';

  if(msg.includes('payment'))
    return 'Payment';

  if(msg.includes('irrigation'))
    return 'Water Schedule';

  if(msg.includes('schedule'))
    return 'Water Schedule';

  if(msg.includes('started'))
    return 'Irrigation Started';

  if(msg.includes('completed'))
    return 'Irrigation Completed';

  if(msg.includes('reminder'))
    return 'Reminder';

  return 'System Notification';

}

getType(message:string):string{

  const msg = message.toLowerCase();

  if(msg.includes('approved'))
    return 'success';

  if(msg.includes('payment'))
    return 'success';

  if(msg.includes('control'))
    return 'info';

  if(msg.includes('schedule'))
    return 'warning';

  if(msg.includes('reminder'))
    return 'warning';

  return 'info';

}

}