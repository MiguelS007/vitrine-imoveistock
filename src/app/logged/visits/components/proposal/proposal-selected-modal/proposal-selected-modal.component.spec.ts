import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalSelectedModalComponent } from './proposal-selected-modal.component';

describe('ProposalSelectedModalComponent', () => {
  let component: ProposalSelectedModalComponent;
  let fixture: ComponentFixture<ProposalSelectedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProposalSelectedModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProposalSelectedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
