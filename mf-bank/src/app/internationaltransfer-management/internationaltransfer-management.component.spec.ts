import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationaltransferManagementComponent } from './internationaltransfer-management.component';

describe('InternationaltransferManagementComponent', () => {
  let component: InternationaltransferManagementComponent;
  let fixture: ComponentFixture<InternationaltransferManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternationaltransferManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternationaltransferManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
