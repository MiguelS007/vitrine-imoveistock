import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss']
})
export class VisitsComponent implements OnInit {
  spaceScheduling = false;
  spaceFavorites = true;
  segment = false;
  constructor(
    
  ) {
   
  }

  ngOnInit(): void {

  }

  changePage(value: string) {
    if (value === 'favorites') {
      this.segment = !this.segment;
    } else if (value === 'tour') {
      this.spaceFavorites = true;
      this.spaceScheduling = false;
    } else if (value === 'scheduling') {
      this.segment = !this.segment;
      this.spaceFavorites = false;
      this.spaceScheduling = true;
    }
  }
}
