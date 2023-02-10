import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter, Subscription } from 'rxjs';
import { UserGetResponseDto } from 'src/app/dtos/user-get-response.dtos';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DatamokService } from 'src/app/service/datamok.service';
import { ModalLoginComponent } from '../../auth/modal-login/modal-login.component';
import { ModalCodeComponent } from 'src/app/auth/modal-code/modal-code.component';

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
  contact: boolean = false;

  userName: string;

  navbarSelect: string = ''

  constructor(
    public router: Router,
    private datamokservice: DatamokService,
    private modalService: NgbModal,
    private authenticationService: AuthenticationService,
    public route: ActivatedRoute

  ) {
    this.changeSubscription = this.datamokservice.getopModalLogin().subscribe(() => {
      this.modalService.open(ModalLoginComponent, { centered: true })
    });
  }

  ngAfterViewInit(): void {
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
      this.contact = false;
    } else if (window.location.pathname === '/about') {
      this.home = false;
      this.about = true;
      this.contact = false;
    } else if (window.location.pathname === '/contact') {
      this.home = false;
      this.about = false;
      this.contact = true;
    } else {
      this.home = false;
      this.about = false;
      this.contact = false;
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
      this.contact = false;
      this.router.navigate(['/']);
    } else if (value === 'about') {
      this.home = false;
      this.about = true;
      this.contact = false;
      this.router.navigate(['/about']);
    } else if (value === 'indicateProperties') {
      if (localStorage.getItem('user') !== null) {
        // window.open('https://imoveistock-app.vercel.app/logged/home', '_blank');
        window.open('https://imoveistock-app.vercel.app/auth/login-or-register', '_blank');
      } else {
        window.open('https://imoveistock-app.vercel.app/', '_blank');
      }
      this.home = false;
      this.about = false;
      this.contact = false;
    } else if (value === 'ownerRegistration') {
      if (localStorage.getItem('user') !== null) {
        // window.open('https://imoveistock-app.vercel.app/logged/owner-registration', '_blank');
        window.open('https://imoveistock-app.vercel.app/auth/login-or-register', '_blank');
      } else {
        window.open('https://imoveistock-app.vercel.app/', '_blank');
      }
      this.home = false;
      this.about = false;
      this.contact = false;
    } else if (value === 'forBrokers') {
      if (localStorage.getItem('user') !== null) {
        // window.open('https://imoveistock-app.vercel.app/logged/broker-registration', '_blank');
        window.open('https://imoveistock-app.vercel.app/auth/login-or-register', '_blank');
      } else {
        window.open('https://imoveistock-app.vercel.app/', '_blank');
      }
      this.home = false;
      this.about = false;
      this.contact = false;
    } else if (value === 'contact') {
      this.home = false;
      this.about = false;
      this.contact = true;
      this.router.navigate(['/contact']);
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
    this.router.navigate(['logged/visits']);
    this.home = false;
    this.about = false;
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
