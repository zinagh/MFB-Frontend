import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddinternationalTransferComponent } from './addinternational-transfer.component';

describe('AddinternationalTransferComponent', () => {
  let component: AddinternationalTransferComponent;
  let fixture: ComponentFixture<AddinternationalTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddinternationalTransferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddinternationalTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
