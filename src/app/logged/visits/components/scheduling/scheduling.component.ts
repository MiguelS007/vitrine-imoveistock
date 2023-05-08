import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
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
import { SchedulingStep1Component } from '../../../../pages/property-detail/components/scheduling-step1/scheduling-step1.component';
import { ModalLoginComponent } from '../../../../auth/modal-login/modal-login.component';
import { ToastrService } from 'ngx-toastr';
import { AnnouncementVisitGetResponseDto } from 'src/app/dtos/announcement-visit-get-response.dto';
import { LocationStrategy, PathLocationStrategy, Location } from '@angular/common';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.scss'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class SchedulingComponent implements OnInit {
  @ViewChildren('announcements') announcementList: QueryList<any>;

  response: any[] = [];
  responseSchedules: AnnouncementVisitGetResponseDto[] = [];
  nameweek: string;
  confirmcancel = false;
  location = false;
  namemounth: string;
  products: any;
  paginationProduct: number = 1;


  form: FormGroup;

  selectedScheduling: AnnouncementVisitGetResponseDto;

  recentlySeenList: any = [];

  announcementChecked: string;

  itemSelectedForCancel: AnnouncementVisitGetResponseDto;
  situationStatus: any;
  selectedSchedulingStatus: any;

  link = location.origin + '/register-companion/id/';

  constructor(
    private scheduleService: ScheduleService,
    private router: Router,
    private announcementService: AnnouncementService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastrService: ToastrService
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
          this.selectedSchedulingStatus = success[0].status;
          console.log(this.selectedSchedulingStatus)
          setTimeout(() => {
            if (window.screen.width > 992) {
              this.selecionarVisita(this.selectedScheduling, this.selectedSchedulingStatus);
            }
          }, 100);
        }
        this.verifyLike()
        console.log(this.response)
      },
      error => {
        console.error(error);
      }
    )
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

    this.toastrService.success('Sucesso', 'Código copiado!', {
      progressBar: true,
    });
  }

  selecionarVisita(item, status) {
    this.announcementList.map(results => {
      if (results.nativeElement?.id === item._id) {
        results.nativeElement.className = 'scheduling-visit-selected w-100 h-auto bg-white box-shadow border-radius-10 mb-4 p-4';
        localStorage.setItem('announcementChecked', JSON.stringify(item))
        localStorage.setItem('announcementStatus', status);
        if (window.screen.width < 992) {
          const modalRef = this.modalService.open(SchedulingSelectedModalComponent, { centered: true });
          modalRef.result.then(data => {
          }, error => {
            this.schedulesList()
          });
        }
        this.selectedScheduling = item;
        this.selectedSchedulingStatus = status;
      } else {
        results.nativeElement.className = 'w-100 h-auto bg-white box-shadow border-radius-10 mb-4 p-4';
      }
    });
  }

  removeVisit(item) {
    let request = {
      status: 'remove',
    }
    this.scheduleService.removeVisit(item._id, request).subscribe({
      next: data => {
        this.schedulesList();
      },
      error: error => {
        console.error(error)
      }
    })
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
        console.error(error)
      }
    })
  }

  goExpress(announcement) {
    this.router.navigate([`logged/express/${announcement._id}`]);
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

  // selectVisit(item, itemId) {
  //   document.querySelectorAll(".scheduling-visit-selected").forEach(element => {
  //     element.classList.remove("scheduling-visit-selected");
  //   });
  //   document.getElementById(itemId)!.classList.add("scheduling-visit-selected");
  //   this.selectedScheduling = item;
  //   this.selectedSchedulingStatus = status;
  //   this.verifyLike();
  //   let teste: any = localStorage.getItem('announcementChecked');
  //   this.scheduleService.getListVisists().subscribe(
  //     success => {
  //       this.response = success
  //       if (success.length > 0) {
  //         for (let i = 0; i < this.response.length; i++) {
  //           if (item._id === this.response[i]._id) {
  //             this.situationStatus = this.response[i].status;
  //           }
  //         }
  //       }
  //     },
  //     error => {
  //       console.error(error);
  //     }
  //   )
  //   console.log(this.selectedSchedulingStatus, 'status')
  //   if (window.screen.width < 992) {
  //     localStorage.setItem('announcementChecked', JSON.stringify(this.selectedScheduling, this.selectedSchedulingStatus))
  //     const modalRef = this.modalService.open(SchedulingSelectedModalComponent, { centered: true });
  //     modalRef.result.then(data => {
  //     }, error => {
  //       localStorage.removeItem('announcementChecked');
  //       this.schedulesList()
  //     });
  //   } else if (teste === item._id) {
  //     return
  //   } else {
  //     setTimeout(() => {
  //       localStorage.setItem('announcementChecked', item._id)
  //     }, 110);
  //   }
  // }

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
    if (selectedScheduling.status !== 'cancel') {
      localStorage.setItem('announcementSelected', JSON.stringify(selectedScheduling));
      const modalRef = this.modalService.open(EditSchedulingModalComponent, { centered: true });
      modalRef.result.then(data => {
      }, error => {
        setTimeout(() => {
          this.schedulesList();
        }, 9999);
      });
    } else if (selectedScheduling.status === 'cancel') {
      localStorage.setItem('announcementOfScheduling', JSON.stringify(selectedScheduling.announcement))
      this.modalService.open(SchedulingStep1Component, { centered: true, backdrop: 'static', keyboard: false })
    }
  }

}
