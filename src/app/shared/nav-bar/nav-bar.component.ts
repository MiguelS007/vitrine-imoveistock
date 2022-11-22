import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { PageScrollService } from 'ngx-page-scroll-core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  collapsed = false;
  constructor(
    private pageScrollService: PageScrollService,
    @Inject(DOCUMENT) private document: any,
  ) { }

  ngOnInit(): void {
  }


  public scrollToMakeYourRegistration(): void {
    this.pageScrollService.scroll({
      document: this.document,
      scrollTarget: '.scrollToMakeYourRegistration'
    });
  }

  public scrollIndicate(): void {
    this.pageScrollService.scroll({
      document: this.document,
      scrollTarget: '.scrollIndicate'
    });
  }

  sideBtn() {
    this.collapsed = !this.collapsed;
  }

}
