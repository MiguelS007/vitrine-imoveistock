import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingStep6Component } from './scheduling-step6.component';

describe('SchedulingStep6Component', () => {
  let component: SchedulingStep6Component;
  let fixture: ComponentFixture<SchedulingStep6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulingStep6Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedulingStep6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
