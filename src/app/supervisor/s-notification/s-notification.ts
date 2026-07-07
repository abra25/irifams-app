import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import Swal from 'sweetalert2';

import { NotificationService }
from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-s-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './s-notification.html',
  styleUrl: './s-notification.css'
})
export class SNotification implements OnInit {

  constructor(

  private notificationService:
  NotificationService,

  private authService:
  AuthService,

  private cdr: ChangeDetectorRef

){}

  notifications:any[] = [];

  userId!:number;

  ngOnInit(): void {

  const user =
    this.authService.getUser();

  this.userId = user.id;

  this.loadNotifications();



  }

  loadNotifications(){

    this.notificationService

    .getMyNotifications()

        .subscribe({

          next:(res)=>{

            this.notifications = res.map(n => ({

              ...n,

              title: this.getTitle(n.message),

              icon: this.getIcon(n.message),

              color: this.getColor(n.message)

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

  markAsRead(notification:any){

    this.notificationService

        .markAsRead(notification.id)

        .subscribe({

          next:()=>{

            notification.isRead = true;

          },

          error:()=>{

            Swal.fire(
              'Error',
              'Failed to update notification',
              'error'
            );

          }

        });

  }

  markAllAsRead(){

    this.notifications

        .filter(n => !n.isRead)

        .forEach(n => {

          this.notificationService

              .markAsRead(n.id)

              .subscribe();

          n.isRead = true;

        });

  }

 get unreadCount(){

    return this.notifications.filter(

      n => !n.isRead

    ).length;

}

  getTitle(message:string):string{

    if(message.includes('request'))
      return 'Service Request';

    if(message.includes('payment'))
      return 'Payment Update';

    if(message.includes('schedule'))
      return 'Water Schedule';

    if(message.includes('input'))
      return 'Farm Input';

    return 'System Notification';

  }

  getIcon(message:string):string{

    if(message.includes('request'))
      return 'fas fa-clipboard-list';

    if(message.includes('payment'))
      return 'fas fa-money-check-alt';

    if(message.includes('schedule'))
      return 'fas fa-tint';

    if(message.includes('input'))
      return 'fas fa-seedling';

    return 'fas fa-bell';

  }

  getColor(message:string):string{

    if(message.includes('request'))
      return 'service';

    if(message.includes('payment'))
      return 'payment';

    if(message.includes('schedule'))
      return 'water';

    if(message.includes('input'))
      return 'input';

    return 'system';

  }

}