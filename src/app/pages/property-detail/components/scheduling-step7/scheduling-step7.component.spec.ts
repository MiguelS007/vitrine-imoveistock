import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingStep7Component } from './scheduling-step7.component';

describe('SchedulingStep7Component', () => {
  let component: SchedulingStep7Component;
  let fixture: ComponentFixture<SchedulingStep7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulingStep7Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedulingStep7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
