import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  showPassword = false;
  loading = false;

  loginData = {

    username: '',
    password: '',
    rememberMe: false

  };

  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  togglePassword(): void {

    this.showPassword =
      !this.showPassword;

  }

  onLogin(){

    this.loading = true;

    this.authService
      .login(this.loginData)

      .subscribe({

        next:(response)=>{

          this.loading = false;

          // save logged in user
          localStorage.setItem(
          'user',
           JSON.stringify(response)
          );

          Swal.fire({
            icon:'success',
            title:'Login Successful',
            text:`Welcome ${response.fullName}`,
            timer:1500,
            showConfirmButton:false
          });

          if(response.role==='ADMIN'){

            this.router.navigate([
              '/admin/dashboard'
            ]);

          }

          else if(
            response.role==='SUPERVISOR'
          ){

            this.router.navigate([
              '/supervisor/dashboard'
            ]);

          }

          else if(
            response.role==='FARMER'
          ){

            this.router.navigate([
              '/farmer/dashboard'
            ]);

          }

          else if(
            response.role==='STAKEHOLDER'
          ){

            this.router.navigate([
              '/stakeholder'
            ]);

          }

        },

        error:()=>{

          this.loading = false;

          Swal.fire({
            icon:'error',
            title:'Login Failed',
            text:'Invalid username or password'
          });

        }

      });

  }

}