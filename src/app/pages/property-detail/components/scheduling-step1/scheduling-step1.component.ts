import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnnouncementGetResponseDto } from 'src/app/dtos/announcement-get-response.dto';
import { ScheduleRegisterRequestDto } from 'src/app/dtos/schedule-register-request.dto';

@Component({
  selector: 'app-scheduling-step1',
  templateUrl: './scheduling-step1.component.html',
  styleUrls: ['./scheduling-step1.component.scss']
})
export class SchedulingStep1Component implements OnInit {
  form: FormGroup;

  horasSelecionada;

  dataSelecionada;

  response: AnnouncementGetResponseDto;

  arrayDeDatas: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    this.form = this.formBuilder.group({
      day: ['', [Validators.required]],
      time: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    let response = localStorage.getItem('announcementOfScheduling')
    this.response = JSON.parse(response)
  }

  selectTime(value) {
    console.log(value)
    this.horasSelecionada = value
  }

  selectDate(value) {
    this.dataSelecionada = value
  }

  confirm() {

  }

  exit() {
    this.modalService.dismissAll()
  }

}
