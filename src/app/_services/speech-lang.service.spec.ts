import { TestBed } from '@angular/core/testing';

import { SpeechLangService } from './speech-lang.service';

describe('SpeechLangService', () => {
  let service: SpeechLangService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpeechLangService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
