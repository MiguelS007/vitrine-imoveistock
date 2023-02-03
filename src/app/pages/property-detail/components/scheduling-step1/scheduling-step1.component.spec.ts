import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingStep1Component } from './scheduling-step1.component';

describe('SchedulingStep1Component', () => {
  let component: SchedulingStep1Component;
  let fixture: ComponentFixture<SchedulingStep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulingStep1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedulingStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
