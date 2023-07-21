import { TestBed } from '@angular/core/testing';

import { ToastMsgService } from './toast-msg.service';

describe('ToastMsgService', () => {
  let service: ToastMsgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastMsgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
