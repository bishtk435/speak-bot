import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/env';
import { StorageService } from './storage.service';
import { ToastMsgService } from './toast-msg.service';

@Injectable({
  providedIn: 'root'
})
export class ChatGptService {

  gptModels = [  'gpt-4',  'gpt-4-0613',  'gpt-4-32k',  'gpt-4-32k-0613',  'gpt-3.5-turbo',  'gpt-3.5-turbo-0613',  'gpt-3.5-turbo-16k',  'gpt-3.5-turbo-16k-0613'];
  defaultModel = 'gpt-3.5-turbo';
  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private toastMsgService: ToastMsgService,
  ) { }


  getPayload(
    prompt: string,
    model: string,
    role: string,
  ) {
    return {
      model,
      messages: [{role, content: prompt}],
      temperature: 0.7
    };
  }

  getHeaders(openAIToken: string) {
    return new HttpHeaders({
      Authorization: `Bearer ${openAIToken}`,
    });
  }

  getPromptResponse(prompt: string, model: string = this.defaultModel, role: string = 'user') {
    const openAITokenFromStorage = this.storageService.getOpenAIToken();
    if(!openAITokenFromStorage) {
      this.toastMsgService.showToastMessage(
        "No OpenAI token found, Please add one using 'OpenAI Token' button!",
        "Close",
        6000,
      );
      return;
    }
    const headers = this.getHeaders(openAITokenFromStorage);
    const payload = this.getPayload(prompt, model, role);
    return this.http.post(`${environment.CHAT_GPT_URL_V1}/chat/completions`, payload, { headers} );
  }
}
