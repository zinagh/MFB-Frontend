import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddbankAcComponent } from './addbank-ac.component';

describe('AddbankAcComponent', () => {
  let component: AddbankAcComponent;
  let fixture: ComponentFixture<AddbankAcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddbankAcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddbankAcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
