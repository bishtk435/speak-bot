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
      // const voices = this.synth.getVoices().sort(function (a: any, b: any) {
      //   const aname = a.name.toUpperCase();
      //   const bname = b.name.toUpperCase();
    
      //   if (aname < bname) {
      //     return -1;
      //   } else if (aname == bname) {
      //     return 0;
      //   } else {
      //     return +1;
      //   }
      // });

      // const hindiLang = voices.find((voice: any) => voice.lang === "hi-IN");

      // if(hindiLang) utterThis.voice = hindiLang;
  
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
