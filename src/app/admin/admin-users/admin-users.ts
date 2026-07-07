import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

interface User {

  id?: number;

  employeeNo?: string;

  username?: string;

  fullName: string;

  email?: string;

  phone: string;

  gender?: string;

  role: string;

  blockName?: string;

  institution?: string;

  image?: string;

  enabled?: boolean;

  password?: string;

}

@Component({
  selector: 'app-admin-users',
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css',
})
export class AdminUsers implements OnInit{

  constructor(
  private userService: UserService,
  private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.loadUsers();
  }
  
  loadUsers(){

   this.userService
      .getAllUsers()
      .subscribe({

        next:(res)=>{

          this.users = [...res];

          this.cdr.detectChanges();

        },

        error:(err)=>{

          console.log(err);

          Swal.fire(
            'Error',
            'Failed to load users',
            'error'
          );

        }

      });

}

  selectedTab = 'All';

  searchTerm = '';

  showAddModal = false;
  showViewModal = false;
  showEditModal = false;

  selectedUser!: User;

  users: User[] = [];

  newUser: User = {
  employeeNo:'',
  fullName:'',
  email:'',
  phone:'',
  role:'',
  institution:'',
  blockName:'',
  gender:'',
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

  addUser(){

  const payload = {

    username: this.newUser.employeeNo,

    password: this.newUser.password,

    fullName: this.newUser.fullName,

    email: this.newUser.email,

    phone: this.newUser.phone,

    gender: this.newUser.gender,

    role: this.newUser.role,

    blockName: this.newUser.blockName,

    institution: this.newUser.institution

  };

  this.userService
      .addUser(payload)
      .subscribe({

        next:()=>{

  Swal.fire(
    'Success',
    'User added successfully',
    'success'
  );

  // reset form

  this.newUser = {

    employeeNo:'',
    fullName:'',
    email:'',
    phone:'',
    role:'',
    institution:'',
    blockName:'',
    gender:'',
    password:''

  };

  // close modal

  this.showAddModal = false;

  // reload users

  this.loadUsers();

},

      });

}

get stakeholdersCount() {

  return this.users.filter(
    u => u.role === 'STAKEHOLDER'
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

  saveUser(){

  this.userService
      .updateUser(
        this.selectedUser.id!,
        this.selectedUser
      )

      .subscribe({

        next:()=>{

          Swal.fire(
            'Success',
            'User updated successfully',
            'success'
          );

          this.showEditModal = false;

          this.loadUsers();

        },

        error:(err)=>{

          Swal.fire(
            'Error',
            err.error || 'Update failed',
            'error'
          );

        }

      });

}

  toggleStatus(user:any){

  this.userService

      .toggleStatus(user.id)

      .subscribe({

        next:()=>{

          this.loadUsers();

        }

      });

}

  get farmersCount() {

    return this.users.filter(
      u => u.role === 'FARMER'
    ).length;

  }

  get supervisorsCount() {

    return this.users.filter(
      u => u.role === 'SUPERVISOR'
    ).length;

  }

  get adminsCount() {

    return this.users.filter(
      u => u.role === 'ADMIN'
    ).length;

  }

}
