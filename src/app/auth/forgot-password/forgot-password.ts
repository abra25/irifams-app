import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword {

  loading = false;
  submitted = false;

  formData = {
    usernameOrEmail: ''
  };

  onSubmit(): void {

    if (!this.formData.usernameOrEmail) {
      return;
    }

    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.submitted = true;
    }, 1500);
  }

}