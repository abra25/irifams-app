import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { UserService }
from '../../services/user.service';

import { AuthService }
from '../../services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sup-profile',
  imports: [CommonModule,FormsModule],
  templateUrl: './sup-profile.html',
  styleUrl: './sup-profile.css',
})
export class SupProfile implements OnInit{

  constructor(

    private userService:UserService,

    private authService:AuthService,

    private cdr:ChangeDetectorRef

  ){}

  user:any={};

  showEditModal=false;

  ngOnInit(): void {

    this.loadProfile();

  }

  loadProfile(){

    const loggedUser =
      this.authService.getUser();

    if(!loggedUser) return;

    this.userService

        .getUserById(loggedUser.id)

        .subscribe({

          next:(res)=>{

            this.user = {...res};

            this.cdr.detectChanges();

          },

          error:()=>{

            Swal.fire(
              'Error',
              'Failed to load profile',
              'error'
            );

          }

        });

  }

  editProfile(){

    this.showEditModal=true;

  }

  saveProfile(){

    this.userService

        .updateUser(
          this.user.id,
          this.user
        )

        .subscribe({

          next:(res)=>{

            sessionStorage.setItem(
              'user',
              JSON.stringify({
                ...this.authService.getUser(),
                fullName:res.fullName,
                image:res.image
              })
            );

            Swal.fire(
              'Success',
              'Profile updated successfully',
              'success'
            );

            this.showEditModal=false;

            this.loadProfile();

          },

          error:()=>{

            Swal.fire(
              'Error',
              'Failed to update profile',
              'error'
            );

          }

        });

  }

}
