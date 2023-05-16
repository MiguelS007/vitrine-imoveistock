import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingStep5Component } from './scheduling-step5.component';

describe('SchedulingStep5Component', () => {
  let component: SchedulingStep5Component;
  let fixture: ComponentFixture<SchedulingStep5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulingStep5Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedulingStep5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
