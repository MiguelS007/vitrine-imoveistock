import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnnouncementGetResponseDto } from '../../../../dtos/announcement-get-response.dto';

@Component({
  selector: 'app-scheduling-step3',
  templateUrl: './scheduling-step3.component.html',
  styleUrls: ['./scheduling-step3.component.scss']
})
export class SchedulingStep3Component implements OnInit {

  dateSelected: Date;

  response: AnnouncementGetResponseDto;

  constructor(
    private modalService: NgbModal,
    private router: Router

  ) { }

  ngOnInit(): void {
    let dateSelected = localStorage.getItem('dateScheduling')
    this.dateSelected = JSON.parse(dateSelected);

    let announcementSelected = localStorage.getItem('announcementOfScheduling');
    this.response = JSON.parse(announcementSelected);
  }

  exit() {
    this.modalService.dismissAll()
  }

  goToVisits() {
    this.modalService.dismissAll()
    this.router.navigate(['logged/visits'])
  }


}
