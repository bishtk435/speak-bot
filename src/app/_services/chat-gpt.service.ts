import { Injectable } from '@angular/core';
import { environment } from 'src/env';
import { StorageService } from './storage.service';
import { ToastMsgService } from './toast-msg.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatGptService {

  gptModels = [  'gpt-4',  'gpt-4-0613',  'gpt-4-32k',  'gpt-4-32k-0613',  'gpt-3.5-turbo',  'gpt-3.5-turbo-0613',  'gpt-3.5-turbo-16k',  'gpt-3.5-turbo-16k-0613'];
  defaultModel = 'gpt-3.5-turbo';
  updateResponse$: Subject<string> = new Subject<string>();
  chatCompletionComplete$: Subject<boolean> = new Subject<boolean>();

  constructor(
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
      temperature: 0.7,
      stream: true
    };
  }

  getHeaders(openAIToken: string) {
    return {
        Authorization: `Bearer ${openAIToken}`,
        "Content-Type": "application/json",
      };
  }

  async getPromptResponse(prompt: string, model: string = this.defaultModel, role: string = 'user') {
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

    try {
      const response: any = await fetch(
          `${environment.CHAT_GPT_URL_V1}/chat/completions`, 
          { 
            method: "POST",
            body: JSON.stringify(payload), 
            headers,
            }
      );
      // Read the response as a stream of data
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let resultText = "";
  
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        const chunk = decoder.decode(value);

        try {

          const lines = chunk.trim().split('data: ').map(line => line.trim()).filter(line => line !== '');

          lines.forEach((line) => {
            if(line !== '[DONE]'){
              const batchResponse = JSON.parse(line);
              const batchResponseMsg = batchResponse.choices?.[0]?.delta?.content;
              if(
                batchResponseMsg
              ){
                resultText += batchResponseMsg;
                this.updateResponse$.next(batchResponseMsg);
              }
            }
            else {
              this.chatCompletionComplete$.next(true);
              console.log('DONE');
            }
          })
        }catch(e) {
          console.error('Parsing error', chunk.trim().split('data: '));
        }
      }
  } catch(e) {
      console.error(`Some error occured: ${e}`);
  }
  }
}
