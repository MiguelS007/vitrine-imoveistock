import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingSelectedModalComponent } from './scheduling-selected-modal.component';

describe('SchedulingSelectedModalComponent', () => {
  let component: SchedulingSelectedModalComponent;
  let fixture: ComponentFixture<SchedulingSelectedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulingSelectedModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedulingSelectedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
