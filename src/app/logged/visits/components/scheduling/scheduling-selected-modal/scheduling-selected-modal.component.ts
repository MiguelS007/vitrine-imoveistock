import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ScheduleRegisterResponseDto } from '../../../../../dtos/schedule-register-response.dto';
import { AnnouncementService } from '../../../../../service/announcement.service';

@Component({
  selector: 'app-scheduling-selected-modal',
  templateUrl: './scheduling-selected-modal.component.html',
  styleUrls: ['./scheduling-selected-modal.component.scss']
})
export class SchedulingSelectedModalComponent implements OnInit {

  selectedScheduling: ScheduleRegisterResponseDto = {
    _id: '',
    cancellationReason: '',
    visitDate: new Date,
  };

  recentlySeenList: any = [];

  location = false;

  confirmcancel = false;


  constructor(
    private modalService: NgbModal,
    private router: Router,
    private announcementService: AnnouncementService
  ) { }

  ngOnInit(): void {
    let selectedScheduling = localStorage.getItem('announcementChecked');
    this.selectedScheduling = JSON.parse(selectedScheduling)
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

    this.modalService.dismissAll();

    this.router.navigate([`announcement/detail/${value}`]);

  }

  likeHeart(value) {

    let request = {
      announcementId: value
    }


    if (this.selectedScheduling.announcement.liked === true) {
      this.announcementService.registerUnlike(request).subscribe(
        success => {
          this.selectedScheduling.announcement.liked = false
        },
        error => {
          console.error(error)
        }
      )
    } else if (this.selectedScheduling.announcement.liked === false) {
      this.announcementService.registerLike(request).subscribe(
        success => {
          this.selectedScheduling.announcement.liked = true
        },
        error => {
          console.error(error)
        }
      )
    }


  }

  cancelVisits(value: string) {
    // if (value === 'cancelmodal') {
    //   this.confirmcancel = !this.confirmcancel;
    // } else if (value === 'cancel') {
    //   this.location = true;
    // }
    this.exit()
  }

  exit() {
    this.modalService.dismissAll()
  }

}
