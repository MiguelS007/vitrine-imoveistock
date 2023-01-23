import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnouncementGetResponsetDto } from 'src/app/dtos/announcement-get-response.dto';
import { UserGetResponseDto } from 'src/app/dtos/user-get-response.dtos';
import { SearchService } from 'src/app/service/search.service';
import { UserService } from 'src/app/service/user.service';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
@Component({
  selector: 'app-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.scss']
})
export class HomeProductsComponent implements OnInit {
  iconlikeheart = false;

  response: AnnouncementGetResponsetDto[] = [];
  user: UserGetResponseDto;
  urlsimg: any = [];

  logged: boolean;

  constructor(
    private router: Router,
    private userService: UserService,
    private searchService: SearchService,
  ) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('userDto'))
    if (user !== null) {
      this.logged = true;
      this.searchService.getPropertyHome().subscribe(
        success => {
          this.response = success;
          console.log(this.response);
        },
        error => { console.log(error, 'data not collected') }
      );
    } else {
      this.logged = false;
    }
  }


  likeHeart() {
    this.iconlikeheart = !this.iconlikeheart;
  }

}
