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

  response: AnnouncementGetResponseDto;

  listLikes: any = []

  constructor(
    public router: Router,
    private announcementService: AnnouncementService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    let response = localStorage.getItem('announcementView');
    this.response = JSON.parse(response);

    if (localStorage.getItem('user') !== null) {
      this.announcementService.listLikes().subscribe(
        success => {
          console.log('sucesso', success)
          for (let i = 0; i < success.length; i++) {
            this.listLikes.push(success[i].announcement);
          }

          for (let iterator of this.listLikes) {
            if (iterator._id === this.response._id) {
              this.response.liked = true;
            } else {
              this.response.liked = false;
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
      announcementId: value
    }

    if(localStorage.getItem('user') !== null) {
      if (this.response.liked === true) {
        this.announcementService.registerUnlike(request).subscribe(
          success => {
            this.response.liked = false;
          },
          error => {
            console.error(error)
          }
        )
      } else {
        this.announcementService.registerLike(request).subscribe({
          next: (success) => {
            this.response.liked = true;
          },
          error: (error) => {
            console.log(error);
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
