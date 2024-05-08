import { TestBed } from '@angular/core/testing';

import { RepaymentPlanServiceService } from './repayment-plan/repayment-plan-service.service';

describe('RepaymentPlanServiceService', () => {
  let service: RepaymentPlanServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepaymentPlanServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
