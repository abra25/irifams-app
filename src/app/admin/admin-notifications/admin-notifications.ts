import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NotificationService }
from '../../services/notification.service';
import { AuthService }
from '../../services/auth.service';

@Component({
  selector: 'app-admin-notifications',
  imports: [CommonModule],
  templateUrl: './admin-notifications.html',
  styleUrl: './admin-notifications.css'
})
export class AdminNotifications
implements OnInit {

  constructor(

    private notificationService:
    NotificationService,

    private authService:
    AuthService,

    private cdr: 
    ChangeDetectorRef

  ){}

  notifications:any[]=[];

  unreadCount=0;

  userId!:number;

  ngOnInit(): void {

    const user =
      this.authService.getUser();

    this.userId = user.id;

    this.loadNotifications();

    this.loadUnreadCount();

  }

  loadNotifications(){

    this.notificationService

    .getMyNotifications()

        .subscribe({

          next:(res)=>{

            console.log(res);

            this.notifications = [...res];
            
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

          next:(res)=>{


            this.unreadCount = res;
            
            this.cdr.detectChanges();

          }

        });

  }

  markAsRead(notification:any){

    this.notificationService

        .markAsRead(
          notification.id
        )

        .subscribe({

          next:()=>{

            notification.read = true;

            this.loadUnreadCount();

          }

        });

  }

  deleteNotification(notification:any){

    Swal.fire({

      title:'Delete notification?',

      icon:'warning',

      showCancelButton:true

    }).then(result=>{

      if(result.isConfirmed){

        this.notifications =
          this.notifications.filter(
            n => n.id !== notification.id
          );

      }

    });

  }

}