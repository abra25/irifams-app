import { Injectable } from '@angular/core';
import en from '../../assets/i18n/en.json';
import sw from '../../assets/i18n/sw.json';

@Injectable({ providedIn: 'root' })
export class LangService {
  private lang = 'en';

  private translations: any = {
    en,
    sw
  };

  setLanguage(code: 'en' | 'sw') {
    this.lang = code;
  }

  t(path: string): string {
    const keys = path.split('.');
    let value = this.translations[this.lang];

    for (const key of keys) {
      value = value?.[key];
    }
    return value || path;
  }

  get currentLang() {
    return this.lang;
  }
}
