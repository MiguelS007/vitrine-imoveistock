import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AnnouncementGetResponseDto } from 'src/app/dtos/announcement-get-response.dto';
import { ScheduleRegisterRequestDto } from 'src/app/dtos/schedule-register-request.dto';
import { SchedulingStep2Component } from '../scheduling-step2/scheduling-step2.component';
import { ModalLoginComponent } from 'src/app/auth/modal-login/modal-login.component';

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

  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastrService: ToastrService
  ) {
    this.form = this.formBuilder.group({
      day: ['', [Validators.required]],
      time: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    let response = localStorage.getItem('announcementOfScheduling');
    this.response = JSON.parse(response);

    for (let i = 1; i < 6; i++) {
      let hoje = new Date();
      hoje.setDate(hoje.getDate() + i);
      this.arrayDeDatas.push(hoje)
    }
  }

  selectTime(value) {
    console.log(value)
    this.horasSelecionada = value
  }

  selectDate(value) {
    this.dataSelecionada = value
  }

  confirmDisabled: boolean = true; // Variável para controlar o estado do botão confirmar

confirm() {
  const selectedDay = this.form.controls['day'].value;
  const selectedTime = this.form.controls['time'].value;

  if (!selectedDay || !selectedTime) {
    this.toastrService.error('Selecione o dia e a hora antes de confirmar.', '', { progressBar: true });
    return;
  }

  if (localStorage.getItem('user') !== null) {
    let dateFormat: Date = selectedDay;
    dateFormat.setHours(parseInt(selectedTime));
    dateFormat.setMinutes(0);
    const result = this.isValidDate(dateFormat);
    if (result === true) {
      localStorage.setItem('dateScheduling', JSON.stringify(dateFormat));
      this.modalService.dismissAll();
      this.modalService.open(SchedulingStep2Component, { centered: true, backdrop: 'static', keyboard: false });
    } else {
      this.toastrService.error('Selecione uma data válida.', '', { progressBar: true });
    }
  } else {
    this.modalService.dismissAll();
    this.modalService.open(ModalLoginComponent, { centered: true });
  }
}

checkFieldsValidity() {
  const selectedDay = this.form.controls['day'].value;
  const selectedTime = this.form.controls['time'].value;

  this.confirmDisabled = !(selectedDay && selectedTime);
}

  isValidDate(d) {
    return d instanceof Date && !isNaN(d.getTime());
  }

  exit() {
    this.modalService.dismissAll();
    localStorage.removeItem('typeOfAdSelect');
    localStorage.removeItem('typeOfAd');
  }

}
