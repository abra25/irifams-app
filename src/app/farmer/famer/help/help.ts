import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type HelpSection = 'getting-started' | 'requests' | 'payments' | 'farms' | 'notifications' | 'account';


@Component({
  selector: 'app-help',
  imports: [CommonModule,FormsModule],
  templateUrl: './help.html',
  styleUrl: './help.css',
})
export class Help implements AfterViewInit {
  q = '';
  open: any = 'getting-started';

  setOpen(id: any): void {
    this.open = this.open === id ? '' : id;
    setTimeout(() => (window as any).lucide?.createIcons(), 0);
  }
  clear(): void { this.q = ''; }

  ngAfterViewInit(): void {
    setTimeout(() => (window as any).lucide?.createIcons(), 0);
  }
}