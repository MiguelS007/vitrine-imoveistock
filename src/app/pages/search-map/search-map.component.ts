import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalLoginComponent } from 'src/app/auth/modal-login/modal-login.component';
import { AnnouncementGetResponseDto } from 'src/app/dtos/announcement-get-response.dto';
import { UserGetResponseDto } from 'src/app/dtos/user-get-response.dtos';
import { AnnouncementService } from 'src/app/service/announcement.service';

@Component({
  selector: 'app-search-map',
  templateUrl: './search-map.component.html',
  styleUrls: ['./search-map.component.scss']
})
export class SearchMapComponent implements OnInit {
  response: AnnouncementGetResponseDto[] = [];
  user: UserGetResponseDto;
  form: FormGroup;
  formsearch: FormGroup;


  iconlikeheart: boolean;
  paginationProduct: number = 1;
  countApartment: number;
  countCondominium: number;
  countHouse: number;
  countLoft: number;
  countKitnet: number;
  products: any = [];
  messageNotSearch = false;


  filtroSelected: any;
  propertyproducts: AnnouncementGetResponseDto[] = [];
  filterResult: AnnouncementGetResponseDto[] = [];
  orderBy: string = 'Selecione'
  recentlySeenIdsList: any = [];

  recentlySeenList: AnnouncementGetResponseDto[] = [];
  listLikes: AnnouncementGetResponseDto[] = [];
  responseAnnouncement: AnnouncementGetResponseDto[] = [];


  filtroResultDisplay: {
    typeAd: string,
    where: string,
    whatAreYouLookingFor: string,
    propertyType: string,
    goal: string,
    checkvacancies: string,
    checkbathrooms: string,
    checksuites: string,
    checkrooms: string,
    checkcondominium: string,
    checkfootage: string,
    checkconstruction: string,
    checkrenovated: string,
  }

  
  selectTypeAd = 'Selecione';
  selectBathrooms = 'Banheiros';
  selectRooms = 'Dormitórios';
  selectVacancies = 'Vagas';
  valuePrices: 0;


  constructor(
    private formBuilder: FormBuilder,
    private ngxSpinnerService: NgxSpinnerService,
    private announcementService: AnnouncementService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.form = this.formBuilder.group({
      orderby: ['', [Validators.required]],

    });
  }
  ngOnInit(): void {

    this.ngxSpinnerService.show();
    this.list();

    let resultadoVerify = localStorage.getItem('resultSearch');
    this.filterResult = JSON.parse(resultadoVerify);

    let recentlySeenList = localStorage.getItem('recentlySeen');
    this.recentlySeenIdsList = JSON.parse(recentlySeenList);
    if (resultadoVerify !== null) {
      this.filterResult = JSON.parse(resultadoVerify);
      if (this.filterResult.length === 0) {
        this.messageNotSearch = true;
      }
    } else {
      this.filterResult = [];
    }
    if (this.recentlySeenIdsList !== null) {
      for (let i = 0; i < this.recentlySeenIdsList.length; i++) {
        this.announcementService.announcementGetById(this.recentlySeenIdsList[i]._id).subscribe(
          success => this.recentlySeenList.push(success),
          error => console.log(error)
        )
      }
    }

    let filtro = localStorage.getItem('filtro');
    this.filtroSelected = JSON.parse(filtro);

    let typeAdTranslate: string = ''

    if (this.filtroSelected?.typeAd === 'rent') {
      typeAdTranslate = 'Alugar'
    } else if (this.filtroSelected?.typeAd === 'sale') {
      typeAdTranslate = 'Venda'
    }

    this.filtroResultDisplay = {
      typeAd: typeAdTranslate,
      where: this.filtroSelected?.where,
      whatAreYouLookingFor: this.filtroSelected?.whatAreYouLookingFor,
      propertyType: this.filtroSelected?.propertyType,
      goal: this.filtroSelected?.goal,
      checkvacancies: '',
      checkbathrooms: '',
      checksuites: '',
      checkrooms: '',
      checkcondominium: '',
      checkfootage: '',
      checkconstruction: '',
      checkrenovated: '',
    }

    if (this.filterResult === null || this.filterResult.length === 0) {
      this.announcementService.listAnnouncement().subscribe(
        success => {
          this.filterResult = success;
          if (localStorage.getItem('user') !== null) {
            this.announcementService.listLikes().subscribe(
              success => {
                for (let i = 0; i < success.length; i++) {
                  for (let x = 0; x < this.filterResult.length; x++) {
                    if (success[i].announcement._id === this.filterResult[x]._id) {
                      Object.assign(this.filterResult[x], { liked: true });
                    }
                  }
                  this.listLikes.push(success[i].announcement)
                }
              }
            )
          }
          this.ngxSpinnerService.hide();
        },
      )
    } else {
      if (localStorage.getItem('user') !== null) {
        this.announcementService.listLikes().subscribe(
          success => {
            for (let i = 0; i < success.length; i++) {
              for (let x = 0; x < this.filterResult.length; x++) {
                if (success[i].announcement._id === this.filterResult[x]._id) {
                  Object.assign(this.filterResult[x], { liked: true });
                }
              }
              this.listLikes.push(success[i].announcement)
            }
          }
        )
      }
    }


    this.announcementService.listAnnouncement().subscribe(
      success => {
        this.propertyproducts = success
        this.response = success;
        this.ngxSpinnerService.hide();
      },
      error => { console.log(error, 'data not collected') }
    );
  }

