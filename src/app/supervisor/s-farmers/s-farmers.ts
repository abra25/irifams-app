import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

interface Farmer {

  id?: number;

  employeeNo?: string;

  fullName: string;

  phone: string;

  gender?: string;

  blockName?: string;

  role: string;

  enabled?: boolean;

  email?: string;

}
@Component({
  selector: 'app-s-farmers',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './s-farmers.html',
  styleUrl: './s-farmers.css'
})

export class SFarmers implements OnInit {

  constructor(
    private userService: UserService,
    
    private cdr: ChangeDetectorRef
  ){}

  searchTerm='';

  showAddModal=false;
  showViewModal=false;
  showEditModal=false;

  selectedFarmer!: Farmer;

  farmers: Farmer[] = [];

  newFarmer: Farmer = {

    employeeNo:'',
    fullName:'',
    phone:'',
    blockName:'',
    gender:'',
    role:'FARMER'

  };

  ngOnInit(): void {
    

    this.loadFarmers();

  }
loadFarmers(){

  this.userService
      .getMyFarmers()
      .subscribe({

        next:(res)=>{

          this.farmers = [...res];
          
            this.cdr.detectChanges();
        },

        error:()=>{

          Swal.fire(
            'Error',
            'Failed to load farmers',
            'error'
          );

        }

      });

}

  get filteredFarmers(){

    return this.farmers.filter(farmer =>

      farmer.fullName
      .toLowerCase()
      .includes(
        this.searchTerm.toLowerCase()
      )

      ||

      farmer.phone
      .toLowerCase()
      .includes(
        this.searchTerm.toLowerCase()
      )

      ||

      (farmer.blockName || '')
      .toLowerCase()
      .includes(
        this.searchTerm.toLowerCase()
      )

    );

  }

  addFarmer(){

  const payload = {

    username:
    this.newFarmer.employeeNo,

    password: '123456',

    employeeNo:
    this.newFarmer.employeeNo,

    fullName:
    this.newFarmer.fullName,

    phone:
    this.newFarmer.phone,

    gender:
    this.newFarmer.gender,

    blockName:
    this.newFarmer.blockName,

    role:'FARMER'

  };

  this.userService
      .addUser(payload)

      .subscribe({

        next:()=>{

          Swal.fire(
            'Success',
            'Farmer registered successfully\nDefault Password: 123456',
            'success'
          );

          this.showAddModal=false;

          this.newFarmer={

            employeeNo:'',
            fullName:'',
            phone:'',
            blockName:'',
            gender:'',
            role:'FARMER'

          };

          this.loadFarmers();

        },

        error:(err)=>{

          Swal.fire(
            'Error',
            err.error ||
            'Registration failed',
            'error'
          );

        }

      });

}

  viewFarmer(farmer: Farmer){

    this.selectedFarmer = farmer;

    this.showViewModal = true;

  }

  editFarmer(farmer: Farmer){

    this.selectedFarmer = {

      ...farmer

    };

    this.showEditModal = true;

  }

  saveEdit(){

  this.userService
      .updateUser(
        this.selectedFarmer.id!,
        this.selectedFarmer
      )

      .subscribe({

        next:()=>{

          Swal.fire(
            'Success',
            'Farmer updated successfully',
            'success'
          );

          this.showEditModal = false;

          this.loadFarmers();

        },

        error:(err)=>{

          Swal.fire(
            'Error',
            err.error ||
            'Failed to update farmer',
            'error'
          );

        }

      });

}

  toggleStatus(farmer: Farmer){

    this.userService
        .toggleStatus(
          farmer.id!
        )

        .subscribe({

          next:()=>{

            this.loadFarmers();

          }

        });

  }

  get activeFarmersCount(){

    return this.farmers.filter(

      farmer => farmer.enabled

    ).length;

  }

}