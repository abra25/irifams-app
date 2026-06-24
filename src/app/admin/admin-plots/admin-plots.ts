import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-plots',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-plots.html',
  styleUrl: './admin-plots.css'
})
export class AdminPlots {

  searchTerm = '';

  showAddModal = false;
  showViewModal = false;
  showEditModal = false;

  selectedPlot: any = null;

  plots = [

    {
      id: 1,
      plotNo: 'PLT-001',
      farmer: 'Ali Hassan',
      block: 'Cheju A',
      size: 2.5,
      soilType: 'Clay Loam',
      season: 'Season A',
      status: 'Active'
    },

    {
      id: 2,
      plotNo: 'PLT-002',
      farmer: 'Fatma Omar',
      block: 'Cheju B',
      size: 1.8,
      soilType: 'Clay',
      season: 'Season A',
      status: 'Active'
    },

    {
      id: 3,
      plotNo: 'PLT-003',
      farmer: 'Ahmed Suleiman',
      block: 'Cheju C',
      size: 3.2,
      soilType: 'Silty Clay',
      season: 'Season B',
      status: 'Inactive'
    }

  ];

  newPlot = {

    plotNo: '',
    farmer: '',
    block: '',
    size: null as number | null,
    soilType: '',
    season: '',
    status: 'Active'

  };

  get filteredPlots() {

    return this.plots.filter(plot =>

      plot.plotNo.toLowerCase()
      .includes(this.searchTerm.toLowerCase())

      ||

      plot.farmer.toLowerCase()
      .includes(this.searchTerm.toLowerCase())

      ||

      plot.block.toLowerCase()
      .includes(this.searchTerm.toLowerCase())

    );

  }

  addPlot() {

    this.plots.unshift({

      id: this.plots.length + 1,

      plotNo: this.newPlot.plotNo,
      farmer: this.newPlot.farmer,
      block: this.newPlot.block,
      size: this.newPlot.size || 0,
      soilType: this.newPlot.soilType,
      season: this.newPlot.season,
      status: this.newPlot.status

    });

    this.showAddModal = false;

  }

  viewPlot(plot: any) {

    this.selectedPlot = plot;
    this.showViewModal = true;

  }

  editPlot(plot: any) {

    this.selectedPlot = { ...plot };
    this.showEditModal = true;

  }

  savePlot() {

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
    plot => plot.status === 'Active'
  ).length;

}

}
