import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

  constructor(
    public router: Router,
    private datamokservice: DatamokService,

  ) {
    this.changeSubscription = this.datamokservice.getopModalLogin().subscribe(() => {
      this.modallogin = false;
    });
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {

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

  goLogin() {
    this.modallogin = true;
  }
  sideBtn() {
    this.collapsed = !this.collapsed;
  }


}
