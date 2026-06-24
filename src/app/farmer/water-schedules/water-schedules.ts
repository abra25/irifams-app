import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-water-schedules',
  imports: [CommonModule],
  templateUrl: './water-schedules.html',
  styleUrl: './water-schedules.css',
})
export class WaterSchedules {
  showModal = false;

  selectedSchedule: any = null;

  schedules = [

    {
      id: 1,
      block: 'Cheju Block A',
      day: 'Monday',
      startTime: '06:00 AM',
      endTime: '10:00 AM',
      season: 'Season A - 2026',
      status: 'Upcoming',
      description:
        'Water supply for rice plots in Cheju Block A.'
    },

    {
      id: 2,
      block: 'Cheju Block A',
      day: 'Thursday',
      startTime: '02:00 PM',
      endTime: '06:00 PM',
      season: 'Season A - 2026',
      status: 'Active',
      description:
        'Afternoon irrigation schedule.'
    },

    {
      id: 3,
      block: 'Cheju Block B',
      day: 'Saturday',
      startTime: '07:00 AM',
      endTime: '11:00 AM',
      season: 'Season A - 2026',
      status: 'Completed',
      description:
        'Weekend irrigation schedule.'
    }

  ];

  openDetails(schedule: any) {

    this.selectedSchedule = schedule;
    this.showModal = true;

  }

}