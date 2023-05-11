import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnnouncementVisitGetResponseDto } from 'src/app/dtos/announcement-visit-get-response.dto';
import { SchedulingStep4Component } from '../scheduling-step4/scheduling-step4.component';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-scheduling-step3',
  templateUrl: './scheduling-step3.component.html',
  styleUrls: ['./scheduling-step3.component.scss']
})
export class SchedulingStep3Component implements OnInit {

  form: FormGroup

  response: AnnouncementVisitGetResponseDto;

  code1;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private userService: UserService
  ) {
    this.form = this.formBuilder.group({
      ddd: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(9)]]
    })
  }

  ngOnInit(): void {
  }

  exit() {
    this.modalService.dismissAll();
    localStorage.removeItem('typeOfAdSelect');
    localStorage.removeItem('typeOfAd');
  }

  confirm() {
    let phone = '55' + this.form.controls['ddd'].value + this.form.controls['phone'].value

    this.userService.getBrokerByPhone(phone).subscribe({
      next: data => {
        console.log(data);
        this.modalService.dismissAll();
        const modalRef = this.modalService.open(SchedulingStep4Component, { centered: true, backdrop: 'static', keyboard: false });
        modalRef.componentInstance.user = data
      },
      error: error => {
        console.error(error)
        this.toastrService.error(`${error.error.errors}`, '', { progressBar: true })
      }
    })
  }

  nextCode(item, value) {
    if (item === 'ddd') {
      this.code1 = value.target.value;
      var nextInput = document.getElementById('tel');
      for (var i = 0; i < this.code1.length; i++) {
        if (this.code1.length >= 2)
          nextInput.focus();
      }
    }
  }

}
