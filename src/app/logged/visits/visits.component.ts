import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss']
})
export class VisitsComponent implements OnInit {
  spaceFavorites: boolean = true;
  spaceScheduling: boolean = false;
  spaceProposal: boolean = false

  constructor(
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('goToVisits')){
      localStorage.removeItem('goToVisits')
      this.changePage('scheduling')
    }else
      this.changePage('favorites')
   }

  changePage(value: string) {
    console.log(value)
    if (value === 'favorites') {
      this.spaceFavorites = true;
      this.spaceScheduling = false;
      this.spaceProposal = false;
    } else if (value === 'scheduling') {
      this.spaceFavorites = false;
      this.spaceScheduling = true;
      this.spaceProposal = false;
    } else if (value === 'proposal') {
      this.spaceFavorites = false;
      this.spaceScheduling = false;
      this.spaceProposal = true;
    }
  }
}
