import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  imports: [],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css',
})
export class Notifications implements AfterViewInit {

  previewOpen = false;

  openPreview(): void {
    this.previewOpen = true;
    setTimeout(() => (window as any).lucide?.createIcons(), 0);
  }

  closePreview(): void {
    this.previewOpen = false;
  }

  ngAfterViewInit(): void {
    setTimeout(() => (window as any).lucide?.createIcons(), 0);
  }
}