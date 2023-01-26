import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { UserGetResponseDto } from 'src/app/dtos/user-get-response.dtos';
import { AuthenticationService } from 'src/app/service/authentication.service';
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
    private modalService: NgbModal,
    private authenticationService: AuthenticationService

  ) {
    this.changeSubscription = this.datamokservice.getopModalLogin().subscribe(() => {
      this.modallogin = false;
    });
  }

  ngAfterViewInit(): void {
    // console.log(this.user.name , 'the user');

  }

  ngOnInit(): void {

    if (JSON.parse(localStorage.getItem('userDto')) === null) {
      this.verificationLogged(false);
    } else if (JSON.parse(localStorage.getItem('userDto')) !== null) {
      this.verificationLogged(true)
    }

    this.authenticationService.logged.subscribe({
      next: value => {
        if (value === true) {
          setTimeout(() => {
            this.user = JSON.parse(localStorage.getItem('userDto'));
            this.userName = this.user.name.split(' ')[0];
            this.loggedname = true;
            this.loggedopt = true;
            this.loginopt = false;

            this.indicatLogon = true;
            this.indicatLogoff = false;

            this.brokerLogon = true;
            this.brokerLogoff = false;
          }, 1000);
        } else {
          this.user = null
        }
      }
    })

    if (window.location.pathname === '/') {
      this.home = true;
      this.about = false;
    } else if (window.location.pathname === '/about') {
      this.home = false;
      this.about = true
    }

  }

  verificationLogged(value) {
    this.user = JSON.parse(localStorage.getItem('userDto'));
    if (this.user !== null) {
      this.loggedname = true;
      this.loggedopt = true;
      this.loginopt = false;

      this.indicatLogon = true;
      this.indicatLogoff = false;

      this.brokerLogon = true;
      this.brokerLogoff = false;

      this.userName = this.user.name.split(' ')[0];

    } else {
      this.indicatLogoff = true;
      this.brokerLogoff = true;
      this.loginopt = true;
    }
  }

  changePage(value) {
    if (value === 'home') {
      this.home = true;
      this.about = false;
      this.router.navigate(['/']);
    } else if (value === 'about') {
      this.home = false;
      this.about = true;
      this.router.navigate(['/about']);
    } else if (value === 'indicateProperties') {
      if (this.user !== null) {
        console.log('esta logado')
      } else {
        this.openLogin()
      }
    } else if (value === 'forBrokers') {
      if (this.user !== null) {
        console.log('esta logado')
      } else {
        this.openLogin()
      }
    }
  }

  logOut() {
    localStorage.clear();

    setTimeout(() => {
      this.loginopt = true;
      this.loggedname = false;
      this.router.navigate(['/']);
      
    }, 100);

  }

  goDeashboard() {
    this.router.navigate(['logged/visits'])
  }
  sideBtn() {
    this.collapsed = !this.collapsed;
    this.loggedname = false;
    this.loggedopt = false;
    this.loginopt = true;

  }

  openLogin() {
    this.modalService.open(ModalLoginComponent, { centered: true })
  }


}
