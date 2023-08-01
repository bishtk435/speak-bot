import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetNowOpenaiKeyComponent } from './get-now-openai-key.component';

describe('GetNowOpenaiKeyComponent', () => {
  let component: GetNowOpenaiKeyComponent;
  let fixture: ComponentFixture<GetNowOpenaiKeyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetNowOpenaiKeyComponent]
    });
    fixture = TestBed.createComponent(GetNowOpenaiKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
