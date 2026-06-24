import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


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

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin(): void {

    if (!this.loginData.username ||
        !this.loginData.password) {
      return;
    }

    this.loading = true;

    console.log(this.loginData);

    setTimeout(() => {

      this.loading = false;

      alert('Login Success');

    }, 1500);
  }
}