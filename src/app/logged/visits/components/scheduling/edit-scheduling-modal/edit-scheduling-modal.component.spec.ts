import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSchedulingModalComponent } from './edit-scheduling-modal.component';

describe('EditSchedulingModalComponent', () => {
  let component: EditSchedulingModalComponent;
  let fixture: ComponentFixture<EditSchedulingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSchedulingModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSchedulingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
