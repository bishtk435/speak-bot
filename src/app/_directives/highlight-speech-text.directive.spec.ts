import { ElementRef } from '@angular/core';
import { HighlightSpeechTextDirective } from './highlight-speech-text.directive';
import { SpeechSynthesisService } from '../_services/speech-synthesis.service';

describe('HighlightSpeechTextDirective', () => {
  it('should create an instance', () => {
    const directive = new HighlightSpeechTextDirective();
    expect(directive).toBeTruthy();
  });
});
