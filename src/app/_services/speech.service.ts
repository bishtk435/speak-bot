import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  synth = (window as any)?.speechSynthesis;

  constructor() { }

  speak(text: string) {
    if (this.synth.speaking) {
      console.error("speechthis.synthesis.speaking");
      return;
    }
  
    if (text !== "") {
      const utterThis = new (window as any).SpeechSynthesisUtterance(text);
  
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
