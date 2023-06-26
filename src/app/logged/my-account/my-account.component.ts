import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserEditPhotoRequestDto } from 'src/app/dtos/user-edit-photo-request.dto';
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

  urls: any = [];

  requestPhoto: UserEditPhotoRequestDto;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService,
    private ngxSpinnerService: NgxSpinnerService
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
        if (this.user?.photo?.location) {
          this.urls.push(this.user.photo.location)
        };
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
    this.editInfos = true;
    this.form.patchValue({
      name: this.user.name,
      email: this.user.email,
      phone: this.user.phone,
    })
  }

  confirm() {
    this.ngxSpinnerService.show();
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
        this.ngxSpinnerService.hide();
      },
      error: error => {
        this.toastrService.error('Erro ao atualizar os dados!', '', { progressBar: true });
        this.ngxSpinnerService.hide();
        console.error(error)
      }
    })

  }

  onSelectFile(event) {
    this.ngxSpinnerService.show();
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {

        var reader = new FileReader();

        reader.onload = (event: any) => {
          this.urls = [];
          this.urls.push(event.target.result);

          this.requestPhoto = {
            photo: event.target.result
          };
          this.userService.editPhoto(this.requestPhoto).subscribe(
            async success => {
              this.userService.getUser().subscribe(
                success => {
                  let user = JSON.stringify(success);
                  localStorage.setItem('userDto', user);
                },
                error => {
                  console.error(error);
                }
              );
              this.toastrService.success('Foto do perfil alterada com sucesso!', '', { progressBar: true });
              this.ngxSpinnerService.hide();
            },
            async error => {
              this.toastrService.error('Erro ao alterar foto do perfil!', '', { progressBar: true });
              this.ngxSpinnerService.hide();
              console.error(error);
            }
          );
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

}
