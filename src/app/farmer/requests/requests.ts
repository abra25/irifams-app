import { CommonModule } from '@angular/common';
import {  Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-requests',
  imports: [CommonModule,FormsModule],
  templateUrl: './requests.html',
  styleUrl: './requests.css',
})
export class Requests {


  submitted = false;

  plots = [
    {
      id: 1,
      plotNo: 'PLT-001',
      block: 'Cheju Block A',
      size: 2.5,
      soilType: 'Clay Loam'
    },

    {
      id: 2,
      plotNo: 'PLT-002',
      block: 'Cheju Block A',
      size: 1.8,
      soilType: 'Silty Clay'
    },

    {
      id: 3,
      plotNo: 'PLT-003',
      block: 'Cheju Block B',
      size: 3.2,
      soilType: 'Clay'
    }
  ];

  selectedPlot: any = null;

  request = {
    plotId: '',
    serviceType: '',
    preferredDate: '',
    notes: ''
  };

  services = [
    'Tractor Service',
    'Harvesting Service'
  ];

  onPlotChange() {

  this.selectedPlot = this.plots.find(
    p => p.id === Number(this.request.plotId)
  );

}

  submitRequest() {

    console.log(this.request);

    this.submitted = true;

    setTimeout(() => {
      this.submitted = false;
    }, 3000);

  }

  clearForm() {

    this.request = {
      plotId: '',
      serviceType: '',
      preferredDate: '',
      notes: ''
    };

    this.selectedPlot = null;
  }

}

