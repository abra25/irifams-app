import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-plots',
  imports: [CommonModule],
  templateUrl: './my-plots.html',
  styleUrl: './my-plots.css',
})
export class MyPlots {

  showModal = false;

  selectedPlot: any = null;

  plots = [

    {
      plotNo: 'PLT-001',
      block: 'Cheju Block A',
      size: 2.5,
      soilType: 'Clay Loam',
      ownership: 'Owned',
      status: 'Active',
      season: '2026 Season A'
    },

    {
      plotNo: 'PLT-002',
      block: 'Cheju Block A',
      size: 1.8,
      soilType: 'Silty Clay',
      ownership: 'Owned',
      status: 'Active',
      season: '2026 Season A'
    },

    {
      plotNo: 'PLT-003',
      block: 'Cheju Block B',
      size: 3.2,
      soilType: 'Clay',
      ownership: 'Leased',
      status: 'Inactive',
      season: '2026 Season A'
    }

  ];

  viewPlot(plot: any) {

    this.selectedPlot = plot;
    this.showModal = true;

  }

}
