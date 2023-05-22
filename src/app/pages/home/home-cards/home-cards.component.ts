import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatamokService } from 'src/app/service/datamok.service';

@Component({
  selector: 'app-home-cards',
  templateUrl: './home-cards.component.html',
  styleUrls: ['./home-cards.component.scss']
})
export class HomeCardsComponent implements OnInit {
  changeSubscription: Subscription;

  modallogin = false;

  constructor(
    private datamokservice: DatamokService,
  ) {
    this.changeSubscription = this.datamokservice.getopModalLogin().subscribe(() => {
      this.modallogin = false;
    });
  }

  ngOnInit(): void {
  }

  knowApp() {
    if (localStorage.getItem('user') !== null) {
      window.open('https://imoveistock-app-tgt.vercel.app', '_blank')
    } else {
      window.open('https://indike.imoveistock.com.br/', '_blank')
    }
  }

}
