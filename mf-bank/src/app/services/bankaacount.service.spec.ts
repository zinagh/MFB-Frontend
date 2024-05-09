import { TestBed } from '@angular/core/testing';

import { BankaacountService } from './bankaacount.service';

describe('BankaacountService', () => {
  let service: BankaacountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankaacountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
