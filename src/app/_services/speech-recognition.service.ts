import { Injectable } from '@angular/core';
import { SpeechLangService } from './speech-lang.service';
import { BehaviorSubject, Subject } from 'rxjs';

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
  ) { 
    this.recognition.lang = this.speechLangService.getCurrentLangCode();
    this.recognition.continuous = false;
    this.recognition.interimResults = true;

    this.speechRecognitionEvents();
  }

  speechRecognitionEvents() {
    this.recognition.addEventListener('result',  (event: any) => {
      this.speechRecognitionResultRecieved$.next(event?.results?.[0]?.[0]?.transcript || '');
    });
  
    this.recognition.addEventListener('audioend', () => {
      setTimeout(() => {
        this.speechRecognitionFinished$.next(true);
        this.stopListening();
      }, 2000);
    });
  }

  startRecording() {
    this.recognition.lang = this.speechLangService.getCurrentLangCode();
    this.recognition.start();
  }

  stopListening(): void {
    this.recognition.stop();
  }

}
