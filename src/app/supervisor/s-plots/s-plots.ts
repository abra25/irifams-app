import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-s-plots',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './s-plots.html',
  styleUrl: './s-plots.css',
})
export class SPlots {

  searchTerm = '';

  showAddModal = false;
  showViewModal = false;
  showEditModal = false;

  selectedPlot: any = null;

  farmers = [
    'Ali Hassan',
    'Fatma Omar',
    'Ahmed Suleiman'
  ];

  plots = [

    {
      id: 1,
      plotNo: 'PLT-001',
      farmer: 'Ali Hassan',
      block: 'Cheju Block A',
      size: 2.5,
      soilType: 'Clay Loam',
      status: 'Active'
    },

    {
      id: 2,
      plotNo: 'PLT-002',
      farmer: 'Fatma Omar',
      block: 'Cheju Block A',
      size: 1.8,
      soilType: 'Clay',
      status: 'Active'
    },

    {
      id: 3,
      plotNo: 'PLT-003',
      farmer: 'Ahmed Suleiman',
      block: 'Cheju Block B',
      size: 3.2,
      soilType: 'Sandy Clay',
      status: 'Inactive'
    }

  ];

 newPlot = {
  plotNo: '',
  farmer: '',
  block: '',
  size: 0,
  soilType: ''
};

  addPlot() {

    this.plots.unshift({
      id: this.plots.length + 1,
      ...this.newPlot,
      status: 'Active'
    });

    this.showAddModal = false;

    this.newPlot = {
      plotNo: '',
      farmer: '',
      block: '',
      size: 0,
      soilType: ''
    };

  }

  viewPlot(plot: any) {
    this.selectedPlot = plot;
    this.showViewModal = true;
  }

  editPlot(plot: any) {
    this.selectedPlot = { ...plot };
    this.showEditModal = true;
  }

  saveEdit() {

    const index = this.plots.findIndex(
      p => p.id === this.selectedPlot.id
    );

    this.plots[index] = this.selectedPlot;

    this.showEditModal = false;
  }

  toggleStatus(plot: any) {

    plot.status =
      plot.status === 'Active'
      ? 'Inactive'
      : 'Active';

  }

  get activePlotsCount(): number {

    return this.plots.filter(
      p => p.status === 'Active'
    ).length;

  }

}
