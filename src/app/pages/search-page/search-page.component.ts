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

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  form: FormGroup;
  iconlikeheart = false;
  products: any = [];
  propertyproducts: AnnouncementGetResponseDto[] = [];
  paginationProduct: number = 1;

  countApartment: number;
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

  constructor(
    private router: Router,
    private datamokservice: DatamokService,
    private userService: UserService,
    private searchService: SearchService,
    private formBuilder: FormBuilder,
    private ngxSpinnerService: NgxSpinnerService

  ) {
    this.form = this.formBuilder.group({
      searchwords: ['', [Validators.required]],
      localproperty: ['', [Validators.required]],
      typeproperty: ['', [Validators.required]],
      typeprice: ['', [Validators.required]],
      typebathroom: ['', [Validators.required]],
      typerooms: ['', [Validators.required]],
      typevacancies: ['', [Validators.required]],
      typeconstruction: ['', [Validators.required]],
      typefootagemax: ['', [Validators.required]],
      typefootagemin: ['', [Validators.required]],
      orderby: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {

    this.ngxSpinnerService.show();
    this.products = this.datamokservice.resultSearch;

    let resultadoVerify = localStorage.getItem('resultSearch');
    this.filterResult = JSON.parse(resultadoVerify);

    let recentlySeenList = localStorage.getItem('recentlySeen');
    this.recentlySeenIdsList = JSON.parse(recentlySeenList);

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
      typeAdTranslate = 'Venda'
    } else if (this.filtroSelected?.typeAd === 'sale') {
      typeAdTranslate = 'Alugar'
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
      this.searchService.getPropertyListAll().subscribe(
        success => {
          this.filterResult = success;
          this.ngxSpinnerService.hide();
        }
      )
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

  likeHeart() {
    this.iconlikeheart = !this.iconlikeheart;
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

  changeOderBy(value) {
    this.orderBy = value
  }


}
