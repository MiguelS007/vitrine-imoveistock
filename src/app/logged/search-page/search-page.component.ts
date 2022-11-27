import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd  } from '@angular/router';
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  currentRoute: string | undefined;

  constructor(
    private router: Router
  ) { 
   
    
    }

  ngOnInit(): void {
     console.log(this.router.url);
  }

}
