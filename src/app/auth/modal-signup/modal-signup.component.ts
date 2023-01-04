import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { UserRegisterRequestDto } from 'src/app/dtos/user-register-request.dto';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-modal-signup',
  templateUrl: './modal-signup.component.html',
  styleUrls: ['./modal-signup.component.scss']
})
export class ModalSignupComponent implements OnInit {

  form: FormGroup;

  request!: UserRegisterRequestDto;
  response: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    // private toastrService: ToastrService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      termsAndPolicy: [false, [Validators.required]]
    })
  }

  ngOnInit(): void {
  }


  onSubmit() {
    var cpf = `${this.form.controls['cpf'].value[0]}${this.form.controls['cpf'].value[1]}${this.form.controls['cpf'].value[2]}.${this.form.controls['cpf'].value[3]}${this.form.controls['cpf'].value[4]}${this.form.controls['cpf'].value[5]}.${this.form.controls['cpf'].value[6]}${this.form.controls['cpf'].value[7]}${this.form.controls['cpf'].value[8]}-${this.form.controls['cpf'].value[9]}${this.form.controls['cpf'].value[10]}`

    this.request = {
      cpf: cpf,
      email: this.form.controls['email'].value,
      name: this.form.controls['name'].value,
      phone: `+55${this.form.controls['phone'].value}`,
    }

    this.userService.register(this.request).subscribe(
      success => {
        this.registerSuccess()
      },
      error => {
        // this.toastrService.error('Erro ao cadastrar ', '', { progressBar: true });
        console.log(error)
      }
    )
  }

  registerSuccess() {
    // this.toastrService.success('Usuario cadastrado com sucesso', '', { progressBar: true })
    // this.router.navigate(['home'])
  }


}
