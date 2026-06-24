import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-users',
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css',
})
export class AdminUsers {


  selectedTab = 'All';

  searchTerm = '';

  showAddModal = false;
  showViewModal = false;
  showEditModal = false;

  selectedUser: any = null;

  users = [

    {
      id:1,
      fullName:'Ali Hassan',
      phone:'+255777111111',
      role:'Farmer',
      block:'Cheju A',
      status:'Active'
    },

    {
      id:2,
      fullName:'Fatma Omar',
      phone:'+255777222222',
      role:'Supervisor',
      block:'Cheju B',
      status:'Active'
    },

    {
      id:3,
      fullName:'Admin User',
      phone:'+255777333333',
      role:'Admin',
      block:'-',
      status:'Active'
    },

    {
      id:4,
      fullName:'Ahmed Suleiman',
      phone:'+255777444444',
      role:'Farmer',
      block:'Cheju A',
      status:'Inactive'
    },
    {
  id:5,
  employeeNo:'EMP005',
  fullName:'Ministry Officer',
  phone:'+255777888888',
  email:'officer@kilimo.go.tz',
  role:'Stakeholder',
  institution:'Ministry of Agriculture',
  block:'-',
  status:'Active'
}

  ];

  newUser = {
  employeeNo:'',
  fullName:'',
  email:'',
  phone:'',
  role:'',
  institution:'',
  block:'',
  gender:'',
  password:'123456'
};

  setTab(tab: string) {
    this.selectedTab = tab;
  }

  get filteredUsers() {

    return this.users.filter(user => {

      const roleMatch =
        this.selectedTab === 'All'
        || user.role === this.selectedTab;

      const searchMatch =
        user.fullName.toLowerCase()
        .includes(this.searchTerm.toLowerCase());

      return roleMatch && searchMatch;

    });

  }

  addUser() {

  this.users.unshift({

    id: this.users.length + 1,

    ...this.newUser,

    status:'Active'

  });

  this.showAddModal = false;

  this.newUser = {

    employeeNo:'',
    fullName:'',
    email:'',
    phone:'',
    role:'',
    institution:'',
    block:'',
    gender:'',
    password:'123456'

  };

}

get stakeholdersCount() {

  return this.users.filter(
    u => u.role === 'Stakeholder'
  ).length;

}

  viewUser(user:any) {

    this.selectedUser = user;
    this.showViewModal = true;

  }

  editUser(user:any) {

    this.selectedUser = {...user};
    this.showEditModal = true;

  }

  saveUser() {

    const index = this.users.findIndex(
      u => u.id === this.selectedUser.id
    );

    this.users[index] = this.selectedUser;

    this.showEditModal = false;

  }

  toggleStatus(user:any) {

    user.status =
      user.status === 'Active'
      ? 'Inactive'
      : 'Active';

  }

  get farmersCount() {

    return this.users.filter(
      u => u.role === 'Farmer'
    ).length;

  }

  get supervisorsCount() {

    return this.users.filter(
      u => u.role === 'Supervisor'
    ).length;

  }

  get adminsCount() {

    return this.users.filter(
      u => u.role === 'Admin'
    ).length;

  }

}
