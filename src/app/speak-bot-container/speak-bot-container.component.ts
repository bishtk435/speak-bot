import { Component } from '@angular/core';
import { fromEvent } from 'rxjs';
import { SpeechService } from '../_services/speech.service';
import { ChatGptService } from '../_services/chat-gpt.service';
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
    SpeechGrammarList: any;
    webkitSpeechGrammarList: any;
    SpeechRecognitionEvent: any;
    webkitSpeechRecognitionEvent: any;
  }
}

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

@Component({
  selector: 'app-speak-bot-container',
  templateUrl: './speak-bot-container.component.html',
  styleUrls: ['./speak-bot-container.component.scss']
})
export class SpeakBotContainerComponent {
  title = 'speak-bot';
  recognition: any = new SpeechRecognition();

  listenedMsg: string = '';
  chatGPTResponse: string = '';
  isListeningInProgress: boolean = false;

  constructor(
    public speechService: SpeechService,
    private chatGPTService: ChatGptService
  ) {
    this.recognition.lang = "en-US";
    this.recognition.continuous = false;
    this.recognition.interimResults = true;
  }

  ngOnInit() {
    this.recognition.onresult = (event: any) => {
      this.updateListenedMsg(event?.results?.[0]?.[0]?.transcript);
    };

    this.recognition.addEventListener('audioend', () => {
      setTimeout(() => {
        this.isListeningInProgress = false;
        this.stopListening();
        this.sendPromptToChatGpt();
      }, 2000);
    })
  }

  sendPromptToChatGpt() {
    this.chatGPTService.getPromptResponse(this.listenedMsg).subscribe((resp: any) => {
      this.chatGPTResponse = resp?.choices?.[0]?.message?.content;
      if (this.chatGPTResponse) {
        this.speechService.speak(this.chatGPTResponse);
      } else {
        alert('Some error while reading the response from chatGPT');
      }
    },
      (err: any) => {
        alert('Some error occured in Open API call, please check network call of the browser of more info.');
      }
    );
  }

  updateListenedMsg(msg: string) {
    this.listenedMsg = msg;
  }

  askYourQuestion(): void {
    this.isListeningInProgress = true;
    this.listenedMsg = '';
    this.recognition.start();
  }

  stopListening(): void {
    this.recognition.stop();
  }

  stopSpeaking(): void {
    this.speechService.cancel();
  }
}
