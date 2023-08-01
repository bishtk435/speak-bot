import { Injectable } from '@angular/core';
import { SpeechLangService } from './speech-lang.service';

@Injectable({
  providedIn: 'root'
})
export class SpeechSynthesisService {

  synth = (window as any)?.speechSynthesis;

  constructor(
    private speechLangService: SpeechLangService,
  ) {
     this.cancel();
   }

  speak(text: string) {  
    if(this.synth?.speaking)
      this.synth?.cancel();
    
    if (text !== "") {
      const utterThis = new (window as any).SpeechSynthesisUtterance(text);

      const currentLang = this.speechLangService.getCurrentLang();
      if(currentLang) utterThis.voice = currentLang;
      
      this.synth.speak(utterThis);
    }
  }

  cancel() {
    this.synth.cancel();
  }

  pause() {
    this.synth.pause();
  }

  isSpeakingInProgress(): boolean {
    return this.synth?.speaking;
  }

  isSpeakingPaused(): boolean {
    return this.synth?.paused;
  }
}
