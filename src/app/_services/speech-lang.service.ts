import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

export const DEFAULT_SPEECH_LANG = 'en-US';

@Injectable({
  providedIn: 'root'
})
export class SpeechLangService {
  private synth = (window as any)?.speechSynthesis;

  constructor(
    private storageService: StorageService
  ) { }

  private getSupportedLanguage() {
    const voices = (this.synth?.getVoices() ?? []).sort(function (a: any, b: any) {
      const aname = a.name.toUpperCase();
      const bname = b.name.toUpperCase();
  
      if (aname < bname) {
        return -1;
      } else if (aname == bname) {
        return 0;
      } else {
        return +1;
      }
    });

    return voices;
  }

  getSupportedLang() {
    return this.getSupportedLanguage();
  }

  getCurrentLang() {
    const currentLangCode = this.storageService.getSpeechLangCode();
    const currentLang = this.getSupportedLanguage().find((voice: any) => voice.lang === currentLangCode);

    if(!currentLang) {
      return this.getSupportedLanguage().find((voice: any) => voice.lang === DEFAULT_SPEECH_LANG);
    }
    return currentLang;
  }

  getCurrentLangCode(): string {
    return this.storageService.getSpeechLangCode() ?? DEFAULT_SPEECH_LANG;
  }

  setSpeechLang(langCode: string): void {
    this.storageService.setSpeechLang(langCode);
  }
}
