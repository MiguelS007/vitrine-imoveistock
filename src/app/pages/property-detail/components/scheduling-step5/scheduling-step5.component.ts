import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnnouncementVisitGetResponseDto } from 'src/app/dtos/announcement-visit-get-response.dto';
import { ScheduleRegisterRequestDto } from 'src/app/dtos/schedule-register-request.dto';
import { SchedulingStep6Component } from '../scheduling-step6/scheduling-step6.component';

@Component({
  selector: 'app-scheduling-step5',
  templateUrl: './scheduling-step5.component.html',
  styleUrls: ['./scheduling-step5.component.scss'],
  providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }]
})
export class SchedulingStep5Component implements OnInit {
  @Input() visit: AnnouncementVisitGetResponseDto

  dateSelected: Date;

  typeOfAdSelect = localStorage.getItem('typeOfAdSelect');
  typeOfAd = localStorage.getItem('typeOfAd');

  dateSend: ScheduleRegisterRequestDto;

  nameBroker = localStorage.getItem('user-broker')

  urls: string[] = [];

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    if (this.visit?.userBrokerPartner?.photo?.location) {
      this.urls = [this.visit.userBrokerPartner.photo.location]
    }

    let dateSelected = localStorage.getItem('dateScheduling')
    this.dateSelected = JSON.parse(dateSelected);


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
    this.modalService.dismissAll()
    const modalRef = this.modalService.open(SchedulingStep6Component, { centered: true, backdrop: 'static', keyboard: false });
    modalRef.componentInstance.user = this.visit.userBrokerPartner
    modalRef.componentInstance.user_broker = this.visit.user_broker
  }
}
