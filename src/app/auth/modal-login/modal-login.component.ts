import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { DatamokService } from 'src/app/service/datamok.service';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss']
})
export class ModalLoginComponent implements OnInit {

  form: FormGroup;
  // request: any = AuthenticateRequestDto;
  modallogin = true;
  modalsign = true;
  modalsignin1 = true;
  modalsignin2 = false;
  modalsignin3 = false;
  modalsignup1 = false;
  constructor(
    private router: Router,
    private datamokservice: DatamokService,
    // private toastrService: ToastrService,
    // private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      ddd: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      code: ['', [Validators.required]],
      check: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
  }

  async login(value: string) {
    if (value === 'signin') {
      this.modalsignin1 = false;
      this.modalsignin2 = true;
    } else if (value === 'sendtel') {
      this.modalsignin2 = false;
      this.modalsignin3 = true;
      // this.request = Object.assign({}, this.form.value);

      // this.authenticationService.authenticate(this.request).subscribe(
      //   success => {
      //     this.authenticationService.setAuthenticatedUser(
      //       new AuthetincatedUserDto(success.phone, success.accessToken),
      //     );
      //     this.router.navigate(['/home'])
      //   },
      //   error => {
      //     this.toastrService.error('Celular invalido', '', { progressBar: true })
      //   }
      // )
    } else if (value === 'close') {
      setTimeout(() => {
        this.datamokservice.opModalLogin();
      }, 100);
    } else if (value === 'signup') {
      this.modalsignin1 = false;
      this.modalsignup1 = true;
    }
  }
  onSubmit() {
    console.warn(this.form.value);
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