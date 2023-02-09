import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalCancelModalComponent } from './proposal-cancel-modal.component';

describe('ProposalCancelModalComponent', () => {
  let component: ProposalCancelModalComponent;
  let fixture: ComponentFixture<ProposalCancelModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProposalCancelModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProposalCancelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
