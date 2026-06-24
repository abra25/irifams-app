import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-s-inputs',
  imports: [CommonModule,FormsModule],
  standalone: true,
  templateUrl: './s-inputs.html',
  styleUrl: './s-inputs.css',
})
export class SInputs {


  showAddModal = false;
  showViewModal = false;
  showDistributionModal = false;

  selectedInput: any = null;

  inputs = [

    {
      id: 1,
      name: 'SARO 5 Rice Seed',
      category: 'Seed',
      image: 'img/saro5.jfif',
      quantity: 500,
      unit: 'Kg',
      season: 'Season A 2026',
      status: 'Available'
    },

    {
      id: 2,
      name: 'Urea Fertilizer',
      category: 'Fertilizer',
      image: 'img/urea.jfif',
      quantity: 250,
      unit: 'Bags',
      season: 'Season A 2026',
      status: 'Available'
    },

    {
      id: 3,
      name: 'DAP Fertilizer',
      category: 'Fertilizer',
      image: 'img/dap.jfif',
      quantity: 0,
      unit: 'Bags',
      season: 'Season A 2026',
      status: 'Out of Stock'
    }

  ];

  newInput = {
    name: '',
    category: '',
    image: '',
    quantity: 0,
    unit: '',
    season: ''
  };

  addInput() {

    this.inputs.unshift({
      id: this.inputs.length + 1,
      ...this.newInput,
      status: 'Available'
    });

    this.showAddModal = false;

    this.newInput = {
      name: '',
      category: '',
      image: '',
      quantity: 0,
      unit: '',
      season: ''
    };

  }

  viewInput(input: any) {

    this.selectedInput = input;
    this.showViewModal = true;

  }

  distributeInput(input: any) {

    this.selectedInput = input;
    this.showDistributionModal = true;

  }

  get availableCount(): number {

    return this.inputs.filter(
      i => i.status === 'Available'
    ).length;

  }

}