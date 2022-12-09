import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, AfterViewInit {
  collapsed = false;
  urlParams: any;
  iflogged = false;
  constructor(
    public router: Router
  ) { }

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


  sideBtn() {
    this.collapsed = !this.collapsed;
  }


}
