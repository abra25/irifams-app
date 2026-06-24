import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wsm',
  imports: [CommonModule,FormsModule],
  templateUrl: './wsm.html',
  styleUrl: './wsm.css',
})
export class Wsm {


  showAddModal = false;
  showViewModal = false;
  showEditModal = false;

  selectedSchedule: any = null;

  schedules = [

    {
      id: 1,
      block: 'Cheju Block A',
      day: 'Monday',
      startTime: '06:00',
      endTime: '10:00',
      season: 'Season A 2026',
      status: 'Active'
    },

    {
      id: 2,
      block: 'Cheju Block B',
      day: 'Thursday',
      startTime: '14:00',
      endTime: '18:00',
      season: 'Season A 2026',
      status: 'Completed'
    }

  ];

  newSchedule = {
    block: '',
    day: '',
    startTime: '',
    endTime: '',
    season: ''
  };

  addSchedule() {

    this.schedules.unshift({
      id: this.schedules.length + 1,
      ...this.newSchedule,
      status: 'Active'
    });

    this.newSchedule = {
      block: '',
      day: '',
      startTime: '',
      endTime: '',
      season: ''
    };

    this.showAddModal = false;
  }

  viewSchedule(schedule: any) {

    this.selectedSchedule = schedule;
    this.showViewModal = true;

  }

  editSchedule(schedule: any) {

    this.selectedSchedule = { ...schedule };
    this.showEditModal = true;

  }

  saveEdit() {

    const index = this.schedules.findIndex(
      s => s.id === this.selectedSchedule.id
    );

    this.schedules[index] = this.selectedSchedule;

    this.showEditModal = false;

  }

  toggleStatus(schedule: any) {

    schedule.status =
      schedule.status === 'Active'
      ? 'Completed'
      : 'Active';

  }

  get activeSchedulesCount(): number {

    return this.schedules.filter(
      s => s.status === 'Active'
    ).length;

  }

}
