import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserGetResponseDto } from 'src/app/dtos/user-get-response.dtos';
import { DatamokService } from 'src/app/service/datamok.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, AfterViewInit {
  collapsed = false;
  urlParams: any;
  iflogged = false;
  modallogin = false;
  changeSubscription: Subscription;
  loggedname = false;
  loggedopt = false;
  loginopt = true;
  user: UserGetResponseDto;


  constructor(
    public router: Router,
    private datamokservice: DatamokService,

  ) {
    this.changeSubscription = this.datamokservice.getopModalLogin().subscribe(() => {
      this.modallogin = false;
    });
  }

  ngAfterViewInit(): void {
    // console.log(this.user.name , 'the user');

  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userDto'));
    if (this.user.name != null) {
      this.loggedname = true;
      this.loggedopt = true;
      this.loginopt = false;
    } else {
      this.loginopt = true;
    }
  }

  handlerLoggedBackground(url: string): string {
    if (url === '/home')
      return 'bg-transpatent';
    return 'bg-white';
  }
  handlerLoggedLinks(url: string): string {
    if (url === '/home')
      return 'text-light';
    return 'color-black';
  }
  handlerLoggedLogo(url: string): string {
    if (url === '/home')
      return '../../../assets/img/title-logo.png';
    return '../../../assets/img/logo-title-black.png';
  }

  logOut() {
    localStorage.removeItem('userDto');
    this.router.navigate(['auth/login']);
  }


  sideBtn() {
    this.collapsed = !this.collapsed;
    this.loggedname = false;
    this.loggedopt = false;
    this.loginopt = true;
  }


}
