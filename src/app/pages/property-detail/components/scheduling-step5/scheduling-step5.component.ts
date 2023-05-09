import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnnouncementGetResponseDto } from 'src/app/dtos/announcement-get-response.dto';
import { ScheduleRegisterRequestDto } from 'src/app/dtos/schedule-register-request.dto';
import { ScheduleService } from 'src/app/service/schedule.service';
import { SchedulingStep6Component } from '../scheduling-step6/scheduling-step6.component';
import { LocationStrategy, PathLocationStrategy, Location } from '@angular/common';
import { AnnouncementVisitGetResponseDto } from 'src/app/dtos/announcement-visit-get-response.dto';

@Component({
  selector: 'app-scheduling-step5',
  templateUrl: './scheduling-step5.component.html',
  styleUrls: ['./scheduling-step5.component.scss'],
  providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }]
})
export class SchedulingStep5Component implements OnInit {

  dateSelected: Date;

  response: AnnouncementGetResponseDto;

  selectedScheduling: AnnouncementVisitGetResponseDto;

  typeOfAd = localStorage.getItem('typeOfAdSelect');

  dateSend: ScheduleRegisterRequestDto;

  urls: any = [];

  constructor(
    private modalService: NgbModal,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit(): void {
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
    this.modalService.dismissAll()
  }

  confirm() {
    this.scheduleService.registerSchedule(this.response._id, this.dateSend).subscribe(
      success => this.registerSuccess(success),
      error => console.error(error)
    )
  }

  registerSuccess(success: any) {
    localStorage.setItem('companionLink', location.origin + success.link);
    console.log(location.origin + success.link);

    this.modalService.dismissAll()
    this.modalService.open(SchedulingStep6Component, { centered: true, backdrop: 'static', keyboard: false });
  }
}
