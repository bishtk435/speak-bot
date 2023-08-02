import { Injectable } from '@angular/core';
import { SpeechLangService } from './speech-lang.service';
import { Subject } from 'rxjs';
import { SpeechTextHighlightPointer } from '../_models/models';
import { ChatGptService } from './chat-gpt.service';
import { ChatResponseService } from './chat-response.service';


@Injectable({
  providedIn: 'root'
})
export class SpeechSynthesisService {

  synth = (window as any)?.speechSynthesis;
  speechHighlightPointer: Subject<SpeechTextHighlightPointer> = new Subject<SpeechTextHighlightPointer>();
  get chatResponse(): string {
    return this.chatResponseService.currentResponse();
  };

  constructor(
    private speechLangService: SpeechLangService,
    private chatResponseService: ChatResponseService,
    private chatGPTService: ChatGptService
  ) {
     this.cancel();

     this.chatGPTService.newResponseRecieved$.subscribe((newResponse: boolean) => {
      if(newResponse && this.isSpeakingInProgress()) this.cancel(); 
     });

   }

  speak(text: string) {  
    if(this.synth?.speaking)
      this.synth?.cancel();
    
    if (text !== "") {
      const utterThis = new (window as any).SpeechSynthesisUtterance(text);

      utterThis.addEventListener('boundary', (ev: any) => this.speechUtteranceBoundaryEvent(ev));
      utterThis.addEventListener('end', (ev: any) => this.speechUtteranceEndEvent(ev));
      utterThis.addEventListener('error', (ev: any) => this.speechUtteranceErrorEvent(ev));
      utterThis.addEventListener('mark', (ev: any) => this.speechUtteranceMarkEvent(ev));
      utterThis.addEventListener('pause', (ev: any) => this.speechUtterancePauseEvent(ev));
      utterThis.addEventListener('resume', (ev: any) => this.speechUtteranceResumeEvent(ev));
      utterThis.addEventListener('start', (ev: any) => this.speechUtteranceBoundaryEvent(ev));

      const currentLang = this.speechLangService.getCurrentLang();
      if(currentLang) utterThis.voice = currentLang;
      
      this.synth.speak(utterThis);
    }
  }

  cancel() {
    this.synth.cancel();
    this.speechHighlightPointer.next({index: 0, length: 0, text: this.chatResponse});
  }

  pause() {
    this.synth.pause();
  }

  resume() {
    this.synth.resume();
  }

  speechUtteranceBoundaryEvent(event: any): void {
    const utteranceText = event.utterance.text;
    const charIndex = event.charIndex;
    const charLength = event.charLength;
    this.speechHighlightPointer.next({
      index: charIndex,
      length: charLength,
      text: utteranceText,
    });
    console.log('[Speech Utterance Event]: boundary: ', utteranceText.substring(charIndex, charIndex + charLength));
  }

  speechUtteranceEndEvent(event: any): void {
    console.log('[Speech Utterance Event]: end: ', event);
  }

  speechUtteranceErrorEvent(event: any): void {
    console.log('[Speech Utterance Event]: error: ', event);
  }

  speechUtteranceMarkEvent(event: any): void {
    console.log('[Speech Utterance Event]: mark: ', event);
  }

  speechUtterancePauseEvent(event: any): void {
    console.log('[Speech Utterance Event]: pause: ', event);
  }

  speechUtteranceResumeEvent(event: any): void {
    console.log('[Speech Utterance Event]: resume: ', event);
  }

  speechUtteranceStartEvent(event: any): void {
    console.log('[Speech Utterance Event]: start: ', event);
  }

  isSpeakingInProgress(): boolean {
    return this.synth?.speaking;
  }

  isSpeakingPaused(): boolean {
    return this.synth?.paused;
  }

  isSpeakingPending(): boolean {
    return this.synth?.pending;
  }

}
