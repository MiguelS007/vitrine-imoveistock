import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAnnouncementModalComponent } from './view-announcement-modal.component';

describe('ViewAnnouncementModalComponent', () => {
  let component: ViewAnnouncementModalComponent;
  let fixture: ComponentFixture<ViewAnnouncementModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAnnouncementModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAnnouncementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
