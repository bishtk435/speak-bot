import { Injectable } from '@angular/core';
import { SpeechLangService } from './speech-lang.service';
import { Subject } from 'rxjs';
import { SpeechSynthesisService } from './speech-synthesis.service';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;


@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {

  recognition: any = new SpeechRecognition();
  speechRecognitionResultRecieved$: Subject<string> = new Subject();
  speechRecognitionFinished$: Subject<boolean> = new Subject();

  constructor(
    private speechLangService: SpeechLangService,
    private speechSynthesisService: SpeechSynthesisService,
  ) {
    this.recognition.lang = this.speechLangService.getCurrentLangCode();
    this.recognition.continuous = false;
    this.recognition.interimResults = true;

    this.speechRecognitionEvents();
  }

  speechRecognitionEvents() {
    this.recognition.addEventListener('audioend', (event: any) => {
      console.log('[Audio Recognition Event]: audioend: ', event);
      setTimeout(() => {
        this.speechRecognitionFinished$.next(true);
      }, 2000);
    });

    this.recognition.addEventListener('audiostart', (event: any) => {
      console.log('[Audio Recognition Event]: audiostart: ', event);
    });

    this.recognition.addEventListener('end', (event: any) => {
      console.log('[Audio Recognition Event]: end: ', event);
    });

    this.recognition.addEventListener('error', (event: any) => {
      console.log('[Audio Recognition Event]: error: ', event);
    });

    this.recognition.addEventListener('nomatch', (event: any) => {
      console.log('[Audio Recognition Event]: nomatch: ', event);
    });

    this.recognition.addEventListener('result',  (event: any) => {
      console.log('[Audio Recognition Event]: result: ', event);
      this.speechRecognitionResultRecieved$.next(event?.results?.[0]?.[0]?.transcript || '');
    });


    this.recognition.addEventListener('soundend', (event: any) => {
      console.log('[Audio Recognition Event]: soundend: ', event);
    });

    this.recognition.addEventListener('soundstart', (event: any) => {
      console.log('[Audio Recognition Event]: soundstart: ', event);
    });

    this.recognition.addEventListener('speechend', (event: any) => {
      console.log('[Audio Recognition Event]: speechend: ', event);
    });

    this.recognition.addEventListener('speechstart', (event: any) => {
      console.log('[Audio Recognition Event]: speechstart: ', event);
    });

    this.recognition.addEventListener('start', (event: any) => {
      console.log('[Audio Recognition Event]: start: ', event);
    });

  }

  startRecording() {
    this.recognition.lang = this.speechLangService.getCurrentLangCode();

    if(this.speechSynthesisService.isSpeakingInProgress())
      this.speechSynthesisService.pause();

    this.recognition.start();
  }

  stopListening(): void {
    this.recognition.stop();
  }

}
