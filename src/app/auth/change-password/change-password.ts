import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-change-password',
  standalone:true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css'
})
export class ChangePassword {

  showCurrent = false;
showNew = false;
showConfirm = false;

  loading = false;

  passwordData = {

    currentPassword:'',

    newPassword:'',

    confirmPassword:''

  };

  constructor(

    private userService:UserService,

    private authService:AuthService,

    private router:Router

  ){}

  changePassword(){

    if(

      !this.passwordData.currentPassword ||

      !this.passwordData.newPassword ||

      !this.passwordData.confirmPassword

    ){

      Swal.fire(

        'Missing Information',

        'Please fill all fields.',

        'warning'

      );

      return;

    }

    if(

      this.passwordData.newPassword

      !==

      this.passwordData.confirmPassword

    ){

      Swal.fire(

        'Error',

        'Passwords do not match.',

        'error'

      );

      return;

    }

    this.loading = true;

    this.userService

    .changePassword({

      currentPassword:

      this.passwordData.currentPassword,

      newPassword:

      this.passwordData.newPassword

    })

    .subscribe({

      next:()=>{

        this.loading = false;

        // update current session

        const user = this.authService.getUser();

        user.temporaryPassword = false;

        sessionStorage.setItem(

          'user',

          JSON.stringify(user)

        );

        Swal.fire({

          icon:'success',

          title:'Password Updated',

          text:'Your password has been changed successfully.'

        }).then(()=>{

          switch(user.role){

            case 'ADMIN':

              this.router.navigate([

                '/admin/dashboard'

              ]);

              break;

            case 'SUPERVISOR':

              this.router.navigate([

                '/supervisor/dashboard'

              ]);

              break;

            case 'FARMER':

              this.router.navigate([

                '/farmer/dashboard'

              ]);

              break;

            case 'STAKEHOLDER':

              this.router.navigate([

                '/stakeholder'

              ]);

              break;

          }

        });

      },

      error:(err)=>{

        this.loading = false;

        Swal.fire(

          'Failed',

          err.error,

          'error'

        );

      }

    });

  }

}