import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewChildren, QueryList, Renderer2, Inject } from '@angular/core';
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
import { environment } from '../../../environments/environment';
import { Cep } from '../../dtos/cep';
import { CepService } from '../../service/cep.service';
import { SchedulingStep1Component } from './components/scheduling-step1/scheduling-step1.component';
import { SharedAnnouncementComponent } from './components/shared-announcement/shared-announcement.component';
import { PageScrollService } from 'ngx-page-scroll-core';
import { DOCUMENT } from '@angular/common';
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery';


@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {

  @ViewChild('imageEvidence', { static: true }) imageRef!: ElementRef;


  images: GalleryItem[] = [];

  infopaymobile = false;
  finalValueSale: number;
  finalValueRent: number;
  previewImg: any;
  imagePreviewAnnouncement: any = [];

  completeAddress: string;
  mapImgLink: string;

  @HostListener('window:scroll', [])
  checkScroll() {
    const scrollPosition = window.pageYOffset;
    const widthWindow = window.innerWidth;
    let interdistance = Math.trunc(scrollPosition);
    if (interdistance > 950) {
      this.infopaymobile = true;
    } else {
      this.infopaymobile = false;
    }
    // STATIC-INFO-PAY-IN-SCROLL-PAGE
    const infopaydesk = document.querySelector(
      '#infopaydesk'
    ) as HTMLElement;
    const colinfopay = document.querySelector(
      '#colinfopay'
    ) as HTMLElement;


    if (interdistance >= 1460) {
      if (widthWindow <= 1922) {
        colinfopay.style.alignSelf = 'self-end'
        infopaydesk.style.position = 'relative';
        infopaydesk.style.top = '0px';
        infopaydesk.style.maxWidth = '415px';
        infopaydesk.style.zIndex = '20';
      } else {
        colinfopay.style.alignSelf = 'self-end'
        infopaydesk.style.position = 'relative';
        infopaydesk.style.top = '0px';
        infopaydesk.style.maxWidth = '626px';
        infopaydesk.style.zIndex = '20';
      }
    } else {
      if (interdistance >= 511) {
        if (widthWindow <= 1922) {
          infopaydesk.style.position = 'fixed';
          infopaydesk.style.maxWidth = '415px';
          infopaydesk.style.top = '96px';
          infopaydesk.style.zIndex = '20';
        } else {
          infopaydesk.style.position = 'fixed';
          infopaydesk.style.maxWidth = '626px';
          infopaydesk.style.top = '96px';
          infopaydesk.style.zIndex = '20';
        }
      } else {
        infopaydesk.style.position = 'relative';
        infopaydesk.style.top = '0px';
        colinfopay.style.alignSelf = 'auto'
      }
    }

  }

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
  arrowinfoCondominio: boolean = false

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


  filterResult: AnnouncementGetResponseDto[] = [];
  listLikes: AnnouncementGetResponseDto[] = [];
  responseAnnouncement: AnnouncementGetResponseDto[] = [];
  propertyproducts: AnnouncementGetResponseDto[] = [];
  recentlySeenList: AnnouncementGetResponseDto[] = [];

  @ViewChild('myCaroucel') swiperRef!: any;

  imageEvidence: any;

  indexTeste: number;

  @ViewChildren('thumbPhotosArr') thumbPhotosArrList: QueryList<any>;

  currentIndex: any = -1;
  showFlag: any = false;

  imageSelectedFullScreen: any = [];

  valueViewSelectSale: boolean = true;

  showFeatureProperty: boolean = false;
  showFeatureDifferential: boolean = false;
  showFeatureFloor: boolean = false;
  showFeatureFloorCom: boolean = false;
  showFeatureRoofCom: boolean = false;
  showFeatureRoof: boolean = false;
  showFeatureFicaImovel: boolean = false;
  showFeatureFicaImovelCom: boolean = false;
  showCaracteristicas: boolean = false;
  showFeatureSport: boolean = false;
  showFeatureSportCom: boolean = false;
  showFeatureInfantile: boolean = false;
  showFeatureLeisure: boolean = false;
  showFeatureConveniences: boolean = false;
  showFeatureConveniencesCom: boolean = false;
  showSecurityFeature: boolean = false;
  showFeatureSecurityCom: boolean = false;
  showFeatureInfraCom: boolean = false;
  showFeatureCharacteristic: boolean = false;

  constructor(
    private router: Router,
    private datamokservice: DatamokService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private ngxSpinnerService: NgxSpinnerService,
    private announcementService: AnnouncementService,
    private modalService: NgbModal,
    private _cepService: CepService,
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

    window.scrollTo(0, 0);

  }

  openImagePreview() {
    // this.indexTeste = 1
    // this.thumbPhotosArrList.map(results => {
    //   if (results.nativeElement?.id === this.imageEvidence.key) {
    //     results.nativeElement.className = 'active-thumb-photo';
    //   } else {
    //     results.nativeElement.className = 'disable-thumb-photo ml-2';
    //   }
    // });
    // setTimeout(() => {
    //   this.swiperRef.swiperRef.on('slideChange', () => {
    //     const activeIndex = this.swiperRef.swiperRef.activeIndex;
    //     this.imageEvidence = this.response.photos[activeIndex];
    //     this.indexTeste = this.imageEvidence.index
    //     const activeImage = this.response.photos[activeIndex].key;
    //     this.thumbPhotosArrList.map(results => {
    //       if (results.nativeElement?.id === this.imageEvidence.key) {
    //         results.nativeElement.className = 'active-thumb-photo';

    //       } else {
    //         results.nativeElement.className = 'disable-thumb-photo ml-2';
    //       }
    //     });
    //   });
    // }, 100);


  }

  ngOnInit(): void {


    this.ngxSpinnerService.show()

    this.response = this.route.snapshot.data['resolve'];
    console.log('response page', this.response);
    this.ngxSpinnerService.hide();

    let resultadoVerify = localStorage.getItem('resultSearch');
    this.filterResult = JSON.parse(resultadoVerify);
    let valueIptu = parseInt(this.response.valueOfIptu) / 12;
    this.finalValueSale = valueIptu + parseInt(this.response.condominiumValue) + parseInt(this.response.saleValue);
    this.finalValueRent = valueIptu + parseInt(this.response.condominiumValue) + parseInt(this.response.leaseValue);


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

    this._getCompleteAddress();

    if (!this.response.photos[0].index) {
      for (let i = 0; i < this.response.photos.length; i++) {
        Object.assign(this.response.photos[i], { index: i + 1 })
      }
    }

    this.imageEvidence = this.response.photos[0];

    for (let i = 0; i < this.response.photos.length; i++) {
      this.images.push(new ImageItem({ src: this.response.photos[i].key, thumb: this.response.photos[i].key }))
    }

    if (this.response.typeOfAd === 'rent') {
      this.valueViewSelectSale = false;
    }


    this.showFeatureProperty = Object.values(this.response.featureProperty).some((value: boolean) => value === true);
    this.showFeatureDifferential = Object.values(this.response.featureDifferential).some((value: boolean) => value === true);
    this.showFeatureFloor = Object.values(this.response.featureFloor).some((value: boolean) => value === true);
    this.showFeatureFloorCom = Object.values(this.response.featureFloorCom).some((value: boolean) => value === true);
    this.showFeatureRoofCom = Object.values(this.response.featureRoofCom).some((value: boolean) => value === true);
    this.showFeatureRoof = Object.values(this.response.featureRoof).some((value: boolean) => value === true);
    this.showFeatureFicaImovel = Object.values(this.response.featureFicaImovel).some((value: boolean) => value === true);
    this.showFeatureFicaImovelCom = Object.values(this.response.featureFicaImovelCom).some((value: boolean) => value === true);
    this.showCaracteristicas = Object.values(this.response.featureCharacteristic).some((value: boolean) => value === true);
    this.showFeatureSport = Object.values(this.response.featureSport).some((value: boolean) => value === true);
    this.showFeatureSportCom = Object.values(this.response.featureSportCom).some((value: boolean) => value === true);
    this.showFeatureInfantile = Object.values(this.response.featureInfantile).some((value: boolean) => value === true);
    this.showFeatureLeisure = Object.values(this.response.featureLeisure).some((value: boolean) => value === true);
    this.showFeatureConveniences = Object.values(this.response.featureConveniences).some((value: boolean) => value === true);
    this.showFeatureConveniencesCom = Object.values(this.response.featureConveniencesCom).some((value: boolean) => value === true);
    this.showSecurityFeature = Object.values(this.response.securityFeature).some((value: boolean) => value === true);
    this.showFeatureSecurityCom = Object.values(this.response.featureSecurityCom).some((value: boolean) => value === true);
    this.showFeatureInfraCom = Object.values(this.response.featureInfraCom).some((value: boolean) => value === true);
    this.showFeatureCharacteristic = Object.values(this.response.characteristicInfrastructureOfTheCondominium).some((value: boolean) => value === true);

    console.log('verificar featureProperty imovel', this.response.featureProperty)
    console.log('verificar featureDifferential imovel', this.response.featureDifferential)
    console.log('verificar featureFloor imovel', this.response.featureFloor)
    console.log('verificar featureFloorCom imovel comercial', this.response.featureFloorCom)
    console.log('verificar featureRoofCom imovel comercial', this.response.featureRoofCom)
    console.log('verificar featureRoof imovel', this.response.featureRoof)
    console.log('verificar featureFicaImovel imovel', this.response.featureFicaImovel)
    console.log('verificar featureFicaImovelCom imovel comercial', this.response.featureFicaImovelCom)

    console.log('divisao para condominio')

    console.log('verificar caracteristicas', this.response.characteristicInfrastructureOfTheCondominium)
    console.log('verificar featureSport', this.response.featureSport)
    console.log('verificar featureSportCom', this.response.featureSportCom)
    console.log('verificar featureInfantile', this.response.featureInfantile)
    console.log('verificar featureLeisure', this.response.featureLeisure)
    console.log('verificar featureConveniences', this.response.featureConveniences)
    console.log('verificar featureConveniencesCom', this.response.featureConveniencesCom)
    console.log('verificar securityFeature', this.response.securityFeature)
    console.log('verificar featureSecurityCom', this.response.featureSecurityCom)
    console.log('verificar featureInfraCom', this.response.featureInfraCom)
    console.log('verificar featureCharacteristic', this.response.featureCharacteristic)

  }

  handleImageChange(event) {
    console.log(event)
  }

  typeOfAdSelect: string = 'sale';

  changeValueViewSelectSale(valueView) {
    this.valueViewSelectSale = !this.valueViewSelectSale
    this.typeOfAdSelect = valueView
  }

  closeEventHandler() {
    this.showFlag = false;
    this.currentIndex = -1;
  }

  onThumbClick(index: number): void {
    if (this.swiperRef) {
      this.swiperRef.swiperRef.slideTo(index);
    }
  }

  updateimage(event) {
    console.log(event)
  }

  openFullScreen() {
    this.imageSelectedFullScreen = []
    for (let iterator of this.response.photos) {
      this.imageSelectedFullScreen.push({ image: iterator.key });
    }
    this.showFlag = true;
  }

  public toNumber(paremetro1: string) {
    return Number(paremetro1)
  }


  btninteractionimg(value: string) {
    if (value === 'share') {
      this.modalService.open(SharedAnnouncementComponent, { centered: true })
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
      if (this.response.typeOfAd === 'both') {
        if (this.valueViewSelectSale) {
          localStorage.setItem('bothProposalType', 'sale')
        } else {
          localStorage.setItem('bothProposalType', 'rent')
        }
      }
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
    if (value === 16 && this.arrowinfoCondominio === false) {
      this.arrowinfoCondominio = true;
    } else {
      this.arrowinfoCondominio = false;
    }
  }

  scheduling(item) {
    localStorage.setItem('announcementOfScheduling', JSON.stringify(item));
    if (this.response.typeOfAd === 'both') {
      localStorage.setItem('typeOfAdSelect', this.typeOfAdSelect)
    } else {
      localStorage.setItem('typeOfAd', this.response.typeOfAd)
    }
    this.modalService.open(SchedulingStep1Component, { centered: true, backdrop: 'static', keyboard: false })
  }

  list() {
    this.announcementService.listAnnouncement().subscribe(
      response => {
        this.propertyproducts = response
        this.responseAnnouncement = response;
        for (let i = 0; i < response.length; i++) {
          this.previewImg = this.propertyproducts[i].photos;
        }

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
          console.error(error)
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
            console.error(error)
          }
        )
      } else if (this.listLikes[i]._id !== value) {
        this.announcementService.registerLike(request).subscribe(
          success => {
            this.list();
          },
          error => {
            console.error(error)
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

  _getCompleteAddress() {

    if (this.response.numberAddress && this.response.publicPlaceAddress && this.response.districtAddress && this.response.cityAddress && this.response.ufAddress) {
      this.completeAddress = `${this.response.numberAddress} ${this.response.publicPlaceAddress}, ${this.response.districtAddress}, ${this.response.cityAddress}, ${this.response.ufAddress}`;
      this._updateMap();
    }
    else if (this.response.cepAddress && this.response.numberAddress)
      this._cepService.buscarCep(this.response.cepAddress).then((cep: Cep) => {
        if (cep.logradouro) {
          this.completeAddress = `${this.response.numberAddress} ${cep.logradouro},${cep.bairro},${cep.cidade},${cep.uf}`;
          this._updateMap();
        }
      });
    else if (this.response.cepAddress) {
      this._cepService.buscarCep(this.response.cepAddress).then((cep: Cep) => {
        if (cep.logradouro) {
          this.completeAddress = `${cep.logradouro},${cep.bairro},${cep.cidade},${cep.uf}`;
          this._updateMap();
        }
      });
    }
  }

  private _updateMap() {
    this.mapImgLink = `https://maps.googleapis.com/maps/api/staticmap?zoom=17&size=400x400&markers=color:red|${this.completeAddress}&key=${environment.google.apiKey}`;
  }
}
