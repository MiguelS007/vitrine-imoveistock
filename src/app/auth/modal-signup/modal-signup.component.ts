import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserRegisterRequestDto } from 'src/app/dtos/user-register-request.dto';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ProfileService } from 'src/app/service/profile.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-modal-signup',
  templateUrl: './modal-signup.component.html',
  styleUrls: ['./modal-signup.component.scss']
})
export class ModalSignupComponent implements OnInit {

  form: FormGroup;

  request: UserRegisterRequestDto;

  response: any;
  isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      termsAndPolicy: [false, [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.profileService.list().subscribe(
      success => {
        for (let i = 0; i < success.length; i++) {
          if (success[i].name === 'indicacao') {
            this.response = [success[i]._id]
          }
        }
      },
      error => { console.error(error) }
    )
  }

  



  confirm() {
    this.isSubmitted = true;

    var cpf = `${this.form.controls['cpf'].value[0]}${this.form.controls['cpf'].value[1]}${this.form.controls['cpf'].value[2]}.${this.form.controls['cpf'].value[3]}${this.form.controls['cpf'].value[4]}${this.form.controls['cpf'].value[5]}.${this.form.controls['cpf'].value[6]}${this.form.controls['cpf'].value[7]}${this.form.controls['cpf'].value[8]}-${this.form.controls['cpf'].value[9]}${this.form.controls['cpf'].value[10]}`

    this.request = {
      phone: `+55${this.form.controls['phone'].value}`,
      email: this.form.controls['email'].value,
      cpf: cpf,
      name: this.form.controls['name'].value,
      profileId: this.response
    }
    
    if (this.form.controls['termsAndPolicy'].value === true) {
      this.userService.register(this.request).subscribe(
        success => {
          this.nextFunction()
        },
        error => {
          this.toastrService.error('Erro ao cadastrar ', '', { progressBar: true });
          // console.log(error, 'deu ruin')
        }
      )
    }
    else if (this.form.controls['termsAndPolicy'].value === false) {
      this.toastrService.error('Necessario estar de acordo com os termos e condições de uso!', '', { progressBar: true });
    }
  }

  nextFunction() {
    this.authenticationService.authenticate(this.request).subscribe(
      async success => {
        this.toastrService.success('Sms enviado com sucesso!', '', { progressBar: true });
        localStorage.setItem('phone', this.request.phone);
        this.router.navigate(['auth/insert-code']);
      },
      async error => {
        this.toastrService.success('Não foi possível enviar SMS!', '', { progressBar: true });
        console.log(error);
      }
    );
  }
}
