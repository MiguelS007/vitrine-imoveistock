import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ScheduleRegisterRequestDto } from '../../../../../dtos/schedule-register-request.dto';
import { ScheduleRegisterResponseDto } from '../../../../../dtos/schedule-register-response.dto';
import { SchedulingStep3Component } from '../../../../../pages/property-detail/components/scheduling-step3/scheduling-step3.component';
import { ScheduleService } from '../../../../../service/schedule.service';
import { EditScheduling3ModalComponent } from '../edit-scheduling3-modal/edit-scheduling3-modal.component';

@Component({
  selector: 'app-edit-scheduling2-modal',
  templateUrl: './edit-scheduling2-modal.component.html',
  styleUrls: ['./edit-scheduling2-modal.component.scss']
})
export class EditScheduling2ModalComponent implements OnInit {

  dateSelected: Date;

  response: ScheduleRegisterResponseDto;

  dateSend: ScheduleRegisterRequestDto;

  constructor(
    private modalService: NgbModal,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit(): void {
    let dateSelected = localStorage.getItem('dateScheduling')
    this.dateSelected = JSON.parse(dateSelected);

    let announcementSelected = localStorage.getItem('announcementSelected');
    this.response = JSON.parse(announcementSelected);

    this.dateSend = {
      visitDate: this.dateSelected
    }
  }

  exit() {
    this.modalService.dismissAll()
  }

  confirm() {
    this.scheduleService.reschedule(this.response._id, this.dateSend).subscribe(
      success => this.registerSuccess(success),
      error => console.error(error)
    )
  }

  registerSuccess(success) {
    this.modalService.dismissAll();
  }

}
