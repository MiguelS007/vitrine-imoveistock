import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ScheduleRegisterResponseDto } from '../../../../../dtos/schedule-register-response.dto';
import { AnnouncementService } from '../../../../../service/announcement.service';
import { EditSchedulingModalComponent } from '../edit-scheduling-modal/edit-scheduling-modal.component';
import { EditScheduling2ModalComponent } from '../edit-scheduling2-modal/edit-scheduling2-modal.component';
import { EditScheduling3ModalComponent } from '../edit-scheduling3-modal/edit-scheduling3-modal.component';
import { ToastrService } from 'ngx-toastr';
import { LocationStrategy, PathLocationStrategy, Location } from '@angular/common';
import { AnnouncementVisitGetResponseDto } from 'src/app/dtos/announcement-visit-get-response.dto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AnnouncementRatingService } from 'src/app/service/announcement-rating.service';

@Component({
  selector: 'app-scheduling-selected-modal',
  templateUrl: './scheduling-selected-modal.component.html',
  styleUrls: ['./scheduling-selected-modal.component.scss'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class SchedulingSelectedModalComponent implements OnInit {

  form: FormGroup

  selectedScheduling: AnnouncementVisitGetResponseDto;

  recentlySeenList: any = [];

  location = false;

  confirmcancel = false;

  link = location.origin + '/register-companion/id/';

  showRateYourVisit: boolean;
  currentRate = 0;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private router: Router,
    private announcementService: AnnouncementService,
    private toastrService: ToastrService,
    private announcementRatingService: AnnouncementRatingService
  ) {
    this.form = this.formBuilder.group({
      ratingScore: [''],
      ratingMessage: ['']
    })
   }

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

  sharedIn(platform) {
    if(platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text= Gostaria de me acompanhar em uma visita a um imóvel? ${this.link + this.selectedScheduling._id}`)
    }
    if(platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?Gostaria de me acompanhar em uma visita a um imóvel?${this.link + this.selectedScheduling._id}`)
    }
    if(platform === 'copy') {
      this.copy()
    }
  }

  copy() {
    navigator.clipboard.writeText(this.link + this.selectedScheduling._id);

    this.toastrService.success('Sucesso', 'Link copiado!', {
      progressBar: true,
    });
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
    });
  }

  rateYourVisit(string) {
    if(string === 'yes') {
      this.showRateYourVisit = true
    } else {
      this.showRateYourVisit = false
      this.currentRate = 0
    }
  }

  submitReview() {
    let request = {
      ratingScore: this.form.controls['ratingScore'].value,
      ratingMessage: this.form.controls['ratingMessage'].value,
      announcementId: this.selectedScheduling.announcement._id,
    }
    
    this.announcementRatingService.registerAnnouncementRating(request).subscribe({
      next: (data) =>
        this.saveReviewSuccess(data),
    })
  }

  saveReviewSuccess(data: any) {
    this.toastrService.success('Sucesso', 'Avaliação enviada!', {
      progressBar: true,
    });
  }


}
