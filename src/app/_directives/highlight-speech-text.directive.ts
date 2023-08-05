import { AfterViewChecked, Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SpeechTextHighlightPointer } from '../_models/models';
import { SpeechSynthesisService } from '../_services/speech-synthesis.service';

@Directive({
  selector: '[appHighlightSpeechText]'
})
export class HighlightSpeechTextDirective implements OnChanges {

  @Input()
  appHighlightSpeechText: SpeechTextHighlightPointer = {index: 0, length: 0, text: ''};
  
  constructor(
    private el: ElementRef,
    private speechSynthesisService: SpeechSynthesisService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(
      changes &&
      changes['appHighlightSpeechText']
    ){
      this.updateResponse(this.appHighlightSpeechText);
    }
  }

  updateResponse(highlightPointer: SpeechTextHighlightPointer) {
    const args = highlightPointer;
    let value = args?.text;
    if(args){
      const { index, length }  = args as SpeechTextHighlightPointer;
      if(typeof value === 'string' && this.speechSynthesisService.isSpeakingInProgress()) {
        const replacementString = 
          value.length !== index + 1 ? `<span class="highlight-text">${value.slice(index, index + length)}</span>` : value.slice(index, index + length);
        const beforeSubstring = value.slice(0, index);
        const afterSubstring = value.slice(index + length);
        
        const newString = beforeSubstring + replacementString + afterSubstring;
        value = newString;
      }
    }
    this.el.nativeElement.innerHTML = value.replaceAll('\n', '<br>');
  }

}
