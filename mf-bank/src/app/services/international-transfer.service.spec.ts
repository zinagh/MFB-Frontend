import { TestBed } from '@angular/core/testing';

import { InternationalTransferService } from './international-transfer.service';

describe('InternationalTransferService', () => {
  let service: InternationalTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternationalTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
