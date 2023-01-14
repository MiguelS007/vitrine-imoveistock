import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { AuthetincatedUserDto } from 'src/app/dtos/authenticated-user.dto';
import { AuthenticateCodeConfirmationRequestDto } from 'src/app/dtos/authentication-code-confirmation.dtos';
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
  notsendcodemsg = false;
  request: any = AuthenticateCodeConfirmationRequestDto;

  constructor(
    private router: Router,
    // private toastrService: ToastrService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private userService: UserService
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
    console.log(this.phone);
    if (this.phone === null) {
      this.router.navigate(['auth/sign-in']);
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
              this.router.navigate(['home']);
          },
          error => {
            console.error(error)
          }
        )
      },
      async error => {
        // this.toastrService.error('Erro ao cadastrar ', '', { progressBar: true });
        console.error(error, this.request)
      }
    )
  }
  onDigitInput(event: any) {
    let element;
    if (event.code !== 'Backspace')
      element = event.srcElement.nextElementSibling;

    if (event.code === 'Backspace')
      element = event.srcElement.previousElementSibling;

    if (element == null)
      return;
    else
      element.focus();
  }

}