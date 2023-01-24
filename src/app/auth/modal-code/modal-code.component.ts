import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  codigo1;
  codigo2;
  codigo3;
  codigo4;

  codigo;

  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.form = this.formBuilder.group({
      coden1: ['', [Validators.required]],
      coden2: ['', [Validators.required]],
      coden3: ['', [Validators.required]],
      coden4: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    let phone = localStorage.getItem('phone');
    this.numberTel = phone;
    console.log(this.numberTel)
    if (this.numberTel === null) {
      this.router.navigate(['auth/insert-tel'])
    }
  }
  nextCode(item, value) {
    if (item === 'code1') {
      this.codigo1 = value.target.value;
      var nextInput = document.getElementById('code2');
      nextInput.focus();
    } else if (item === 'code2') {
      this.codigo2 = value.target.value;
      var nextInput = document.getElementById('code3');
      nextInput.focus();
    } else if (item === 'code3') {
      this.codigo3 = value.target.value;
      var nextInput = document.getElementById('code4');
      nextInput.focus();
    } else if (item === 'code4') {
      this.codigo4 = value.target.value;
      var nextInput = document.getElementById('btn-send-code');
      nextInput.focus();
    }
  }


  notSendCode(value: string){
    if(value === 'open'){
      this.notsendcodemsg = true;
    }else if(value === 'close'){
      this.notsendcodemsg = false;
    }
  }
  async confirm() {
    this.spinnerload = true;
    this.continued = false;
    this.codigo = `${this.codigo1}${this.codigo2}${this.codigo3}${this.codigo4}`;
    this.request = {
      code: parseInt(`${this.codigo}`),
      phone: this.numberTel
    }
    console.log(this.request.code);

    this.authenticationService.authenticateCodeConfirmation(this.request).subscribe(
      success => this.runAutheticateCodeConfirmation(success),
      async error => await this.runError(error),
    );
  }
  runAutheticateCodeConfirmation(success: AuthetincatedUserDto): void {

    localStorage.removeItem('phone');

    this.authenticationService.setAuthenticatedUser(
      new AuthetincatedUserDto(success.userId, success.phone, success.token, success.profileId, success.apiFunctionsId),
    );

    this.userService.getUser().subscribe(
      success => this.runGetUserSuccess(success),
      async error => this.runError(error),
    );

  }
  runGetUserSuccess(success: UserGetResponseDto): void {
    let user = JSON.stringify(success);
    localStorage.setItem('userDto', user);
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 100);
  }

  async runError(error: any) {
    this.toastrService.error('Código Inválido! ', '', { progressBar: true });
    
    this.spinnerload = false;
    this.form.setValue({ coden1: '', coden2: '', coden3: '', coden4: '' });


  }
}