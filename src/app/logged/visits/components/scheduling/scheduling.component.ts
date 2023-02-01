import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduleRegisterResponseDto } from 'src/app/dtos/schedule-register-response.dto';
import { AnnouncementService } from 'src/app/service/announcement.service';
import { ScheduleService } from 'src/app/service/schedule.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnnouncementGetResponseDto } from '../../../../dtos/announcement-get-response.dto';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.scss']
})
export class SchedulingComponent implements OnInit {

  response: any[] = [];
  responseSchedules: ScheduleRegisterResponseDto[] = [];
  nameweek: string;
  confirmcancel = false;
  location = false;
  namemounth: string;
  products: any;
  paginationProduct: number = 1;


  form: FormGroup;

  selectedScheduling: ScheduleRegisterResponseDto = {
    _id: '',
    cancellationReason: '',
    visitDate: new Date,
  };

  recentlySeenList: any = [];

  announcementChecked: string;


  constructor(
    private scheduleService: ScheduleService,
    private router: Router,
    private announcementService: AnnouncementService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      cancelvisit: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.schedulesList();
  }

  schedulesList() {
    this.scheduleService.getListVisists().subscribe(
      success => {
        this.response = success
        if (success.length > 0) {
          this.selectedScheduling = success[0];
          setTimeout(() => {
            let teste = document.getElementById(success[0]._id);
            teste.classList.add('scheduling-visit-selected');
            localStorage.setItem('announcementChecked', success[0]._id)
          }, 200);
        }
        this.verifyLike()

      },
      error => {
        console.error(error);
      }
    )
  }

  verifyLike() {
    this.announcementService.listLikes().subscribe(
      success => {
        for (let i = 0; i < success.length; i++) {
          if (success[i].announcement._id === this.selectedScheduling.announcement._id) {
            Object.assign(this.selectedScheduling.announcement, { liked: true });
          }
        }
      }
    )
  }

  cancelVisits(value: string) {
    if (value === 'cancelmodal') {
      this.confirmcancel = !this.confirmcancel;
    } else if (value === 'cancel') {
      this.location = true;
    }
  }

  goExpress() {
    this.router.navigate(['logged/express']);
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

  selectVisit(item) {
    this.selectedScheduling = item;
    this.verifyLike();
    let checkOld
    setTimeout(() => {
      checkOld = localStorage.getItem('announcementChecked');
    }, 100);
    let teste = document.getElementById(item._id);
    teste.classList.add('scheduling-visit-selected');
    setTimeout(() => {
      localStorage.setItem('announcementChecked', item._id)
      let removeOld = document.getElementById(checkOld);
      removeOld.classList.remove('scheduling-visit-selected')
    }, 110);
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
