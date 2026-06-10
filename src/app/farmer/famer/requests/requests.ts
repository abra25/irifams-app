import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-requests',
  imports: [CommonModule],
  templateUrl: './requests.html',
  styleUrl: './requests.css',
})
export class Requests implements AfterViewInit {

  // UI-only state (no backend)
  activeTab: 'water' | 'tractor' | 'inputs' | 'harvest' = 'water';
  modalOpen = false;

  setTab(tab: 'water' | 'tractor' | 'inputs' | 'harvest'): void {
    this.activeTab = tab;
    // refresh icons (tabs content changes)
    setTimeout(() => (window as any).lucide?.createIcons(), 0);
  }

  openModal(): void {
    this.modalOpen = true;
    setTimeout(() => (window as any).lucide?.createIcons(), 0);
  }

  closeModal(): void {
    this.modalOpen = false;
  }

  ngAfterViewInit(): void {
    setTimeout(() => (window as any).lucide?.createIcons(), 0);
  }
}
