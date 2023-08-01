import { Component, OnInit } from '@angular/core';
import { SpeechSynthesisService } from '../_services/speech-synthesis.service';
import { ChatGptService } from '../_services/chat-gpt.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateOpenAiTokenDialogComponent } from '../update-open-ai-token-dialog/update-open-ai-token-dialog.component';
import { SpeechLangSelectDialogComponent } from '../speech-lang-select-dialog/speech-lang-select-dialog.component';
import { SpeechRecognitionService } from '../_services/speech-recognition.service';
import { ToastMsgService } from '../_services/toast-msg.service';
import { StorageService } from '../_services/storage.service';
import { GetNowOpenaiKeyComponent } from '../get-now-openai-key/get-now-openai-key.component';

@Component({
  selector: 'app-speak-bot-container',
  templateUrl: './speak-bot-container.component.html',
  styleUrls: ['./speak-bot-container.component.scss']
})
export class SpeakBotContainerComponent implements OnInit {
  title = 'speak-bot';

  listenedMsg: string = '';
  chatGPTResponse: string = '';
  isListeningInProgress: boolean = false;
  isPromptFirstResp: boolean = false;

  constructor(
    private speechRecognitionService: SpeechRecognitionService,
    private speechService: SpeechSynthesisService,
    private chatGPTService: ChatGptService,
    private dialog: MatDialog,
    private toasterMsgService: ToastMsgService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.subscribeToEvents();
  }

  subscribeToEvents() {

    this.speechRecognitionService.speechRecognitionResultRecieved$.subscribe((msg: string) => {
      this.updateListenedMsg(msg);
    });

    this.speechRecognitionService.speechRecognitionFinished$.subscribe(() => {
      this.isListeningInProgress = false;
      this.sendPromptToChatGpt();
    });

    this.chatGPTService.updateResponse$.subscribe((resp: string) => {
      if(this.isPromptFirstResp) {
        this.chatGPTResponse = '';
        this.isPromptFirstResp = false;
      }

      if(resp && typeof resp === 'string')
        this.chatGPTResponse += resp;
    });

    this.chatGPTService.chatCompletionComplete$.subscribe((isCompleted: boolean) => {
      if(isCompleted)
        this.speechService.speak(this.chatGPTResponse);
    });
  }

  sendPromptToChatGpt() {
    this.isPromptFirstResp = true;

    if(this.listenedMsg)
      this.chatGPTService.getPromptResponse(this.listenedMsg);
    else 
      this.toasterMsgService.showToastMessage(
        'Empty prompt are not allowed',
        'Close',
        3000
      )
  }

  updateListenedMsg(msg: string) {
    this.listenedMsg = msg;
  }

  askYourQuestion(): void {
    if(!this.storageService.getOpenAIToken()) {
      this.dialog.open(GetNowOpenaiKeyComponent);
      return;
    }
    this.isListeningInProgress = true;
    this.listenedMsg = '';
    this.speechRecognitionService.startRecording();
  }

  changeLanguage(): void {
    this.dialog.open(SpeechLangSelectDialogComponent, {
      data: {
        hasBackdrop: false,
        disableClose: true,
      },
    });
  }

  openDialog(): void {
    this.dialog.open(UpdateOpenAiTokenDialogComponent, {
      data: {
        hasBackdrop: false,
        disableClose: true,
      },
    });
  }
}
