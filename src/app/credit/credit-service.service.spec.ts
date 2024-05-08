import { TestBed } from '@angular/core/testing';

import { CreditService } from 'src/app/credit/credit-service.service';

describe('CreditServicefService', () => {
  let service: CreditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
