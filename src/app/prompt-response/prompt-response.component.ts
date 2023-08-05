import { Component, Input, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { SpeechSynthesisService } from '../_services/speech-synthesis.service';
import { SpeechTextHighlightPointer } from '../_models/models';
import { ChatGptService, ResponseStatus } from '../_services/chat-gpt.service';

@Component({
  selector: 'app-prompt-response',
  templateUrl: './prompt-response.component.html',
  styleUrls: ['./prompt-response.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PromptResponseComponent implements OnInit {
  @Input()
  promptResponse: string = '';

  get isResponsePlaying(): boolean {
    return this.speechSynthesisService.isSpeakingInProgress();
  }

  get isResponsePlayingPaused(): boolean {
    return this.speechSynthesisService.isSpeakingPaused();
  }

  get isChatResponseInProgress(): boolean {
    return this.chatGPTService.currentChatResponseStatus === ResponseStatus.INPROGRESS;
  }

  highLightPointer: SpeechTextHighlightPointer = {index: 0, length: 0, text: ''};

  constructor(
    private speechSynthesisService: SpeechSynthesisService,
    private chatGPTService: ChatGptService,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if(
      changes &&
      changes['promptResponse'] &&
      changes['promptResponse'].previousValue !== changes['promptResponse'].currentValue
    ) {
      this.highLightPointer = {index: 0, length: 0, text: changes['promptResponse'].currentValue};
    }
  }

  ngOnInit(): void {
    this.speechSynthesisService.speechHighlightPointer.subscribe((pointer: SpeechTextHighlightPointer) => {
      this.highLightPointer = {...pointer};
    });
  }

  startPlaying() {
    if(this.isResponsePlayingPaused) this.speechSynthesisService.resume();
    else this.speechSynthesisService.speak(this.speechSynthesisService.chatResponse);
  }

  pausePlaying() {
    if(this.isResponsePlaying)
      this.speechSynthesisService.pause();
  }

  resetPlaying() {
    this.speechSynthesisService.cancel();
  }
}
