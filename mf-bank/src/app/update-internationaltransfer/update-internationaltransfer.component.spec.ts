import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInternationaltransferComponent } from './update-internationaltransfer.component';

describe('UpdateInternationaltransferComponent', () => {
  let component: UpdateInternationaltransferComponent;
  let fixture: ComponentFixture<UpdateInternationaltransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateInternationaltransferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateInternationaltransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
