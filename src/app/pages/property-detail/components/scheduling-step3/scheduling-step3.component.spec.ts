import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingStep3Component } from './scheduling-step3.component';

describe('SchedulingStep3Component', () => {
  let component: SchedulingStep3Component;
  let fixture: ComponentFixture<SchedulingStep3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulingStep3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedulingStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
