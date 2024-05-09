import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfeeComponent } from './addfee.component';

describe('AddfeeComponent', () => {
  let component: AddfeeComponent;
  let fixture: ComponentFixture<AddfeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddfeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddfeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
