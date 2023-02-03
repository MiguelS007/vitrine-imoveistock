import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingStep2Component } from './scheduling-step2.component';

describe('SchedulingStep2Component', () => {
  let component: SchedulingStep2Component;
  let fixture: ComponentFixture<SchedulingStep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulingStep2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedulingStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
