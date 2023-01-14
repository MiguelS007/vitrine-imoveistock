import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeGetResponsetDto } from 'src/app/dtos/home-get-response.dto';
import { UserGetResponseDto } from 'src/app/dtos/user-get-response.dtos';
import { DatamokService } from 'src/app/service/datamok.service';
import { SearchService } from 'src/app/service/search.service';
import { UserService } from 'src/app/service/user.service';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

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
  propertyproducts: any = [];
  paginationProduct: number = 1;

  countApartment: number;
  countCondominium: number;
  countHouse: number;
  countLoft: number;
  countKitnet: number;

  response: HomeGetResponsetDto[] = [];
  user: UserGetResponseDto;
  urlsimg: any = [];

  constructor(
    private router: Router,
    private datamokservice: DatamokService,
    private userService: UserService,
    private searchService: SearchService,
    private formBuilder: FormBuilder,

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
    this.products = this.datamokservice.resultSearch;
    this.propertyproducts = this.datamokservice.exclusiveProperties;

    this.searchService.getPropertyHome().subscribe(
      success => {
        this.response = success;
        let apartament = [];
        let condominium = [];
        let house = [];
        let loft = [];
        let kitnet = [];

        for (let i = 0; i < this.response.length; i++) {
          if (this.response[i].propertyCharacteristics === 'edificio')
            apartament.push({ apartament: this.response[i].propertyCharacteristics });

          if (this.response[i].propertyCharacteristics === 'casadecondominio')
            condominium.push({ condominium: this.response[i].propertyCharacteristics });

          if (this.response[i].propertyCharacteristics === 'casa')
            house.push({ house: this.response[i].propertyCharacteristics });

          if (this.response[i].propertyCharacteristics === 'loft')
            loft.push({ loft: this.response[i].propertyCharacteristics });

          if (this.response[i].propertyCharacteristics === 'kitnet')
            kitnet.push({ kitnet: this.response[i].propertyCharacteristics });
            
        }
        this.countApartment = apartament.length;
        this.countCondominium = condominium.length;
        this.countHouse = house.length;
        this.countLoft = loft.length;
        this.countKitnet = kitnet.length;

        console.log('numero');
      },
      error => { console.log(error, 'data not collected') }
    );
    this.userService.getUser().subscribe(
      success => {
        this.user = success;
        if (this.user?.photo?.location) {
          this.urlsimg.push(this.user.photo.location);
        }
      },
      error => {
        console.error(error, 'photo not collected');
      }
    );
  }
  likeHeart() {
    this.iconlikeheart = !this.iconlikeheart;
  }
  goDetailProperty() {
    this.router.navigate(['property-detail']);
  }


}
