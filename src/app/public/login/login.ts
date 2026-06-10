import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';

declare const lucide: any;

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements AfterViewInit {
  showPassword = false;
  loading = false;

  loginData = {
    username: '',
    password: '',
    role: ''
  };

  togglePassword(): void {
    this.showPassword = !this.showPassword;

    setTimeout(() => {
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    });
  }

  onLogin(): void {
    this.loading = true;

    console.log('Login data:', this.loginData);

    setTimeout(() => {
      this.loading = false;
      alert('Login submitted successfully');
    }, 1200);
  }

  ngAfterViewInit(): void {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
}