import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCreditComponent } from './modify-credit.component';

describe('ModifyCreditComponent', () => {
  let component: ModifyCreditComponent;
  let fixture: ComponentFixture<ModifyCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyCreditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
