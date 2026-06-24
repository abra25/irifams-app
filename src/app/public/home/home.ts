import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  mobileMenuOpen = false;

  stats = [
    {
      icon: 'fas fa-users',
      value: '1,250+',
      label: 'Registered Farmers'
    },
    {
      icon: 'fas fa-tractor',
      value: '320+',
      label: 'Tractor Services'
    },
    {
      icon: 'fas fa-seedling',
      value: '870+',
      label: 'Inputs Distributed'
    },
    {
      icon: 'fas fa-water',
      value: '120+',
      label: 'Water Schedules'
    }
  ];

  features = [
    {
      icon: 'fas fa-tractor',
      title: 'Farm Service Requests',
      text:
        'Request tractor and harvesting services digitally.'
    },

    {
      icon: 'fas fa-seedling',
      title: 'Agricultural Inputs',
      text:
        'Manage and track seed and fertilizer distribution.'
    },

    {
      icon: 'fas fa-money-bill-wave',
      title: 'Payment Tracking',
      text:
        'Generate control numbers and monitor payment status.'
    },

    {
      icon: 'fas fa-tint',
      title: 'Water Scheduling',
      text:
        'View and manage irrigation water schedules.'
    },

    {
      icon: 'fas fa-chart-line',
      title: 'Reports & Analytics',
      text:
        'Generate reports for decision making and monitoring.'
    },

    {
      icon: 'fas fa-map-marked-alt',
      title: 'Farm Plot Management',
      text:
        'Register and manage irrigated rice farm plots.'
    }
  ];

  scrollToSection(sectionId: string) {

    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

    this.mobileMenuOpen = false;
  }

}