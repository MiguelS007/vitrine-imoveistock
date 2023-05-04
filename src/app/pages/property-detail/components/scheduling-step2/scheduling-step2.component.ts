import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnnouncementGetResponseDto } from '../../../../dtos/announcement-get-response.dto';
import { ScheduleRegisterRequestDto } from '../../../../dtos/schedule-register-request.dto';
import { SchedulingStep3Component } from '../scheduling-step3/scheduling-step3.component';
import { SchedulingStep5Component } from '../scheduling-step5/scheduling-step5.component';

@Component({
  selector: 'app-scheduling-step2',
  templateUrl: './scheduling-step2.component.html',
  styleUrls: ['./scheduling-step2.component.scss']
})
export class SchedulingStep2Component implements OnInit {

  dateSelected: Date;

  response: AnnouncementGetResponseDto;

  dateSend: ScheduleRegisterRequestDto;

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
  }

  exit() {
    this.modalService.dismissAll();
  }


  yesHaveBroker(){
    this.modalService.dismissAll();
    this.modalService.open(SchedulingStep3Component, { centered: true, backdrop: 'static', keyboard: false});
  }
  noHaveBroker(){
    this.modalService.dismissAll();
    this.modalService.open(SchedulingStep5Component, { centered: true, backdrop: 'static', keyboard: false});
  }

}
