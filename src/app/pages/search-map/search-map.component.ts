import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AnnouncementGetResponseDto } from 'src/app/dtos/announcement-get-response.dto';
import { UserGetResponseDto } from 'src/app/dtos/user-get-response.dtos';
import { AnnouncementService } from 'src/app/service/announcement.service';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-search-map',
  templateUrl: './search-map.component.html',
  styleUrls: ['./search-map.component.scss']
})
export class SearchMapComponent implements OnInit {
  response: AnnouncementGetResponseDto[] = [];
  user: UserGetResponseDto;
  form: FormGroup;

  iconlikeheart: boolean;
  paginationProduct: number = 1;
  countApartment: number;
  countCondominium: number;
  countHouse: number;
  countLoft: number;
  countKitnet: number;

  filtroSelected: any;
  propertyproducts: AnnouncementGetResponseDto[] = [];
  filterResult: AnnouncementGetResponseDto[] = [];
  orderBy: string = 'Selecione'
  recentlySeenIdsList: any = [];

  recentlySeenList: AnnouncementGetResponseDto[] = [];
  listLikes: AnnouncementGetResponseDto[] = [];
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


  constructor(
    private searchService: SearchService,
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

  goDetailProperty(){

  }
  likeHeart(){

  }
}
