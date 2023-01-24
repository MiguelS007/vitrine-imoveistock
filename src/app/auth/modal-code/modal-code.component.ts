import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthetincatedUserDto } from 'src/app/dtos/authenticated-user.dto';
import { AuthenticateCodeConfirmationRequestDto } from 'src/app/dtos/authentication-code-confirmation.dtos';
import { UserGetResponseDto } from 'src/app/dtos/user-get-response.dtos';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DatamokService } from 'src/app/service/datamok.service';
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
  notsendcodemsg = false;
  request: any = AuthenticateCodeConfirmationRequestDto;
  numberTel;

  codigo;

  codigo1: string;
  codigo2: string;
  codigo3: string;
  codigo4: string;

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

    this.numberTel = this.phone
  }
  notSendCode(value: string) {
    if (value === 'open') {
      this.notsendcodemsg = true;
    } else if (value === 'close') {
      this.notsendcodemsg = false;
    }
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

            this.userService.getUser().subscribe(
              success => {
                let user = JSON.stringify(success);
                localStorage.setItem('userDto', user);
                this.router.navigate(['/']);
                this.modalService.dismissAll()
            },
            error => {
              console.error(error)
            }
          )
        },
        async error => {
          this.toastrService.error('Erro ao confirmar codigo', '', { progressBar: true });
          this.spinnerload = false;
          this.continued = true;
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

  async runError(error: any) {
    this.toastrService.error('Código Inválido! ', '', { progressBar: true });
    
    this.spinnerload = false;
    this.form.setValue({ coden1: '', coden2: '', coden3: '', coden4: '' });


  }
}