import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/service/user.service';
import { ModalSignupComponent } from '../modal-signup/modal-signup.component';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {
  changeValue?: string

  constructor(
    private userService: UserService,
    private modalSevice: NgbModal
    )
    { }

  exit(){
    this.modalSevice.dismissAll();
    this.modalSevice.open(ModalSignupComponent, {centered: true})
  }
  ngOnInit(): void {

    this.changeValue = this.userService.termsOrPolitic
  }

}
