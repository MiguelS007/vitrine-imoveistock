import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditScheduling2ModalComponent } from './edit-scheduling2-modal.component';

describe('EditScheduling2ModalComponent', () => {
  let component: EditScheduling2ModalComponent;
  let fixture: ComponentFixture<EditScheduling2ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditScheduling2ModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditScheduling2ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
