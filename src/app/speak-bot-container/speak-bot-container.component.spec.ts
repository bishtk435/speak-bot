import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakBotContainerComponent } from './speak-bot-container.component';

describe('SpeakBotContainerComponent', () => {
  let component: SpeakBotContainerComponent;
  let fixture: ComponentFixture<SpeakBotContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpeakBotContainerComponent]
    });
    fixture = TestBed.createComponent(SpeakBotContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
