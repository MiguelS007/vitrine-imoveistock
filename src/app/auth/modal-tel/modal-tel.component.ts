import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { AuthenticateRequestDto } from 'src/app/dtos/authenticate-request.dto';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DatamokService } from 'src/app/service/datamok.service';

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
    private router: Router,
    private datamokservice: DatamokService,
    // private toastrService: ToastrService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      ddd: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
  }

  async confirm() {

    this.request = {
      phone: `55${this.form.controls['ddd'].value}${this.form.controls['phone'].value}`.replace(/\D/g, '')
    }

    this.authenticationService.authenticate(this.request).subscribe(
      success => {
        this.registerSuccess()
      },
      error => {
        // this.toastrService.error('Erro ao cadastrar ', '', { progressBar: true });
        console.error(error, 'number with errors')
      }
    )
  }
  registerSuccess() {
    localStorage.setItem('phone', this.request.phone);
    // this.toastrService.success('Usuario cadastrado com sucesso', '', { progressBar: true })
    this.router.navigate(['auth/insert-code'])
  }

  nextCode(item, value) {
    if (item === 'ddd') {
      this.code1 = value.target.value;
      var nextInput = document.getElementById('tel');
      for(var i = 0; i < this.code1.length; i++) {
           if(this.code1.length >= 2)
            nextInput.focus();
      }
      // test
      console.log(this.code1.length);
    }
  }

}