import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-farmer-profile',
  imports: [],
  templateUrl: './farmer-profile.html',
  styleUrl: './farmer-profile.css',
})
export class FarmerProfile implements AfterViewInit {

  ngAfterViewInit(): void {
    setTimeout(() => (window as any).lucide?.createIcons(), 0);
  }
}