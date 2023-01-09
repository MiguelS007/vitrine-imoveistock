import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { UserRegisterRequestDto } from 'src/app/dtos/user-register-request.dto';
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

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private userService: UserService,
    // private toastrService: ToastrService,
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
          if (success[i].name === 'porteiros') {
            this.response = success[i]._id
          }
        }
      },
      error => { console.log(error) }
    );
    console.log(this.response, "number");
  }


  async confirm() {
    var cpf = `${this.form.controls['cpf'].value[0]}${this.form.controls['cpf'].value[1]}${this.form.controls['cpf'].value[2]}.${this.form.controls['cpf'].value[3]}${this.form.controls['cpf'].value[4]}${this.form.controls['cpf'].value[5]}.${this.form.controls['cpf'].value[6]}${this.form.controls['cpf'].value[7]}${this.form.controls['cpf'].value[8]}-${this.form.controls['cpf'].value[9]}${this.form.controls['cpf'].value[10]}`

    this.request = {
      phone: `+55${this.form.controls['phone'].value}`,
      email: this.form.controls['email'].value,
      cpf: cpf,
      name: this.form.controls['name'].value,
      profileId: 'fc68f468-9b93-4486-a92c-8d096f698987'
    }

    this.userService.register(this.request).subscribe(
      async success => {
        this.registerSuccess()
        this.router.navigate(['home'])
      },
      async error => {
        // this.toastrService.error('Erro ao cadastrar ', '', { progressBar: true });
        console.log(error, 'deu ruin')
        // this.router.navigate(['auth/sign-in'])

      }
    )
  }

  registerSuccess() {
    // this.toastrService.success('Usuario cadastrado com sucesso', '', { progressBar: true })
    this.router.navigate(['home'])
    console.log( this.response,'pqp deu bom')
  }


}
