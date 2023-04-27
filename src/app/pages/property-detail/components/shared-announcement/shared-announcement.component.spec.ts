import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedAnnouncementComponent } from './shared-announcement.component';

describe('SharedAnnouncementComponent', () => {
  let component: SharedAnnouncementComponent;
  let fixture: ComponentFixture<SharedAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedAnnouncementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
