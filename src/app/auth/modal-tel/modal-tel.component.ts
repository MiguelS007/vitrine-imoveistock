import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticateRequestDto } from 'src/app/dtos/authenticate-request.dto';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ModalCodeComponent } from '../modal-code/modal-code.component';

@Component({
  selector: 'app-modal-tel',
  templateUrl: './modal-tel.component.html',
  styleUrls: ['./modal-tel.component.scss']
})
export class ModalTelComponent implements OnInit {

  form: FormGroup;
  code1;

  request: AuthenticateRequestDto;

  constructor(
    private modalService: NgbModal,
    private authenticationService: AuthenticationService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      ddd: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
  }

  confirm() {

    this.request = {
      phone: `55${this.form.controls['ddd'].value}${this.form.controls['phone'].value}`.replace(/\D/g, '')
    }

    this.authenticationService.authenticate(this.request).subscribe(
      success => {
        this.registerSuccess(success)
      },
      error => this.runError(error)
    )
  }

  runError(error) {
    this.toastrService.error('Erro ao enviar SMS', '', { progressBar: true })
    console.error(error)
  }

  exit() {
    this.modalService.dismissAll()
  }

  registerSuccess(success) {
    localStorage.setItem('phone', success.phone);
    this.modalService.dismissAll();
    this.modalService.open(ModalCodeComponent, { centered: true })
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