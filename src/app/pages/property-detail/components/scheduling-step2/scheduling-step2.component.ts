import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnnouncementGetResponseDto } from '../../../../dtos/announcement-get-response.dto';
import { ScheduleRegisterRequestDto } from '../../../../dtos/schedule-register-request.dto';
import { ScheduleService } from '../../../../service/schedule.service';
import { SchedulingStep3Component } from '../scheduling-step3/scheduling-step3.component';

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
    private scheduleService: ScheduleService
  ) { }

  ngOnInit(): void {
    let dateSelected = localStorage.getItem('dateScheduling')
    this.dateSelected = JSON.parse(dateSelected);

    let announcementSelected = localStorage.getItem('announcementOfScheduling');
    this.response = JSON.parse(announcementSelected);

    this.dateSend = {
      visitDate: this.dateSelected
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

  registerSuccess(success) {
    this.modalService.dismissAll();
    const modalRef =  this.modalService.open(SchedulingStep3Component, { centered: true, backdrop: 'static', keyboard: false });
    modalRef.result.then(data => {
    }, error => {
      localStorage.removeItem('announcementOfScheduling');
      localStorage.removeItem('dateScheduling');
    });
  }

}
