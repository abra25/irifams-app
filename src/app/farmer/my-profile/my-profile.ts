import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  imports: [CommonModule,FormsModule],
  templateUrl: './my-profile.html',
  styleUrl: './my-profile.css',
})
export class MyProfile {
  showEditModal = false;
showPasswordModal = false;

editData = {
  fullName: 'Abrah\'man Makame',
  phone: '+255 777 617 786',
  address: 'Cheju, Zanzibar'
};

passwordData = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
};

saveProfile() {

  console.log(this.editData);

  this.showEditModal = false;

  alert('Profile updated successfully');
}

changePassword() {

  console.log(this.passwordData);

  this.showPasswordModal = false;

  alert('Password changed successfully');
}

  farmer = {

    fullName: 'Abrah\'man Makame',

    zanId: '0701020202020001',

    gender: 'Male',

    age: 24,

    phone: '+255 777 617 786',

    address: 'Cheju, Zanzibar',

    registrationDate: '12 January 2026',

    username: 'abrahman',

    role: 'Farmer',

    status: 'Active',

    block: 'Cheju Block A'
  };

}