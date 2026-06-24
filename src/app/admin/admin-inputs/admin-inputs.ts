import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-inputs',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-inputs.html',
  styleUrl: './admin-inputs.css'
})
export class AdminInputs {

  searchTerm = '';

  showAddModal = false;
  showViewModal = false;
  showEditModal = false;

  selectedInput: any = null;

  inputs = [

    {
      id: 1,
      name: 'SARO 5 Rice Seed',
      category: 'Seed',
      quantity: 500,
      unit: 'Kg',
      season: 'Season A',
      image: 'img/saro5.jfif',
      status: 'Available'
    },

    {
      id: 2,
      name: 'Urea Fertilizer',
      category: 'Fertilizer',
      quantity: 120,
      unit: 'Bags',
      season: 'Season A',
      image: 'img/urea.jfif',
      status: 'Available'
    },

    {
      id: 3,
      name: 'DAP Fertilizer',
      category: 'Fertilizer',
      quantity: 0,
      unit: 'Bags',
      season: 'Season B',
      image: 'img/dap.jfif',
      status: 'Out of Stock'
    }

  ];

  newInput = {

    name: '',
    category: '',
    quantity: 0,
    unit: '',
    season: '',
    image: '',
    status: 'Available'

  };

  get filteredInputs() {

    return this.inputs.filter(input =>

      input.name.toLowerCase()
      .includes(this.searchTerm.toLowerCase())

      ||

      input.category.toLowerCase()
      .includes(this.searchTerm.toLowerCase())

    );

  }

  get availableCount(): number {

    return this.inputs.filter(
      i => i.status === 'Available'
    ).length;

  }

  addInput() {

    this.inputs.unshift({

      id: this.inputs.length + 1,

      ...this.newInput

    });

    this.showAddModal = false;

    this.newInput = {

      name: '',
      category: '',
      quantity: 0,
      unit: '',
      season: '',
      image: '',
      status: 'Available'

    };

  }

  viewInput(input: any) {

    this.selectedInput = input;
    this.showViewModal = true;

  }

  editInput(input: any) {

    this.selectedInput = { ...input };
    this.showEditModal = true;

  }

  saveInput() {

    const index = this.inputs.findIndex(
      i => i.id === this.selectedInput.id
    );

    this.inputs[index] = this.selectedInput;

    this.showEditModal = false;

  }

  toggleStatus(input: any) {

    input.status =
      input.status === 'Available'
      ? 'Out of Stock'
      : 'Available';

  }

}