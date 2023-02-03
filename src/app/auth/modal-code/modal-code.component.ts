import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthetincatedUserDto } from 'src/app/dtos/authenticated-user.dto';
import { AuthenticateCodeConfirmationRequestDto } from 'src/app/dtos/authentication-code-confirmation.dtos';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-modal-code',
  templateUrl: './modal-code.component.html',
  styleUrls: ['./modal-code.component.scss']
})
export class ModalCodeComponent implements OnInit {

  form: FormGroup;
  phone: string = '';
  spinnerload = false;
  continued = true;

  request: any = AuthenticateCodeConfirmationRequestDto;
  numberTel;

  codigo;

  codigo1: string;
  codigo2: string;
  codigo3: string;
  codigo4: string;

  counterdown: any;
  notsendcodemsg = false;
  resendcode = false;
  msgkeepcalm = true;
  codereceived = 'Não recebi o código';

  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private modalService: NgbModal
  ) {
    this.form = this.formBuilder.group({
      code1: ['', [Validators.required]],
      code2: ['', [Validators.required]],
      code3: ['', [Validators.required]],
      code4: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.phone = localStorage.getItem('phone');
    if (this.phone === null) {
      this.modalService.dismissAll()
    }
    this.numberTel = this.phone;
    this.timer(1);

  }


  timer(minute) {
    this.codereceived = 'Reenviar código';
    this.resendcode = false;
    this.msgkeepcalm = true;
    let seconds: number = minute * 120;
    let textSec: any = "0";
    let statSec: number = 60;
    const prefix = minute < 10 ? "0" : "";
    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;
      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;
      this.counterdown = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;
      if (seconds == 0) {
        this.resendcode = true;
        this.msgkeepcalm = false;
        clearInterval(timer);
      }
    }, 1000);
  }
  async confirm() {
    this.spinnerload = true;
    this.continued = false;
    this.request = {
      code: `${this.form.controls['code1'].value}${this.form.controls['code2'].value}${this.form.controls['code3'].value}${this.form.controls['code4'].value}`,
      phone: this.phone
    }
    this.authenticationService.authenticateCodeConfirmation(this.request).subscribe(
      async success => {
        localStorage.removeItem('phone');

        this.authenticationService.setAuthenticatedUser(
          new AuthetincatedUserDto(success.userId, success.phone, success.token, success.profileId, success.apiFunctionsId),
        );
        this.authenticationService.logged.next(true)
        this.userService.getUser().subscribe(
          success => {
            let user = JSON.stringify(success);
            localStorage.setItem('userDto', user);
            this.modalService.dismissAll()
          },
          error => {

            console.error(error)
          }
        )
      },
      async error => {
        this.toastrService.error('Erro codigo Inválido', '', { progressBar: true });
        this.spinnerload = false;
        this.continued = true;
        this.form.controls['code1'].setValue('');
        this.form.controls['code2'].setValue('');
        this.form.controls['code3'].setValue('');
        this.form.controls['code4'].setValue('');
      }
    )
  }

  onDigitInput(event: any, item) {

    let digito = event.target.value
    if (item === 'code1') {
      this.codigo1 = digito;
      var nextInput = document.getElementById('code2');
      nextInput.focus();
    } else if (item === 'code2') {
      this.codigo2 = digito;
      var nextInput = document.getElementById('code3');
      nextInput.focus();
    } else if (item === 'code3') {
      this.codigo3 = digito;
      var nextInput = document.getElementById('code4');
      nextInput.focus();
    } else if (item === 'code4') {
      this.codigo4 = digito;
      var nextInput = document.getElementById('btn-send-code');
      nextInput.focus();
    }
  }


}