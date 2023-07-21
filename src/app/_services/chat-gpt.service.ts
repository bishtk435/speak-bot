import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class ChatGptService {

  gptModels = [  'gpt-4',  'gpt-4-0613',  'gpt-4-32k',  'gpt-4-32k-0613',  'gpt-3.5-turbo',  'gpt-3.5-turbo-0613',  'gpt-3.5-turbo-16k',  'gpt-3.5-turbo-16k-0613'];
  defaultModel = 'gpt-3.5-turbo';
  constructor(
    private http: HttpClient,
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

  getHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${environment.OPEN_AI_KEY}`,
    });
  }

  getPromptResponse(prompt: string, model: string = this.defaultModel, role: string = 'user') {
    const payload = this.getPayload(prompt, model, role);
    const headers = this.getHeaders();
    return this.http.post(`${environment.CHAT_GPT_URL_V1}/chat/completions`, payload, { headers} );
  }
}
