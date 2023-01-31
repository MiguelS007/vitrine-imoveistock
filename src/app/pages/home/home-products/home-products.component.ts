import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnouncementGetResponseDto } from 'src/app/dtos/announcement-get-response.dto';
import { UserGetResponseDto } from 'src/app/dtos/user-get-response.dtos';
import { AnnouncementService } from 'src/app/service/announcement.service';
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
  naruto: string;

  filterDuplicate: any = [];

  recentlySeenList: any = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private searchService: SearchService,
    private announcementService: AnnouncementService
  ) { }

  ngOnInit(): void {
    this.searchService.getPropertyHomeExclusivity().subscribe(
      success => {
        this.response = success;
        console.log(this.response);
        this.announcementService.listLikes().subscribe(
          success => {
            for (let i = 0; i < success.length; i++) {
             for (let x = 0; x < this.response.length; x++) {
              if(success[i].announcement._id === this.response[x]._id) {
                console.log('somos iguais', success[i].announcement)
              }
             } 
            }
          }
        )
      },
      error => { console.log(error, 'data not collected') }
    );
  }


  likeHeart(value) {
    this.iconlikeheart = !this.iconlikeheart;

    let request = {
      announcementId: value
    }
    this.announcementService.registerLike(request).subscribe(
      success => {
        console.log(success)
      },
      error => {
        console.log(error)
      }
    )
  }

  announcementSelected(value) {
    let teste: any = localStorage.getItem('recentlySeen');
    this.recentlySeenList = JSON.parse(teste);


    let verify = { _id: value };

    let list: any = this.recentlySeenList;

    if (list === null) {
      list = [];
    }

    if (this.recentlySeenList !== null) {
      for (let i = 0; i < list.length; i++) {
        if (list[i]._id === value) {
          return
        }
      }
    }

    list.push(verify);

    this.recentlySeenList = list;


    localStorage.setItem('recentlySeen', JSON.stringify(this.recentlySeenList));
    this.router.navigate([`announcement/detail/${value}`])

  }

}
