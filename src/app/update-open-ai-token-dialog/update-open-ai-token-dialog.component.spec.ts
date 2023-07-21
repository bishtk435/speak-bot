import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOpenAiTokenDialogComponent } from './update-open-ai-token-dialog.component';

describe('UpdateOpenAiTokenDialogComponent', () => {
  let component: UpdateOpenAiTokenDialogComponent;
  let fixture: ComponentFixture<UpdateOpenAiTokenDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateOpenAiTokenDialogComponent]
    });
    fixture = TestBed.createComponent(UpdateOpenAiTokenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
