import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserGetResponseDto } from '../../../../dtos/user-get-response.dtos';
import { SchedulingStep5Component } from '../scheduling-step5/scheduling-step5.component';
import { ScheduleService } from 'src/app/service/schedule.service';
import { AnnouncementGetResponseDto } from 'src/app/dtos/announcement-get-response.dto';
import { ScheduleRegisterRequestDto } from 'src/app/dtos/schedule-register-request.dto';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-scheduling-step4',
  templateUrl: './scheduling-step4.component.html',
  styleUrls: ['./scheduling-step4.component.scss']
})
export class SchedulingStep4Component implements OnInit {
  @Input() user: UserGetResponseDto

  urls: string[] = [];

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
    if (this.user?.photo?.location) {
      this.urls = [this.user.photo.location]
    }

    let dateSelected = localStorage.getItem('dateScheduling')
    this.dateSelected = JSON.parse(dateSelected);

    let announcementSelected = localStorage.getItem('announcementOfScheduling');
    this.response = JSON.parse(announcementSelected);


    this.dateSend = {
      visitDate: this.dateSelected,
      visitTypeOfAd: localStorage.getItem('typeOfAdSelect'),
      userBrokerPartnerId: this.user._id
    }
  }

  exit() {
    this.modalService.dismissAll();
    localStorage.removeItem('typeOfAdSelect');
    localStorage.removeItem('typeOfAd');
  }

  confirmRegister() {
    this.ngxSpinnerService.show();
    this.scheduleService.registerSchedule(this.response._id, this.dateSend).subscribe(
      success => this.registerSuccess(success),
      error => this.registerFailed(error)
    )
  }

  registerSuccess(success: any) {
    this.ngxSpinnerService.hide();
    localStorage.setItem('companionLink', location.origin + success.link);

    this.modalService.dismissAll();
    const modalRef = this.modalService.open(SchedulingStep5Component, { centered: true, backdrop: 'static', keyboard: false });
    modalRef.componentInstance.visit = success.result
  }

  registerFailed(error: any) {
    this.ngxSpinnerService.hide();

    this.toastrService.error('Você já possui uma visita para este imóvel agendada!', '', { progressBar: true })
    console.error(error)
  }

}
