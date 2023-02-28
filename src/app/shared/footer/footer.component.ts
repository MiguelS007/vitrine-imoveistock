import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TermsComponent } from 'src/app/shared/terms/terms.component';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  year: number = new Date().getFullYear();

  constructor(
    public router: Router,
    private modalService: NgbModal,
    private userService: UserService,

  ) { }

  ngOnInit(): void {   
  }

  openTermsModal(value: string){
    this.userService.termsOrPolitic = value;
    this.modalService.open(TermsComponent,{size:"lg"})
  }
  
  handlerLoggedLinks(url: string): string {
    if (url === '/auth/login')
      return 'footer-log';
    return 'footer-';
  }

}
