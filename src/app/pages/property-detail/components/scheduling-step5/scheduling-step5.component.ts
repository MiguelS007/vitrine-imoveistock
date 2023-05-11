import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnnouncementGetResponseDto } from 'src/app/dtos/announcement-get-response.dto';
import { ScheduleRegisterRequestDto } from 'src/app/dtos/schedule-register-request.dto';
import { UserGetResponseDto } from 'src/app/dtos/user-get-response.dtos';
import { ScheduleService } from 'src/app/service/schedule.service';
import { SchedulingStep6Component } from '../scheduling-step6/scheduling-step6.component';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-scheduling-step5',
  templateUrl: './scheduling-step5.component.html',
  styleUrls: ['./scheduling-step5.component.scss'],
  providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }]
})
export class SchedulingStep5Component implements OnInit {
  @Input() user: UserGetResponseDto

  dateSelected: Date;

  response: AnnouncementGetResponseDto;

  typeOfAdSelect = localStorage.getItem('typeOfAdSelect');
  typeOfAd = localStorage.getItem('typeOfAd');

  dateSend: ScheduleRegisterRequestDto;

  nameBroker = localStorage.getItem('user-broker')

  urls: string[] = [];

  constructor(
    private modalService: NgbModal,
    private scheduleService: ScheduleService,
  ) { }

  ngOnInit(): void {
    if (this.user?.photo?.location) {
      this.urls = [this.user.photo.location]
    }

    let dateSelected = localStorage.getItem('dateScheduling')
    this.dateSelected = JSON.parse(dateSelected);

    let announcementSelected = localStorage.getItem('announcementOfScheduling');
    this.response = JSON.parse(announcementSelected);


    this.dateSend = {
      visitDate: this.dateSelected,
      visitTypeOfAd: localStorage.getItem('typeOfAdSelect')
    }
  }

  exit() {
    this.modalService.dismissAll();
    localStorage.removeItem('typeOfAdSelect');
    localStorage.removeItem('typeOfAd');
  }

  confirm() {
    this.scheduleService.registerSchedule(this.response._id, this.dateSend).subscribe(
      success => this.registerSuccess(success),
      error => console.error(error)
    )
  }

  registerSuccess(success: any) {
    localStorage.setItem('companionLink', location.origin + success.link);
    localStorage.removeItem('typeOfAdSelect');
    localStorage.removeItem('typeOfAd');

    this.modalService.dismissAll()
    const modalRef = this.modalService.open(SchedulingStep6Component, { centered: true, backdrop: 'static', keyboard: false });
    modalRef.componentInstance.user = this.user
  }
}
