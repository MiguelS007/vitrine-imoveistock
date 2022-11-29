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
    if (url === '/logged/search')
      return 'bg-light';
      return 'bg-transpatent';
  }
  handlerLoggedLinks(url: string): string {
    if (url === '/logged/search')
      return 'color-black';
      return 'text-light';
  }
  

  sideBtn() {
    this.collapsed = !this.collapsed;
  }


}
