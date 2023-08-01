import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DEFAULT_SPEECH_LANG, SpeechLangService } from '../_services/speech-lang.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-speech-lang-select-dialog',
  templateUrl: './speech-lang-select-dialog.component.html',
  styleUrls: ['./speech-lang-select-dialog.component.scss']
})
export class SpeechLangSelectDialogComponent implements OnInit {

  selectedLang: string = DEFAULT_SPEECH_LANG;

  language: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<SpeechLangSelectDialogComponent>,
    private speechLangService: SpeechLangService
  ) {}

  ngOnInit(): void {
    this.language = this.speechLangService.getSupportedLang();
    this.setCurrentLang();
  }

  setCurrentLang() {
    const currLang = this.speechLangService.getCurrentLangCode();
    this.selectedLang = currLang;
  }

  onSpeechLangSave() {
    this.speechLangService.setSpeechLang(this.selectedLang);
    this.dialogRef.close();
  }
}
