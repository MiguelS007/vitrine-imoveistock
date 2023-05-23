import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnnouncementGetResponseDto } from '../../../../dtos/announcement-get-response.dto';
import { ScheduleRegisterRequestDto } from '../../../../dtos/schedule-register-request.dto';
import { SchedulingStep3Component } from '../scheduling-step3/scheduling-step3.component';
import { SchedulingStep5Component } from '../scheduling-step5/scheduling-step5.component';
import { ScheduleService } from 'src/app/service/schedule.service';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-scheduling-step2',
  templateUrl: './scheduling-step2.component.html',
  styleUrls: ['./scheduling-step2.component.scss'],
  providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }]
})
export class SchedulingStep2Component implements OnInit {

  dateSelected: Date;

  response: AnnouncementGetResponseDto;

  dateSend: ScheduleRegisterRequestDto;

  constructor(
    private modalService: NgbModal,
    private scheduleService: ScheduleService,
    private ngxSpinnerService: NgxSpinnerService,
    private toastrService: ToastrService
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
    this.modalService.dismissAll();
    localStorage.removeItem('typeOfAdSelect');
    localStorage.removeItem('typeOfAd');
  }


  yesHaveBroker() {
    this.modalService.dismissAll();
    this.modalService.open(SchedulingStep3Component, { centered: true, backdrop: 'static', keyboard: false });
  }

  confirmRegister() {
    this.ngxSpinnerService.show();
    this.scheduleService.registerSchedule(this.response._id, this.dateSend).subscribe(
      success => this.registerSuccess(success),
      error => this.runError(error)
    )
  }

  runError(error) {
    this.toastrService.error(`${error.error.errors}`, '', { progressBar: true });
    this.modalService.dismissAll();
    this.ngxSpinnerService.hide();
  }

  registerSuccess(success: any) {
    this.ngxSpinnerService.hide();

    localStorage.setItem('companionLink', location.origin + success.link);

    this.modalService.dismissAll();
    const modalRef = this.modalService.open(SchedulingStep5Component, { centered: true, backdrop: 'static', keyboard: false });
    modalRef.componentInstance.visit = success.result
  }

}
