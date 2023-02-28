import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsSignupComponent } from './terms-signup.component';

describe('TermsSignupComponent', () => {
  let component: TermsSignupComponent;
  let fixture: ComponentFixture<TermsSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsSignupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermsSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
