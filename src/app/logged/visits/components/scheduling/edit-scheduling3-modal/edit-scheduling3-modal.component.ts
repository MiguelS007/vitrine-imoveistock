import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ScheduleRegisterResponseDto } from '../../../../../dtos/schedule-register-response.dto';

@Component({
  selector: 'app-edit-scheduling3-modal',
  templateUrl: './edit-scheduling3-modal.component.html',
  styleUrls: ['./edit-scheduling3-modal.component.scss']
})
export class EditScheduling3ModalComponent implements OnInit {

  dateSelected: Date;

  response: ScheduleRegisterResponseDto;

  constructor(
    private modalService: NgbModal,
    private router: Router

  ) { }

  ngOnInit(): void {
    let dateSelected = localStorage.getItem('dateScheduling')
    this.dateSelected = JSON.parse(dateSelected);

    let announcementSelected = localStorage.getItem('announcementSelected');
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
