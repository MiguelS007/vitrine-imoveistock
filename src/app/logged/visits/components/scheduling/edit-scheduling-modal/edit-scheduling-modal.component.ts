import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ScheduleRegisterResponseDto } from '../../../../../dtos/schedule-register-response.dto';
import { EditScheduling2ModalComponent } from '../edit-scheduling2-modal/edit-scheduling2-modal.component';

@Component({
  selector: 'app-edit-scheduling-modal',
  templateUrl: './edit-scheduling-modal.component.html',
  styleUrls: ['./edit-scheduling-modal.component.scss']
})
export class EditSchedulingModalComponent implements OnInit {
  form: FormGroup;

  horasSelecionada;

  dataSelecionada;

  response: ScheduleRegisterResponseDto;

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
    let response = localStorage.getItem('announcementSelected');
    this.response = JSON.parse(response);

    console.log(this.response)

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

  confirm() {
    let dateFormat: Date = this.form.controls['day'].value;
    dateFormat.setHours(parseInt(this.form.controls['time'].value));
    dateFormat.setMinutes(0);
    const result = this.isValidDate(dateFormat)
    if (result === true) {
      localStorage.setItem('dateScheduling', JSON.stringify(dateFormat));
      this.modalService.dismissAll()
    } else {
      this.toastrService.error('Selecione uma data valida', '', { progressBar: true })
    }
  }
  isValidDate(d) {
    return d instanceof Date && !isNaN(d.getTime());
  }

  exit() {
    this.modalService.dismissAll()
  }

}
