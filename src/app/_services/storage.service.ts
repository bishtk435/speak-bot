import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  OPEN_AI_TOKEN_KEY = 'open-ai-token';

  constructor() { }

  setOpenAIToken(openAIToken: string): void {
    localStorage.setItem(this.OPEN_AI_TOKEN_KEY, openAIToken);
  }

  getOpenAIToken(): string {
    return localStorage.getItem(this.OPEN_AI_TOKEN_KEY) || '';
  }
}
