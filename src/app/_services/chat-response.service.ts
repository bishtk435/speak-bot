import { Injectable } from '@angular/core';
import { ChatGptService } from './chat-gpt.service';

@Injectable({
  providedIn: 'root'
})
export class ChatResponseService {

  _currentResponse: string = '';

  constructor(
    private chatGPTService: ChatGptService
  ) { 
    this.chatGPTService.newResponseRecieved$.subscribe((isNewResponseReceived: boolean) => {
      if(isNewResponseReceived)
       this._currentResponse = '';
    });    

    this.chatGPTService.updateResponse$.subscribe((resp: string) => {
      if(resp && typeof resp === 'string')
        this._currentResponse += resp;
    });
  }

  currentResponse(): string {
    return this._currentResponse;
  }
}
