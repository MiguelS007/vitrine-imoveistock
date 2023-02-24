import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserRegisterRequestDto } from 'src/app/dtos/user-register-request.dto';
import { UserService } from 'src/app/service/user.service';
import { ProfileClientEnum } from '../../../app/dtos/enum/profile-client.enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TermsComponent } from '../terms/terms.component';
import { ModalTelComponent } from '../modal-tel/modal-tel.component';

@Component({
  selector: 'app-modal-signup',
  templateUrl: './modal-signup.component.html',
  styleUrls: ['./modal-signup.component.scss']
})
export class ModalSignupComponent implements OnInit {

  form: FormGroup;

  request: UserRegisterRequestDto;

  response: string[];
  isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService,
    private modalService: NgbModal

  ) {
    this.form = this.formBuilder.group({
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      termsAndPolicy: [false, [Validators.requiredTrue]]
    })
  }

  ngOnInit(): void {

  }

  exit() {
    this.modalService.dismissAll()
  }

  openTermsModal(value: string) {
    this.userService.termsOrPolitic = value;
    this.modalService.open(TermsComponent, { size: "lg" })
  }

  confirm() {
    this.isSubmitted = true;

    var cpf = `${this.form.controls['cpf'].value[0]}${this.form.controls['cpf'].value[1]}${this.form.controls['cpf'].value[2]}.${this.form.controls['cpf'].value[3]}${this.form.controls['cpf'].value[4]}${this.form.controls['cpf'].value[5]}.${this.form.controls['cpf'].value[6]}${this.form.controls['cpf'].value[7]}${this.form.controls['cpf'].value[8]}-${this.form.controls['cpf'].value[9]}${this.form.controls['cpf'].value[10]}`

    this.request = {
      phone: `+55${this.form.controls['phone'].value.replace(/\D/g, '')}`,
      email: this.form.controls['email'].value,
      cpf: cpf,
      name: this.form.controls['name'].value,
      profilesIds: [ProfileClientEnum.indicacao, ProfileClientEnum.proprietario]
    }

    console.log(this.request)

    if (this.form.controls['termsAndPolicy'].value === true) {
      this.userService.register(this.request).subscribe(
        success => {
          this.toastrService.success('Cadastrado com sucesso!', '', { progressBar: true });
          this.modalService.dismissAll();
          this.modalService.open(ModalTelComponent, { centered: true })
        },
        error => {
          console.log(error)
          this.toastrService.error('Erro ao cadastrar', '', { progressBar: true });
        }
      )
    }
    else if (this.form.controls['termsAndPolicy'].value === false) {
      this.toastrService.error('Necessario estar de acordo com os termos e condições de uso!', '', { progressBar: true });
    }

  }



  // nextFunction() {
  //   this.authenticationService.authenticate(this.request).subscribe(
  //     async success => {
  //       this.toastrService.success('Sms enviado com sucesso!', '', { progressBar: true });
  //       localStorage.setItem('phone', this.request.phone);
  //       this.router.navigate(['auth/insert-code']);
  //     },
  //     async error => {
  //       this.toastrService.success('Não foi possível enviar SMS!', '', { progressBar: true });
  //       console.log(error);
  //     }
  //   );
  // }
}
