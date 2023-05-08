import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnnouncementGetResponseDto } from 'src/app/dtos/announcement-get-response.dto';
import { ScheduleRegisterRequestDto } from 'src/app/dtos/schedule-register-request.dto';
import { ScheduleService } from 'src/app/service/schedule.service';

@Component({
  selector: 'app-scheduling-step7',
  templateUrl: './scheduling-step7.component.html',
  styleUrls: ['./scheduling-step7.component.scss']
})
export class SchedulingStep7Component implements OnInit {

  dateSelected: Date;

  response: AnnouncementGetResponseDto;

  dateSend: ScheduleRegisterRequestDto;

  constructor(
    private modalService: NgbModal,
    private router: Router,
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
  }

  goToVisits() {
    this.modalService.dismissAll();
    this.router.navigate(['logged/visits'])
    localStorage.removeItem('dateScheduling');
    localStorage.removeItem('announcementOfScheduling');
  }
}
