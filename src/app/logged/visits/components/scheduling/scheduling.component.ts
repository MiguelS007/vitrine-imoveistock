import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduleRegisterResponseDto } from 'src/app/dtos/schedule-register-response.dto';
import { AnnouncementService } from 'src/app/service/announcement.service';
import { ScheduleService } from 'src/app/service/schedule.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchedulingSelectedModalComponent } from './scheduling-selected-modal/scheduling-selected-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VisitCancelRequestDto } from 'src/app/dtos/visit-cancel-request.dto';
import { EditSchedulingModalComponent } from './edit-scheduling-modal/edit-scheduling-modal.component';
import { EditScheduling2ModalComponent } from './edit-scheduling2-modal/edit-scheduling2-modal.component';
import { EditScheduling3ModalComponent } from './edit-scheduling3-modal/edit-scheduling3-modal.component';

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

  selectedScheduling: ScheduleRegisterResponseDto;

  recentlySeenList: any = [];

  announcementChecked: string;

  itemSelectedForCancel: ScheduleRegisterResponseDto = {
    _id: '',
    cancellationReason: '',
    visitDate: new Date,
  };
  situationStatus: any;
  selectedSchedulingID: any;


  constructor(
    private scheduleService: ScheduleService,
    private router: Router,
    private announcementService: AnnouncementService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    this.form = this.formBuilder.group({
      cancelvisit: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.schedulesList();
  }





  verifyLike() {
    this.announcementService.listLikes().subscribe(
      success => {
        if (this.selectedScheduling !== undefined) {
          for (let i = 0; i < success.length; i++) {
            if (success[i].announcement._id === this.selectedScheduling.announcement._id) {
              Object.assign(this.selectedScheduling.announcement, { liked: true });
            }
          }
        }
      }
    )
  }


  openCancelVisitModal(item) {
    this.itemSelectedForCancel = item;
    this.location = true;
    // console.log('clicou')
  }

  confirmCancelVisitModal() {

    let request: VisitCancelRequestDto = {
      cancelationReason: this.form.controls['cancelvisit'].value
    }

    this.scheduleService.cancelVisit(this.itemSelectedForCancel._id, request).subscribe({
      next: data => {
        this.schedulesList();
        this.form.reset();
      },
      error: error => {
        console.log(error)
      }
    })
  }

  goExpress(announcementId) {
    this.router.navigate([`logged/express/${announcementId}`]);
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

  selectVisit(item, itemId) {
    document.querySelectorAll(".scheduling-visit-selected").forEach(element => {
      element.classList.remove("scheduling-visit-selected");
    });
    document.getElementById(itemId)!.classList.add("scheduling-visit-selected");
    this.selectedScheduling = item;
    this.selectedSchedulingID = itemId;
    this.verifyLike();
    let teste: any = localStorage.getItem('announcementChecked');
    if (window.screen.width < 992) {
      localStorage.setItem('announcementChecked', JSON.stringify(this.selectedScheduling))
      const modalRef = this.modalService.open(SchedulingSelectedModalComponent, { centered: true });
      modalRef.result.then(data => {
      }, error => {
        localStorage.removeItem('announcementChecked');
        this.schedulesList()
      });
    } else if (teste === item._id) {
      return
    } else {
      setTimeout(() => {
        localStorage.setItem('announcementChecked', item._id)
      }, 110);
    }
  }

  schedulesList() {
    this.scheduleService.getListVisists().subscribe(
      success => {
        this.response = success
        if (success.length > 0) {
          console.log(this.response)
          this.selectedScheduling = success[0];
          setTimeout(() => {
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

  editScheduling(selectedScheduling) {
    localStorage.setItem('announcementSelected', JSON.stringify(selectedScheduling));
    const modalRef = this.modalService.open(EditSchedulingModalComponent, { centered: true });
    modalRef.result.then(data => {
    }, error => {
      this.editScheduling2();
    });
  }

  editScheduling2() {
    const modalRef = this.modalService.open(EditScheduling2ModalComponent, { centered: true });
    modalRef.result.then(data => {
    }, error => {
      this.editScheduling3();
    });
  }

  editScheduling3() {
    const modalRef = this.modalService.open(EditScheduling3ModalComponent, { centered: true });
    modalRef.result.then(data => {
    }, error => {
      localStorage.removeItem('announcementSelected');
      localStorage.removeItem('dateScheduling');
      this.schedulesList();
    });
  }


}
