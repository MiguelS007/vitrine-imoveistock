import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnouncementGetResponseDto } from 'src/app/dtos/announcement-get-response.dto';
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

  response: AnnouncementGetResponseDto[] = [];
  user: UserGetResponseDto;
  urlsimg: any = [];

  logged: boolean;
naruto:string;
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
      error => { console.log(error, 'data not collected') }
    );

  }

  selectedAnnouncement(){
    
  }


  likeHeart() {
    this.iconlikeheart = !this.iconlikeheart;
  }

}
