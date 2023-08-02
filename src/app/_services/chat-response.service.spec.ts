import { TestBed } from '@angular/core/testing';

import { ChatResponseService } from './chat-response.service';

describe('ChatResponseService', () => {
  let service: ChatResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