  announcementSelected(value) {
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


    localStorage.setItem('recentlySeen', JSON.stringify(this.recentlySeenList))
    this.router.navigate([`announcement/detail/${value}`])
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
      error => { console.log(error, 'data not collected') }
    );
  }
  changeOderBy(value) {
    this.orderBy = value
  }
  searchByTypeAd(item) {
    if (item === 'sale') {
      this.selectTypeAd = 'Venda'
    } else if (item === 'rent') {
      this.selectTypeAd = 'Alugar'
    }
  }
  searchBy(item) {
    // SELECT BADROOMS
    if (item === '1') {
      this.selectRooms = '+1 Quarto'
    } else if (item === '2') {
      this.selectRooms = '+2  Quartos'
    } else if (item === '3') {
      this.selectRooms = '+3  Quartos'
    } else if (item === '4') {
      this.selectRooms = '+4  Quartos'
    } else if (item === '5') {
      this.selectRooms = '+5  Quartos'
    }
    // SELECT BATHROOMS
    else if (item === '1b') {
      this.selectBathrooms = '+1  Banheiro'
    } else if (item === '2b') {
      this.selectBathrooms = '+2  Banheiros'
    } else if (item === '3b') {
      this.selectBathrooms = '+3  Banheiros'
    } else if (item === '4b') {
      this.selectBathrooms = '+4  Banheiros'
    } else if (item === '5b') {
      this.selectBathrooms = '+5  Banheiros'
    }
    // SELECT ROOMS
    else if (item === 'tf') {
      this.selectVacancies = 'Tanto faz'
    } else if (item === '1v') {
      this.selectVacancies = '+1  Vagas'
    } else if (item === '2v') {
      this.selectVacancies = '+2  Vagas'
    } else if (item === '3v') {
      this.selectVacancies = '+3  Vagas'
    } else if (item === '4v') {
      this.selectVacancies = '+4  Vagas'
    } else if (item === '5v') {
      this.selectVacancies = '+5  Vagas'
    }
  }
  likeHeart(value, condition) {

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
    } else {
      if (condition === true) {
        this.announcementService.registerUnlike(request).subscribe(
          success => {
            this.list()
          },
          error => {
            console.log(error)
          }
        )
      } else if (condition === undefined) {
        this.announcementService.registerLike(request).subscribe(
          success => {
            this.list()
          },
          error => {
            console.log(error)
          }
        )
      }

    }



  }
}
