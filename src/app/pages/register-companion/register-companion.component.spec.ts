import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCompanionComponent } from './register-companion.component';

describe('RegisterCompanionComponent', () => {
  let component: RegisterCompanionComponent;
  let fixture: ComponentFixture<RegisterCompanionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCompanionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterCompanionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
