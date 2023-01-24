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
    if (this.numberTel === null) {
      this.router.navigate(['auth/insert-tel'])
    }
  }
  gotoNextField(nextInput) {
    nextInput.setFocus();
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
    let code1 = this.form.controls['coden1'].value;
    let code2 = this.form.controls['coden2'].value;
    let code3 = this.form.controls['coden3'].value;
    let code4 = this.form.controls['coden4'].value;

    console.log(code1, code2, code3, code4);
    this.request = {
      code: parseInt(`${code1}${code2}${code3}${code4}`),
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
      this.router.navigate(['home']);
    }, 100);
  }

  async runError(error: any) {
    this.toastrService.error('Código Inválido! ', '', { progressBar: true });
    
    this.spinnerload = false;
    this.form.setValue({ coden1: '', coden2: '', coden3: '', coden4: '' });


  }
}