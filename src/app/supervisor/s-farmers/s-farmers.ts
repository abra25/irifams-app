import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-s-farmers',
  imports: [CommonModule,FormsModule],
  templateUrl: './s-farmers.html',
  styleUrl: './s-farmers.css',
})
export class SFarmers {

  searchTerm = '';

  showAddModal = false;
  showViewModal = false;
  showEditModal = false;

  selectedFarmer: any = null;

  farmers = [

    {
      id: 1,
      farmerNo: 'FRM-001',
      fullName: 'Ali Hassan',
      phone: '+255777111222',
      block: 'Cheju Block A',
      gender: 'Male',
      status: 'Active'
    },

    {
      id: 2,
      farmerNo: 'FRM-002',
      fullName: 'Fatma Omar',
      phone: '+255777333444',
      block: 'Cheju Block A',
      gender: 'Female',
      status: 'Active'
    },

    {
      id: 3,
      farmerNo: 'FRM-003',
      fullName: 'Ahmed Suleiman',
      phone: '+255777555666',
      block: 'Cheju Block B',
      gender: 'Male',
      status: 'Inactive'
    }

  ];

  newFarmer = {
    farmerNo: '',
    fullName: '',
    phone: '',
    block: '',
    gender: ''
  };

  addFarmer() {

    this.farmers.unshift({
      id: this.farmers.length + 1,
      ...this.newFarmer,
      status: 'Active'
    });

    this.newFarmer = {
      farmerNo: '',
      fullName: '',
      phone: '',
      block: '',
      gender: ''
    };

    this.showAddModal = false;

  }

  viewFarmer(farmer: any) {
    this.selectedFarmer = farmer;
    this.showViewModal = true;
  }

  editFarmer(farmer: any) {
    this.selectedFarmer = { ...farmer };
    this.showEditModal = true;
  }

  saveEdit() {

    const index = this.farmers.findIndex(
      f => f.id === this.selectedFarmer.id
    );

    this.farmers[index] = this.selectedFarmer;

    this.showEditModal = false;
  }

  toggleStatus(farmer: any) {

    farmer.status =
      farmer.status === 'Active'
      ? 'Inactive'
      : 'Active';

  }

  get activeFarmersCount(): number {
  return this.farmers.filter(
    farmer => farmer.status === 'Active'
  ).length;
}

}