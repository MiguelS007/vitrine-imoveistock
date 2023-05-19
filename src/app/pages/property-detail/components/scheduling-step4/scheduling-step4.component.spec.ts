import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingStep4Component } from './scheduling-step4.component';

describe('SchedulingStep4Component', () => {
  let component: SchedulingStep4Component;
  let fixture: ComponentFixture<SchedulingStep4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulingStep4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedulingStep4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
