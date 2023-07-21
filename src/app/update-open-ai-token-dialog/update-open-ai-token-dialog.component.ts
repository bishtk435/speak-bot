import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { StorageService } from '../_services/storage.service';
import { ToastMsgService } from '../_services/toast-msg.service';

@Component({
  selector: 'app-update-open-ai-token-dialog',
  templateUrl: './update-open-ai-token-dialog.component.html',
  styleUrls: ['./update-open-ai-token-dialog.component.scss']
})
export class UpdateOpenAiTokenDialogComponent implements OnInit {

  openAIToken = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<UpdateOpenAiTokenDialogComponent>,
    private storageService: StorageService,
    private toastMsgService: ToastMsgService,
  ) {}

  ngOnInit(): void {
    const openAITokenFromStorage = this.storageService.getOpenAIToken();

    if(openAITokenFromStorage) this.openAIToken.setValue(openAITokenFromStorage);
  }

  setOpenAITokenInStorage(): void {
    if(!this.openAIToken.value) {
      return;
    }
    this.storageService.setOpenAIToken(this.openAIToken.value);
    this.toastMsgService.showToastMessage('OpenAI key is successfully configured!!', 'Close', 3000);
    this.dialogRef.close();
  }
}
