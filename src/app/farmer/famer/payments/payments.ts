import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-payments',
  imports: [],
  templateUrl: './payments.html',
  styleUrl: './payments.css',
})
export class Payments implements AfterViewInit {

  receiptOpen = false;

  openReceipt(): void {
    this.receiptOpen = true;
    setTimeout(() => (window as any).lucide?.createIcons(), 0);
  }

  closeReceipt(): void {
    this.receiptOpen = false;
  }

  ngAfterViewInit(): void {
    setTimeout(() => (window as any).lucide?.createIcons(), 0);
  }
}