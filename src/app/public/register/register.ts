import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';

declare const lucide: any;

@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements AfterViewInit {
  showPassword = false;
  showConfirmPassword = false;
  loading = false;

  registerData = {
    fullName: '',
    phone: '',
    email: '',
    block: '',
    farmSize: '',
    nationalId: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  };

  togglePassword(): void {
    this.showPassword = !this.showPassword;
    this.refreshIcons();
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
    this.refreshIcons();
  }

  onRegister(): void {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    this.loading = true;

    console.log('Register data:', this.registerData);

    setTimeout(() => {
      this.loading = false;
      alert('Registration submitted successfully');
    }, 1200);
  }

  refreshIcons(): void {
    setTimeout(() => {
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    });
  }

  ngAfterViewInit(): void {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
}