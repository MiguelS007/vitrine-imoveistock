import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalSignupComponent } from 'src/app/auth/modal-signup/modal-signup.component';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-terms-signup',
  templateUrl: './terms-signup.component.html',
  styleUrls: ['./terms-signup.component.scss']
})
export class TermsSignupComponent implements OnInit {
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

    this.changeValue = this.userService.termsOrPoliticSignUp
  }

}
