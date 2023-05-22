import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AnnouncementService } from 'src/app/service/announcement.service';
import { DatamokService } from 'src/app/service/datamok.service';
import { UserSendMessageRequestDto } from '../../dtos/user-send-message-request.dto';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  form: FormGroup;
  changeSubscription: Subscription;

  modallogin = false;


  constructor(
    private formBuilder: FormBuilder,
    private datamokservice: DatamokService,
    private toastrService: ToastrService,
    private announcementService: AnnouncementService,
    private userService: UserService
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      tel: ['',[Validators.required]],
      subject: ['',[Validators.required]],
      msg: ['', [Validators.required]],
    });
    this.changeSubscription = this.datamokservice.getopModalLogin().subscribe(() => {
      this.modallogin = false;
    });
  }

  ngOnInit(): void {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
});

  }

  confirm(){
    // FAKE FEEDBACK
    let request: UserSendMessageRequestDto = {
      email: this.form.controls['email'].value,
      message: this.form.controls['msg'].value,
      name: this.form.controls['name'].value,
      phone: `55$${this.form.controls['tel'].value}`.replace(/\D/g, ''),
      subject: this.form.controls['subject'].value,
    }

    console.log(request)
    this.userService.sendMessage(request).subscribe(
      success => {
        this.toastrService.success('Mensagem enviada!', '', { progressBar: true });
        this.form.reset();
      },
      error => {
        this.toastrService.error('Erro ao enviar mensagem!', '', { progressBar: true });
        console.error(error)
      }
    )
  }

  knowApp() {
    if (localStorage.getItem('user') !== null) {
      window.open('https://imoveistock-app-tgt.vercel.app', '_blank')
    } else {
      window.open('https://indike.imoveistock.com.br/', '_blank')
    }
  }

  // openLogin() {
  //   if (localStorage.getItem('user') === null) {
  //     this.datamokservice.opModalLogin();
  //   } else {
  //     window.open('https://imoveistock-app.vercel.app/logged/home', '_blank');
  //   }
  // }

}
