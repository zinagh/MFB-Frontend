import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesthoussemComponent } from './testhoussem.component';

describe('TesthoussemComponent', () => {
  let component: TesthoussemComponent;
  let fixture: ComponentFixture<TesthoussemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesthoussemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TesthoussemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
