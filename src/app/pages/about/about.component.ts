import { Component, OnInit } from '@angular/core';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Subscription } from 'rxjs';
import { DatamokService } from '../../service/datamok.service';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
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
    window.open('https://imoveistock-app-tgt.vercel.app', '_blank')
  }

  // openLogin() {
  //   if (localStorage.getItem('user') === null) {
  //     this.datamokservice.opModalLogin();
  //   } else {
  //     window.open('https://imoveistock-app.vercel.app/logged/home', '_blank');
  //   }
  // }

}
