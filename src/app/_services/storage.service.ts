import { Injectable } from '@angular/core';
import { DEFAULT_SPEECH_LANG } from './speech-lang.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  OPEN_AI_TOKEN_KEY = 'open-ai-token';
  SPEECH_LANG_KEY = 'speech-lang';

  constructor() { }

  setOpenAIToken(openAIToken: string): void {
    this.setToStorage(this.OPEN_AI_TOKEN_KEY, openAIToken);
  }

  setSpeechLang(speechLang: string = DEFAULT_SPEECH_LANG): void {
    this.setToStorage(this.SPEECH_LANG_KEY, speechLang);
  }

  getSpeechLangCode(): string {
    const speechLang = this.getFromStorage(this.SPEECH_LANG_KEY);
    if(!speechLang){
      this.setSpeechLang(DEFAULT_SPEECH_LANG);
      return DEFAULT_SPEECH_LANG;
    }
    return speechLang;
  }

  getOpenAIToken(): string {
    return this.getFromStorage(this.OPEN_AI_TOKEN_KEY) || '';
  }

  setToStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getFromStorage(key: string) {
    return localStorage.getItem(key) || '';
  }
}
