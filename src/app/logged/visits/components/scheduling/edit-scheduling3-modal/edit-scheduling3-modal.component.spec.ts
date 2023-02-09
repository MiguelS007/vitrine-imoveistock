import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditScheduling3ModalComponent } from './edit-scheduling3-modal.component';

describe('EditScheduling3ModalComponent', () => {
  let component: EditScheduling3ModalComponent;
  let fixture: ComponentFixture<EditScheduling3ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditScheduling3ModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditScheduling3ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
