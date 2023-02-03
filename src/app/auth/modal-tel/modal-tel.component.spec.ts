import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTelComponent } from './modal-tel.component';

describe('ModalTelComponent', () => {
  let component: ModalTelComponent;
  let fixture: ComponentFixture<ModalTelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalTelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
