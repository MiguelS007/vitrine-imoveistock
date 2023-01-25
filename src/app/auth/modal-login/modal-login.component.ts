import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticateRequestDto } from 'src/app/dtos/authenticate-request.dto';
// import { ToastrService } from 'ngx-toastr';
import { DatamokService } from 'src/app/service/datamok.service';
import { ModalSignupComponent } from '../modal-signup/modal-signup.component';
import { ModalTelComponent } from '../modal-tel/modal-tel.component';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss']
})
export class ModalLoginComponent implements OnInit {


  constructor(
    private router: Router,
    private datamokservice: DatamokService,
    private modalService: NgbModal
  ) {

  }
  ngOnInit(): void {
  }

  exit() {
    this.modalService.dismissAll()
  }

  login() {
    this.modalService.dismissAll()
    this.modalService.open(ModalTelComponent, {centered: true})
  }

  createAccount() {
    this.modalService.dismissAll()
    this.modalService.open(ModalSignupComponent, {centered: true})
  }
}