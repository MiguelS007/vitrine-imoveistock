import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnnouncementGetResponseDto } from '../../../../dtos/announcement-get-response.dto';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-scheduling-step3',
  templateUrl: './scheduling-step3.component.html',
  styleUrls: ['./scheduling-step3.component.scss']
})
export class SchedulingStep3Component implements OnInit {

  form: FormGroup

  dateSelected: Date;

  response: AnnouncementGetResponseDto;

  code1;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      ddd: [''],
      phone: ['']
    })
   }

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

  nextCode(item, value) {
    if (item === 'ddd') {
      this.code1 = value.target.value;
      var nextInput = document.getElementById('tel');
      for (var i = 0; i < this.code1.length; i++) {
        if (this.code1.length >= 2)
          nextInput.focus();
      }
    }
  }

}
