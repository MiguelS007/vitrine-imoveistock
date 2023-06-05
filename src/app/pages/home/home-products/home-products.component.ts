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
import { propertyTypesConst } from 'src/app/utils/propertyTypes';
import { catchError, forkJoin, of } from 'rxjs';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
@Component({
  selector: 'app-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.scss'],
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
  ) {}

  ngOnInit(): void {
    this.list();

    this.authenticationService.logged.subscribe({
      next: (value) => {
        if (value === true) {
          this.list();
        }
      },
    });
  }

  list() {
    const fork = forkJoin({
      likes:
        localStorage.getItem('user') !== null
          ? this.announcementService.listLikes().pipe(
              catchError((err) => {
                console.log(err, 'error in list likes');
                return of(undefined);
              })
            )
          : of(undefined),
      exclusive: this.announcementService.listExclusive().pipe(
        catchError((err) => {
          console.log(err, 'error in list exclusive');
          return of(undefined);
        })
      ),
    });

    fork.subscribe((data) => {
      this.response = data.exclusive;
      if (data.likes) {
        this.listLikes = data.likes.map((x) => x.announcement);
        for (let i = 0; i < this.listLikes.length; i++) {
          for (let x = 0; x < this.response.length; x++) {
            if (this.listLikes[i]._id === this.response[x]._id) {
              Object.assign(this.response[x], { liked: true });
            }
          }
        }
      }
    });
  }

  likeHeart(value, condition) {
    let request = {
      announcementId: value,
    };
    if (localStorage.getItem('user') === null) {
      this.modalService.open(ModalLoginComponent, { centered: true });
      return;
    }
    if (this.listLikes.length === 0) {
      this.announcementService.registerLike(request).subscribe({
        next: (success) => {
          this.list();
          return;
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      if (condition === true) {
        this.announcementService.registerUnlike(request).subscribe({
          next: (success) => {
            this.list();
            return;
          },
          error: (error) => {
            console.log(error);
          },
        });
      } else if (condition === undefined) {
        this.announcementService.registerLike(request).subscribe({
          next: (success) => {
            this.list();
            return;
          },
          error: (error) => {
            console.log(error);
          },
        });
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
          return;
        }
      }
    }

    list.push(verify);

    this.recentlySeenList = list;

    this.router.navigate([`announcement/detail/${value}`]);
  }

  resolveProperty(text: string): string {
    return (
      propertyTypesConst.find((x) => x.value === text)?.name || text || '-'
    );
  }
}
