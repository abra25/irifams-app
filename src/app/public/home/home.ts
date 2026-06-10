import { AfterViewInit, Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

declare const lucide: any;

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit {
  mobileMenuOpen = false;
  stats = [
    {
      icon: 'users',
      value: '1,250+',
      label: 'Registered Farmers'
    },
    {
      icon: 'tractor',
      value: '320+',
      label: 'Tractor Services'
    },
    {
      icon: 'combine',
      value: '540+',
      label: 'Harvesting Services'
    },
    {
      icon: 'package',
      value: '870+',
      label: 'Inputs Distributed'
    }
  ];

  features = [
    {
      icon: 'clipboard-list',
      title: 'Track Requests',
      text: 'Monitor tractor, harvesting, and farm service requests with ease.'
    },
    {
      icon: 'sprout',
      title: 'Manage Inputs',
      text: 'Record and manage seed and fertilizer distribution effectively.'
    },
    {
      icon: 'badge-dollar-sign',
      title: 'Control Payments',
      text: 'Generate control numbers and follow up payment confirmations.'
    }
  ];

   // SCROLL FUNCTION
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

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }, 0);
  }
}

