import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-farms-plots',
  imports: [CommonModule],
  templateUrl: './farms-plots.html',
  styleUrl: './farms-plots.css',
})
export class FarmsPlots implements AfterViewInit {

  activeTab: 'farms' | 'plots' | 'map' = 'farms';

  farmModalOpen = false;
  plotModalOpen = false;

  setTab(tab: 'farms' | 'plots' | 'map'): void {
    this.activeTab = tab;
    setTimeout(() => (window as any).lucide?.createIcons(), 0);
  }

  openFarmModal(): void { this.farmModalOpen = true; setTimeout(() => (window as any).lucide?.createIcons(), 0); }
  closeFarmModal(): void { this.farmModalOpen = false; }

  openPlotModal(): void { this.plotModalOpen = true; setTimeout(() => (window as any).lucide?.createIcons(), 0); }
  closePlotModal(): void { this.plotModalOpen = false; }

  ngAfterViewInit(): void {
    setTimeout(() => (window as any).lucide?.createIcons(), 0);
  }
}