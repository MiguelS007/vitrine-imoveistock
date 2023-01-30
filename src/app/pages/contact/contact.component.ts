import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DatamokService } from 'src/app/service/datamok.service';

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


  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      tel: [''],
      subject: [''],
      msg: ['', [Validators.required]],
    });
    this.changeSubscription = this.datamokservice.getopModalLogin().subscribe(() => {
      this.modallogin = false;
    });
  }

  ngOnInit(): void {

  }

  openLogin() {
    this.datamokservice.opModalLogin();
  }

}
