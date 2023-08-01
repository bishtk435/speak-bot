import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SpeakBotContainerComponent } from './speak-bot-container/speak-bot-container.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdateOpenAiTokenDialogComponent } from './update-open-ai-token-dialog/update-open-ai-token-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PromptResponseComponent } from './prompt-response/prompt-response.component';
import { MatSelectModule } from '@angular/material/select';
import { SpeechLangSelectDialogComponent } from './speech-lang-select-dialog/speech-lang-select-dialog.component';
import { GetNowOpenaiKeyComponent } from './get-now-openai-key/get-now-openai-key.component';
import { ChatResponsePipe } from './_pipes/chat-response.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SpeakBotContainerComponent,
    UpdateOpenAiTokenDialogComponent,
    PromptResponseComponent,
    SpeechLangSelectDialogComponent,
    GetNowOpenaiKeyComponent,
    ChatResponsePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
