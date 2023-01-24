import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { UserGetResponseDto } from 'src/app/dtos/user-get-response.dtos';
import { DatamokService } from 'src/app/service/datamok.service';
import { ModalLoginComponent } from '../../auth/modal-login/modal-login.component';

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

  indicatLogon = false;
  indicatLogoff = true;

  brokerLogon = false;
  brokerLogoff = true;

  user: UserGetResponseDto;


  home: boolean = true;
  about: boolean = false;


  userName: string;

  constructor(
    public router: Router,
    private datamokservice: DatamokService,
    private modalService: NgbModal

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

    if(window.location.pathname === '/') {
      this.home = true;
      this.about = false;
    } else if (window.location.pathname === '/about') {
      this.home = false;
      this.about = true
    }

    if (this.user !== null) {
      this.loggedname = true;
      this.loggedopt = true;
      this.loginopt = false;

      this.indicatLogon = true;
      this.indicatLogoff = false;

      this.brokerLogon = true;
      this.brokerLogoff = false;

      this.userName = this.user.name.split(' ')[0];

      console.log(this.userName)

    } else {
      this.indicatLogoff = true;
      this.brokerLogoff = true;
      this.loginopt = true;
    }
  }

  changePage(value) {
    if(value === 'home') {
      this.home = true;
      this.about = false;
      this.router.navigate(['/']);
    } else if (value === 'about') {
      this.home = false;
      this.about = true;
      this.router.navigate(['/about']);
    } else if (value === 'indicateProperties') {
      if(this.user !== null) {
        console.log('esta logado')
      } else {
        this.openLogin()
      }
      console.log(this.user)
    } else if (value === 'forBrokers') {
      if(this.user !== null) {
        console.log('esta logado')
      } else {
        this.openLogin()
      }
    }
  }

  logOut() {
    localStorage.removeItem('userDto');
    this.router.navigate(['auth/login']);
  }

  goDeashboard() {
    console.log(
      localStorage.getItem('user')
    );
  }
  sideBtn() {
    this.collapsed = !this.collapsed;
    this.loggedname = false;
    this.loggedopt = false;
    this.loginopt = true;

  }

  openLogin() {
    this.modalService.open(ModalLoginComponent, {centered: true})
  }


}
