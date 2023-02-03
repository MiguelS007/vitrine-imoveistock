import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, window } from 'rxjs';
import { ModalLoginComponent } from 'src/app/auth/modal-login/modal-login.component';
import { AnnouncementGetResponseDto } from 'src/app/dtos/announcement-get-response.dto';
import { ScheduleRegisterRequestDto } from 'src/app/dtos/schedule-register-request.dto';
import { UserGetResponseDto } from 'src/app/dtos/user-get-response.dtos';
import { AnnouncementService } from 'src/app/service/announcement.service';
import { DatamokService } from 'src/app/service/datamok.service';
import { SearchService } from 'src/app/service/search.service';
import { SchedulingStep1Component } from './components/scheduling-step1/scheduling-step1.component';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {

  form: FormGroup;
  formproperty: FormGroup;

  changeSubscription: Subscription;

  response: AnnouncementGetResponseDto;
  user: UserGetResponseDto;

  request: ScheduleRegisterRequestDto;

  detailprofile = false;
  arrow1: boolean = false;
  arrow2: boolean = false;
  arrow3: boolean = false;

  arrayDeDatas: any = [];

  dataSelecionada: any;
  horasSelecionada: string;

  iconshare = false;
  iconprint = false;
  segment = false;
  modallogin = false;
  modalscheduling = false;
  step1scheduling = true;
  step2scheduling = false;
  step3scheduling = false;

  onlyimg: any = [];
  previewimg: any = [];
  products: any = [];

  paginationProduct: number = 1;
  tourvirtual = false;
  propertyvideo = true;
  finalValue: number;

  filterResult: AnnouncementGetResponseDto[] = [];
  listLikes: AnnouncementGetResponseDto[] = [];
  responseAnnouncement: AnnouncementGetResponseDto[] = [];
  propertyproducts: AnnouncementGetResponseDto[] = [];
  recentlySeenList: AnnouncementGetResponseDto[] = [];


  constructor(
    private router: Router,
    private datamokservice: DatamokService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private ngxSpinnerService: NgxSpinnerService,
    private searchService: SearchService,
    private announcementService: AnnouncementService,
    private modalService: NgbModal

  ) {
    this.formproperty = this.formBuilder.group({
      searchwords: ['', [Validators.required]],
      localproperty: ['', [Validators.required]],
      typeproperty: ['', [Validators.required]],
      typeprice: ['', [Validators.required]],
      typebathroom: ['', [Validators.required]],
      typerooms: ['', [Validators.required]],
      typevacancies: ['', [Validators.required]],
      component: ['', [Validators.required]],
      typeconstruction: ['', [Validators.required]],
      typefootagemax: ['', [Validators.required]],
      typefootagemin: ['', [Validators.required]],
    });
    this.changeSubscription = this.datamokservice.getopModalLogin().subscribe(() => {
      this.modallogin = false;
    });
  }

  ngAfterViewInit(): void {
    for (let i = 1; i < 6; i++) {
      let hoje = new Date();
      hoje.setDate(hoje.getDate() + i);
      this.arrayDeDatas.push(hoje)
    }
    this.list();
  }

  ngOnInit(): void {
    this.ngxSpinnerService.show()
    this.onlyimg = this.datamokservice.onlypreview;
    this.previewimg = this.datamokservice.imagespreview;
    this.products = this.datamokservice.resultSearch;
    this.user = JSON.parse(localStorage.getItem('userDto'));

    this.response = this.route.snapshot.data['resolve'];
    this.ngxSpinnerService.hide()

    let resultadoVerify = localStorage.getItem('resultSearch');
    this.filterResult = JSON.parse(resultadoVerify);

    console.log(this.user?._id, this.response._id);

    // if (this.filterResult === null || this.filterResult.length === 0) {
    //   this.searchService.getPropertyListAll().subscribe(
    //     success => {
    //       this.filterResult = success;
    //       if (localStorage.getItem('user') !== null) {
    //         this.announcementService.listLikes().subscribe(
    //           success => {
    //             for (let i = 0; i < success.length; i++) {
    //               for (let x = 0; x < this.filterResult.length; x++) {
    //                 if (success[i].announcement._id === this.filterResult[x]._id) {
    //                   Object.assign(this.filterResult[x], { liked: true });
    //                 }
    //               }
    //               this.listLikes.push(success[i].announcement)
    //             }
    //           }
    //         )
    //       }
    //       this.ngxSpinnerService.hide();

    //     },
    //   )
    // } else {
    //   if (localStorage.getItem('user') !== null) {
    //     this.announcementService.listLikes().subscribe(
    //       success => {
    //         for (let i = 0; i < success.length; i++) {
    //           for (let x = 0; x < this.filterResult.length; x++) {
    //             if (success[i].announcement._id === this.filterResult[x]._id) {
    //               Object.assign(this.filterResult[x], { liked: true });
    //             }
    //           }
    //           this.listLikes.push(success[i].announcement)
    //         }
    //       }
    //     )
    //   }
    // }


    this.announcementService.listLikes().subscribe(
      success => {
        for (let i = 0; i < success.length; i++) {
          if (success[i].announcement._id === this.response._id) {
            Object.assign(this.response, { liked: true });
          }
          this.listLikes.push(success[i].announcement)
        }
      }
    )
  }



  btninteractionimg(value: string) {
    if (value === 'share') {
      this.iconshare = !this.iconshare;
    } else if (value === 'print') {
      this.iconprint = !this.iconprint;
    }
  }


  segmentvideo(value: string) {
    if (value === 'video') {
      this.segment = !this.segment;
      this.propertyvideo = true;
      this.tourvirtual = false;
    } else if (value === 'tour') {
      this.segment = !this.segment;
      this.propertyvideo = false;
      this.tourvirtual = true;
    }
  }


  selectDate(value) {

    this.dataSelecionada = value
  }

  selectTime(value) {
    this.horasSelecionada = value
  }
  goExpress() {
    this.router.navigate(['logged/express']);
  }



  hideDetailProperty() {
    this.detailprofile = !this.detailprofile;
  }

  openarrow(value: number) {
    if (value === 1 && this.arrow1 === false) {
      this.arrow1 = true;
    } else {
      this.arrow1 = false;
    }
    if (value === 2 && this.arrow2 === false) {
      this.arrow2 = true;
    } else {
      this.arrow2 = false;
    }
    if (value === 3 && this.arrow3 === false) {
      this.arrow3 = true;
    } else {
      this.arrow3 = false;
    }
  }

  scheduling(item) {
    if (localStorage.getItem('user') !== null) {
      localStorage.setItem('announcementOfScheduling', JSON.stringify(item))
      this.modalService.open(SchedulingStep1Component, { centered: true, backdrop: 'static', keyboard: false })
    } else {
      this.modalService.open(ModalLoginComponent, { centered: true })
    }
  }

  list() {
    this.searchService.getPropertyHomeExclusivity().subscribe(
      response => {
        this.propertyproducts = response
        this.responseAnnouncement = response;
        if (localStorage.getItem('user') !== null) {
          this.announcementService.listLikes().subscribe(
            success => {
              for (let i = 0; i < success.length; i++) {
                for (let x = 0; x < this.responseAnnouncement.length; x++) {
                  if (success[i].announcement._id === this.responseAnnouncement[x]._id) {
                    Object.assign(this.responseAnnouncement[x], { liked: true });
                  }
                }
                this.listLikes.push(success[i].announcement)
              }
            }
          )
        }
      },
      error => { console.error(error, 'data not collected') }
    );
  }

  likeHeartMain(value, condition) {
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
          this.response.liked = true;
          return
        },
        error => {
          console.error(error)
        }
      )
    } else {
      if (condition === true) {
        this.announcementService.registerUnlike(request).subscribe(
          success => {
            this.response.liked = false;
          },
          error => {
            console.error(error)
          }
        )
      } else if (condition === undefined || condition === false) {
        this.announcementService.registerLike(request).subscribe(
          success => {
            this.response.liked = true;
          },
          error => {
            console.error(error)
          }
        )
      }

    }

  }


  likeHeart(value) {

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
    }

    for (let i = 0; i < this.listLikes.length; i++) {
      if (this.listLikes[i]._id === value) {
        this.announcementService.registerUnlike(request).subscribe(
          success => {
            this.list()
          },
          error => {
            console.log(error)
          }
        )
      } else if (this.listLikes[i]._id !== value) {
        this.announcementService.registerLike(request).subscribe(
          success => {
            this.list();
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
  }


}