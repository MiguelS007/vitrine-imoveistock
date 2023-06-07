import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalLoginComponent } from 'src/app/auth/modal-login/modal-login.component';
import { AnnouncementGetResponseDto } from 'src/app/dtos/announcement-get-response.dto';
import { AnnouncementService } from 'src/app/service/announcement.service';

@Component({
  selector: 'app-view-announcement-modal',
  templateUrl: './view-announcement-modal.component.html',
  styleUrls: ['./view-announcement-modal.component.scss']
})
export class ViewAnnouncementModalComponent implements OnInit {

  response: AnnouncementGetResponseDto[] = [];

  listLikes: any = []

  constructor(
    public router: Router,
    private announcementService: AnnouncementService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    let response: any = localStorage.getItem('announcementView');
    this.response = JSON.parse(response);

    if (localStorage.getItem('user') !== null) {
      this.announcementService.listLikes().subscribe(
        success => {
          for (let i = 0; i < success.length; i++) {
            this.listLikes.push(success[i].announcement);
            for (let iterator of this.response) {
              if (success[i].announcement._id === iterator._id) {
                iterator.liked = true;
              } else {
                iterator.liked = false;
              }
            }

          }

        },
        error => {
          console.error(error);
        }
      )
    }
  }

  exit() {
    this.modalService.dismissAll();
  }

  announcementSelected(value) {
    this.exit();
    this.router.navigate([`announcement/detail/${value}`])
  }

  likeHeart(value) {

    let request = {
      announcementId: value._id
    }

    if (localStorage.getItem('user') !== null) {
      if (value.liked === true) {
        this.announcementService.registerUnlike(request).subscribe(
          success => {
            for (let iterator of this.response) {
              if (iterator._id === value._id) {
                iterator.liked = false
              }
            }
          },
          error => {
            console.error(error)
          }
        )
      } else {
        this.announcementService.registerLike(request).subscribe({
          next: (success) => {
            for (let iterator of this.response) {
              if (iterator._id === value._id) {
                iterator.liked = true
              }
            }
          },
          error: (error) => {
            console.error(error);
          },
        });
      }
    } else {
      this.modalService.open(ModalLoginComponent, { centered: true });
      return;
    }

  }

  ngOnDestroy() {
    localStorage.removeItem('announcementView');
  }

}
