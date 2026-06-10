import { Component, AfterViewInit } from '@angular/core';
import { LangService } from '../../../core/service/lang-service';


@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.html',
  styleUrls: ['./settings.css'],
})
export class Settings implements AfterViewInit {
  constructor(public lang: LangService) {}

  changeLang(code: 'en' | 'sw'): void {
    this.lang.setLanguage(code);
    setTimeout(() => (window as any).lucide?.createIcons(), 0);
  }

  ngAfterViewInit(): void {
    setTimeout(() => (window as any).lucide?.createIcons(), 0);
  }
}
