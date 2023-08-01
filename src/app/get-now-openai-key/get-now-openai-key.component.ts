import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/env';

@Component({
  selector: 'app-get-now-openai-key',
  templateUrl: './get-now-openai-key.component.html',
  styleUrls: ['./get-now-openai-key.component.scss']
})
export class GetNowOpenaiKeyComponent {
  openAIKeyUrl: string = environment.OPEN_AI_TOKEN_URL;

  constructor(
    public dialogRef: MatDialogRef<GetNowOpenaiKeyComponent>,
  ) {}

  closeModal(): void {
    this.dialogRef.close();
  }
}
