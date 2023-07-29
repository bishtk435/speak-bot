import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechLangSelectDialogComponent } from './speech-lang-select-dialog.component';

describe('SpeechLangSelectDialogComponent', () => {
  let component: SpeechLangSelectDialogComponent;
  let fixture: ComponentFixture<SpeechLangSelectDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpeechLangSelectDialogComponent]
    });
    fixture = TestBed.createComponent(SpeechLangSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
