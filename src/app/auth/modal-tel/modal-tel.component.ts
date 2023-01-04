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
  request: AuthenticateRequestDto | undefined;
  
  constructor(
    private router: Router,
    private datamokservice: DatamokService,
    // private toastrService: ToastrService,
    private authenticationService: AuthenticationService,
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

  async confirm() {



    this.request = {
      phone: `55${this.form.controls['phone'].value}`.replace(/\D/g, '')
    }


    this.authenticationService.authenticate(this.request).subscribe(
      success => {
        this.registerSuccess()
      },
      error => {
        // this.toastrService.error('Erro ao cadastrar ', '', { progressBar: true });
        console.error(error)
      }
    )
  }
  registerSuccess() {
    // this.toastrService.success('Usuario cadastrado com sucesso', '', { progressBar: true })
    this.router.navigate(['home'])
  }
  onSubmit() {
    console.warn(this.form.value);
  }

}