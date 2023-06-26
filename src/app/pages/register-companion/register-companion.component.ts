import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AnnouncementVisitGetResponseDto } from 'src/app/dtos/announcement-visit-get-response.dto';
import { ScheduleService } from 'src/app/service/schedule.service';
import { LocationStrategy, PathLocationStrategy, Location } from '@angular/common';

@Component({
  selector: 'app-register-companion',
  templateUrl: './register-companion.component.html',
  styleUrls: ['./register-companion.component.scss'],
  providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }]
})
export class RegisterCompanionComponent implements OnInit {

  form: FormGroup;
  formCode:FormGroup;

  response: AnnouncementVisitGetResponseDto;

  _id: string = '';
  insertCode: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private scheduleService: ScheduleService,
    private route: ActivatedRoute,
    private toastrService: ToastrService
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      degreeOfKinship: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(11)]],
      cpf:['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]]
    })

    this.formCode = this.formBuilder.group({
      code: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    })
  }

  ngOnInit(): void {
    this.response = this.route.snapshot.data['resolve'];
    console.log(this.response);

    this._id = location.pathname.replace('/register-companion/id/', '')
  }

  saveCompanion() {
    const data = Object.assign({}, this.form.value);
    if(this.form.invalid || this.formCode.invalid) {
      this.toastrService.error('Preencha todos os campos corretamente!', '', {
        progressBar: true,
        timeOut: 2500
      })
      return;
    }
    if(this.response.companion.some(x => x.phone === this.form.controls['phone'].value)) {
      this.toastrService.error('Acompanhante já adicionado!', '', {
        progressBar: true,
        timeOut: 2500
      })
      return;
    }
    
    this.scheduleService.registerCompanion({ ...data, announcementVisit: this._id }, this.formCode.value.code).subscribe({
      next: (data) =>
        this.saveCompanionSuccess(data),
      error: error => {
        console.error(error)
        this.toastrService.error(`${error.error.errors}`, '', { progressBar: true })
      }
    }
    );
  }

  sendCode(){
    if(this.form.invalid) {
      this.toastrService.error('Preencha todos os campos corretamente!', '', {
        progressBar: true,
        timeOut: 2500
      })
      return;
    }
    if(this.response.companion.some(x => x.phone === this.form.controls['phone'].value)) {
      this.toastrService.error('Acompanhante já adicionado!', '', {
        progressBar: true,
        timeOut: 2500
      })
      return;
    }
    this.scheduleService.sendCode({phone: this.form.controls['phone'].value}).subscribe({
      next: (data) =>{
        this.toastrService.success('Código enviado com sucesso!', '', {
          progressBar: true,
          timeOut: 2500
        })
        this.insertCode = true;
      },
      error: error => {
        console.error(error)
        this.toastrService.error(`${error.error.errors}`, '', { progressBar: true })
      }
    });
  }

  saveCompanionSuccess(data: any): void {
    this.toastrService.success('Acompanhante adicionado com sucesso!', '', {
      progressBar: true,
      timeOut: 2500
    })
  }

}
