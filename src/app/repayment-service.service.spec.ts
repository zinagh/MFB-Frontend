import { TestBed } from '@angular/core/testing';

import { RepaymentServiceService } from './calculate-repayment-plans/repayment-service.service';

describe('RepaymentServiceService', () => {
  let service: RepaymentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepaymentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
