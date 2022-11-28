import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  collapsed = false;
  urlParams: any;
  constructor(
    private router: Router
  ) { }



  ngOnInit(): void {
    
  }

  sideBtn() {
    this.collapsed = !this.collapsed;
  }
  

}
