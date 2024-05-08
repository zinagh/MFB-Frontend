import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateRepaymentPlansComponent } from './calculate-repayment-plans.component';

describe('CalculateRepaymentPlansComponent', () => {
  let component: CalculateRepaymentPlansComponent;
  let fixture: ComponentFixture<CalculateRepaymentPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculateRepaymentPlansComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculateRepaymentPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
