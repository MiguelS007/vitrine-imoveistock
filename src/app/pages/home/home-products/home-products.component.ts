import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeGetResponsetDto } from 'src/app/dtos/home-get-response.dto';
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

  response: HomeGetResponsetDto[] = [];
  user: UserGetResponseDto;

  // : any;
  city: any = [];

  urlsimg: any = [];

  requestimg: any;

  random: number;


  constructor(
    private router: Router,
    private userService: UserService,
    private searchService: SearchService,
  ) { }

  ngOnInit(): void {
    this.searchService.getPropertyHome().subscribe(
      success => {
        this.response = success;
      },
      error => { console.log(error, 'deu ruin') }
    );
    this.userService.getUser().subscribe(
      success => {
        this.user = success;
        if (this.user?.photo?.location) {
          this.urlsimg.push(this.user.photo.location);
        }
      },
      error => {
        console.error(error, ' o erro');
      }
    );
  }


  likeHeart() {
    this.iconlikeheart = !this.iconlikeheart;
  }

}
