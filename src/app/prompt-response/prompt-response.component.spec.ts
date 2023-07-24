import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptResponseComponent } from './prompt-response.component';

describe('PromptResponseComponent', () => {
  let component: PromptResponseComponent;
  let fixture: ComponentFixture<PromptResponseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromptResponseComponent]
    });
    fixture = TestBed.createComponent(PromptResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
