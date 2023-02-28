import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounceTime, fromEvent, Subscription } from 'rxjs';
import { ModalLoginComponent } from 'src/app/auth/modal-login/modal-login.component';
import { AnnouncementGetResponseDto } from 'src/app/dtos/announcement-get-response.dto';
import { ScheduleRegisterRequestDto } from 'src/app/dtos/schedule-register-request.dto';
import { UserGetResponseDto } from 'src/app/dtos/user-get-response.dtos';
import { AnnouncementService } from 'src/app/service/announcement.service';
import { DatamokService } from 'src/app/service/datamok.service';
import { SchedulingStep1Component } from './components/scheduling-step1/scheduling-step1.component';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {
  infopay = true;
  infopaymobile = false;
  // @HostListener('window:scroll')
  // checkScroll() {
  //   const scrollPosition = window.pageYOffset;
  //   const widthWindow = window.innerWidth;
  //   let interdistance = Math.trunc(scrollPosition);


  //   // INFO-PAY-MOBILE
  //   if (interdistance >= 270) {
  //     this.infopay = false;
  //     this.infopaymobile = true;
  //   } else {
  //     this.infopay = true;
  //     this.infopaymobile = false;
  //   }

  //   // STATIC-INFO-PAY-IN-SCROLL-PAGE
  //   const infopaydesk = document.querySelector(
  //     '#infopaydesk'
  //   ) as HTMLElement;
  //   const colinfopay = document.querySelector(
  //     '#colinfopay'
  //   ) as HTMLElement;


  //   if (interdistance >= 1460) {
  //     if (widthWindow <= 1922) {
  //       colinfopay.style.alignSelf = 'self-end'
  //       infopaydesk.style.position = 'relative';
  //       infopaydesk.style.top = '0px';
  //       infopaydesk.style.maxWidth = '415px';
  //       infopaydesk.style.zIndex = '20';
  //     }else{
  //       colinfopay.style.alignSelf = 'self-end'
  //       infopaydesk.style.position = 'relative';
  //       infopaydesk.style.top = '0px';
  //       infopaydesk.style.maxWidth = '626px';
  //       infopaydesk.style.zIndex = '20';
  //     }
  //   } else {
  //     if (interdistance >= 511) {
  //       if (widthWindow <= 1922) {
  //         infopaydesk.style.position = 'fixed';
  //         infopaydesk.style.maxWidth = '415px';
  //         infopaydesk.style.top = '96px';
  //         infopaydesk.style.zIndex = '20';
  //       } else {
  //         infopaydesk.style.position = 'fixed';
  //         infopaydesk.style.maxWidth = '626px';
  //         infopaydesk.style.top = '96px';
  //         infopaydesk.style.zIndex = '20';
  //       }
  //     } else {
  //       infopaydesk.style.position = 'relative';
  //       infopaydesk.style.top = '0px';
  //       colinfopay.style.alignSelf = 'auto'
  //     }
  //   }

  //   // console.log(interdistance, window.innerWidth)

  // }

  scroller: Subscription;


  form: FormGroup;
  formproperty: FormGroup;

  changeSubscription: Subscription;

  response: AnnouncementGetResponseDto;
  user: UserGetResponseDto;

  request: ScheduleRegisterRequestDto;

  detailprofile = false;
  arrow1 = false;
  arrow2 = false;
  arrow3 = false;
  arrowinfo = false;
  arrowpff = false;

  cardinfobuy;
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

  paginationProduct = 1;
  tourvirtual = false;
  propertyvideo = true;
  finalValue;

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

    this.scroller = fromEvent(window, 'scroll')
      .pipe(debounceTime(100))
      .subscribe(() => this.dealWithScroll(window.scrollY));

    this.ngxSpinnerService.show()
    this.onlyimg = this.datamokservice.onlypreview;
    this.previewimg = this.datamokservice.imagespreview;
    this.products = this.datamokservice.resultSearch;
    this.user = JSON.parse(localStorage.getItem('userDto'));

    this.response = this.route.snapshot.data['resolve'];
    this.ngxSpinnerService.hide()

    let resultadoVerify = localStorage.getItem('resultSearch');
    this.filterResult = JSON.parse(resultadoVerify);
    this.finalValue = (parseInt(this.response.valueOfIptu) + parseInt(this.response.condominiumValue) + this.response.saleValue);

    console.log(this.user?._id, this.response._id, this.finalValue);


    if (localStorage.getItem('user') !== null) {
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
  }

  dealWithScroll(y: number) {
    if (y >= 900) {
      this.infopay = false;
      this.infopaymobile = true;
    } else {
      this.infopay = true;
      this.infopaymobile = false;
    }
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

  closePause(videomedia: HTMLVideoElement) {
    videomedia.pause();
  }


  selectDate(value) {
    this.dataSelecionada = value
  }

  selectTime(value) {
    this.horasSelecionada = value
  }
  goExpress() {
    if (localStorage.getItem('user') !== null) {
      this.router.navigate([`logged/express/${this.response._id}`]);
    } else {
      this.modalService.open(ModalLoginComponent, { centered: true })
    }
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
    if (value === 24 && this.arrowpff === false) {
      this.arrowpff = true;
    } else {
      this.arrowpff = false;
    }
    if (value === 42 && this.arrowinfo === false) {
      this.arrowinfo = true;
    } else {
      this.arrowinfo = false;
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
    this.announcementService.listAnnouncement().subscribe(
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