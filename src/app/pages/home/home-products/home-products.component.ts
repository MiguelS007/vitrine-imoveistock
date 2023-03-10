import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalLoginComponent } from 'src/app/auth/modal-login/modal-login.component';
import { AnnouncementGetResponseDto } from 'src/app/dtos/announcement-get-response.dto';
import { UserGetResponseDto } from 'src/app/dtos/user-get-response.dtos';
import { AnnouncementService } from 'src/app/service/announcement.service';
import { UserService } from 'src/app/service/user.service';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { AuthenticationService } from '../../../service/authentication.service';

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

  listLikes: AnnouncementGetResponseDto[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private announcementService: AnnouncementService,
    private modalService: NgbModal,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.list();


    this.authenticationService.logged.subscribe({
      next: value => {
        if (value === true) {
          this.list();
        }
      }
    })
  }
  list() {
    this.announcementService.listAnnouncement().subscribe(
      response => {
        this.response = response;
        if (localStorage.getItem('user') !== null) {
          this.announcementService.listLikes().subscribe(
            success => {
              for (let i = 0; i < success.length; i++) {
                for (let x = 0; x < this.response.length; x++) {
                  if (success[i].announcement._id === this.response[x]._id) {
                    Object.assign(this.response[x], { liked: true });
                  }
                }
                this.listLikes.push(success[i].announcement)
              }
            },
            error => {
              if (error.error.message === 'Unauthorized') {
                localStorage.removeItem('userDto');
                localStorage.removeItem('user');
              }
            }
          )
        }
      },
      error => { console.log(error, 'data not collected') }
    );
  }




  likeHeart(value, condition) {
    let request = {
      announcementId: value
    }
    if (localStorage.getItem('user') === null) {
      this.modalService.open(ModalLoginComponent, { centered: true });
      return
    }
    if (this.listLikes.length === 0) {
      this.announcementService.registerLike(request).subscribe(
        success => {
          this.list()
          return
        },
        error => {
          console.log(error)
        }
      )
    } else {
      if (condition === true) {
        this.announcementService.registerUnlike(request).subscribe(
          success => {
            this.list()
          },
          error => {
            console.log(error)
          }
        )
      } else if (condition === undefined) {
        this.announcementService.registerLike(request).subscribe(
          success => {
            this.list()
          },
          error => {
            console.log(error)
          }
        )
      }
    }
  }


  announcementSelected(value) {
    localStorage.setItem('recentlySeen', JSON.stringify(this.recentlySeenList));
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

    this.router.navigate([`announcement/detail/${value}`]);



  }

}
