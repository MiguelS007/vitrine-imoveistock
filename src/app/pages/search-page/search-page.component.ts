import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnnouncementGetResponseDto } from 'src/app/dtos/announcement-get-response.dto';
import { UserGetResponseDto } from 'src/app/dtos/user-get-response.dtos';
import { DatamokService } from 'src/app/service/datamok.service';
import { SearchService } from 'src/app/service/search.service';
import { UserService } from 'src/app/service/user.service';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { NgxSpinnerService } from "ngx-spinner";
import { AnnouncementService } from 'src/app/service/announcement.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalLoginComponent } from 'src/app/auth/modal-login/modal-login.component';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  form: FormGroup;
  formfilter: FormGroup;
  iconlikeheart = false;
  products: any = [];
  propertyproducts: AnnouncementGetResponseDto[] = [];
  paginationProduct: number = 1;

  countApartment: number;
  filterbtn = true;
  countCondominium: number;
  countHouse: number;
  countLoft: number;
  countKitnet: number;

  response: AnnouncementGetResponseDto[] = [];
  user: UserGetResponseDto;
  urlsimg: any = [];

  filterResult: AnnouncementGetResponseDto[] = [];

  filtroSelected: any;

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

  orderBy: string = 'Selecione'

  recentlySeenIdsList: any = [];


  recentlySeenList: AnnouncementGetResponseDto[] = [];

  listLikes: AnnouncementGetResponseDto[] = [];

  messageNotSearch = false;

  selectTypeAd = 'Selecione';
  selectBathrooms = 'Banheiros';
  selectRooms = 'Dormitórios';
  selectVacancies = 'Vagas';
  valuePrices: 0;

  whatAreYouLookingForTitle: string = 'O que está buscando?';
  TypeProperty = 'Tipo de Imóvel'

  constructor(
    private router: Router,
    private datamokservice: DatamokService,
    private userService: UserService,
    private searchService: SearchService,
    private formBuilder: FormBuilder,
    private ngxSpinnerService: NgxSpinnerService,
    private announcementService: AnnouncementService,
    private modalService: NgbModal

  ) {
    this.form = this.formBuilder.group({
      searchwords: [''],
      localproperty: [''],
      propertyType: [''],
      typeproperty: [''],
      typeMaxPrice: [''],
      typeMinPrice: [''],
      typebathroom: [''],
      typerooms: [''],
      typevacancies: [''],
      typeconstruction: [''],
      typefootagemax: [''],
      typefootagemin: [''],
      orderby: [''],
    });

  }

  ngOnInit(): void {

    this.ngxSpinnerService.show();
    this.products = this.datamokservice.resultSearch;


    let recentlySeenList = localStorage.getItem('recentlySeen');
    this.recentlySeenIdsList = JSON.parse(recentlySeenList);

    let resultadoVerify = localStorage.getItem('resultSearch');
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
        this.searchService.getPropertyDetails(this.recentlySeenIdsList[i]._id).subscribe(
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

    if (filtro !== null) {
      this.form.patchValue({
        // typeproperty: this.filtroSelected.whatAreYouLookingFor,
        localproperty: this.filtroSelected.where,
        propertyType: this.filtroSelected.propertyType
      })
      this.searchByTypeAd(this.filtroSelected?.typeAd);

      if(this.filtroSelected.whatAreYouLookingFor !== '') {
        this.whatAreYouLookingFor(this.filtroSelected.whatAreYouLookingFor)
      }


      console.log(this.filtroSelected)
    }

    if (this.filterResult === null || this.filterResult.length === 0) {
      this.searchService.getPropertyListAll().subscribe(
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


    this.searchService.getPropertyHomeExclusivity().subscribe(
      success => {
        this.propertyproducts = success
        this.response = success;
        this.ngxSpinnerService.hide();
      },
      error => { console.log(error, 'data not collected') }
    );
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
          this.ngOnInit()
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
            this.ngOnInit()
          },
          error => {
            console.log(error)
          }
        )
      } else if (condition === undefined) {
        this.announcementService.registerLike(request).subscribe(
          success => {
            this.ngOnInit()
          },
          error => {
            console.log(error)
          }
        )
      }

    }
  }

  filterSearch() {
    this.filterbtn = !this.filterbtn
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
        if (list[i]._id !== value) {
          list.push(verify);
        }
      }
    }


    this.recentlySeenList = list;


    localStorage.setItem('recentlySeen', JSON.stringify(this.recentlySeenList))
    this.router.navigate([`announcement/detail/${value}`])
  }

  changeOderBy(value) {
    this.orderBy = value
  }

  searchByTypeAd(item) {
    if (item === 'sale') {
      this.selectTypeAd = 'Comprar'
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

  whatAreYouLookingFor(value) {
    this.whatAreYouLookingForTitle = value
  }
  filterTypeProperty(value) {
    this.TypeProperty = value
  }

}
