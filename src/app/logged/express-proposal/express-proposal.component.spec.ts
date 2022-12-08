import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressProposalComponent } from './express-proposal.component';

describe('ExpressProposalComponent', () => {
  let component: ExpressProposalComponent;
  let fixture: ComponentFixture<ExpressProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpressProposalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpressProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
