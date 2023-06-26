import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserGetResponseDto } from 'src/app/dtos/user-get-response.dtos';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  form: FormGroup

  editInfos: boolean = true;

  user: UserGetResponseDto;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService
  ) {
    this.form = this.formBuilder.group({
      name: [''],
      email: [''],
      phone: ['']
    })
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      success => {
        this.user = success;
        this.form.patchValue({
          name: success.name,
          email: success.email,
          phone: success.phone,
        })
      }
    )

  }

  goToEditInfo() {
    this.editInfos = false
  }

  cancel() {
    this.editInfos = true
  }

  confirm() {
    let request = {
      name: this.form.controls['name'].value,
      email: this.form.controls['email'].value,
      phone: this.form.controls['phone'].value,
    }

    this.userService.userUpdate(request).subscribe({
      next: data => {
        this.toastrService.success('Dados atualizados com sucesso', '', { progressBar: true });
        this.editInfos = true
        window.location.reload()
      },
      error: error => {
        this.toastrService.error('Erro ao atualizar os dados!', '', { progressBar: true });
        console.error(error)
      }
    })

  }

  onSelectFile(event) {

  }

}
