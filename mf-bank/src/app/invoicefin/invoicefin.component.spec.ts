import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicefinComponent } from './invoicefin.component';

describe('InvoicefinComponent', () => {
  let component: InvoicefinComponent;
  let fixture: ComponentFixture<InvoicefinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicefinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicefinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
