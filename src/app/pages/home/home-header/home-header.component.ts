import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { states, cities } from 'estados-cidades';
import { AnnouncementGetResponseDto } from 'src/app/dtos/announcement-get-response.dto';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {
  @Input() fieldvalue = '';
  form: FormGroup;
  @ViewChild('searchresult') targetElement: ElementRef;


  response: AnnouncementGetResponseDto[] = [];
  filterResponse: AnnouncementGetResponseDto[] = [];
  isChecked = false;
  stringValue = '';
  selectedResidencial = 'residencial'
  selectedRural = 'rural'
  selectedComercial = 'comercial'
  stateSelected = 'Primeiro escolha um estado'
  citySelected = 'Escolha uma cidade'
  cities: any[];
  states: any[];
  valueUntilSaleArray: any[] = [100000, 200000, 300000, 400000, 500000, 800000, 1000000, 2000000, 3000000, 4000000, 5000000, 10000000, 20000000,];
  valueUntilRentArray: any[] = [100, 200, 300, 400, 500, 800, 1000, 2000, 3000, 4000, 5000, 10000, 20000];
  badroomsArray: any[] = [1, 2, 3, 4, 5];
  goal: string;
  styleforPropertyE = 'edificio';
  styleforPropertyT = 'terreno';
  stylePropertys: string;
  checkedAll = false;
  checkedapartamento = false;
  checkedstudio = false;
  checkedAllResidencial = false;
  checkedComercial = false;

  // propertykitnet: 'kitnet';
  // propertycasacondominio: 'casacondominio';
  // propertycasadevila: 'casadevila';
  // propertycobertura: 'cobertura';
  // propertyflat: 'flat';
  // propertyloft: 'loft';
  // propertyterreno: 'terreno';





  resultsearchfor: any = [];
  collapsed = false;
  typepropertydiv = false;
  typeoffResidential = false;
  typeoffRural = false;
  typeoffCommercial = false;
  searchresult: any;
  filtersearch = false;
  liresultsearch: any = [];
  selectedcities: string;
  searchfilterTypeProperty: string;
  searchfilterType: string;
  viewvacancies = false;
  viewbathrooms = false;
  viewsuites = false;
  viewrooms = false;
  viewcondominium = false;
  viewfootage = false;
  viewconstruction = false;
  viewrenovated = false;
  hideviewoptions = false;
  showviewoptions = false;
  alertPropertyOptions = false;
  resultType: any = [];

  typePropertyAllTitle: string = 'Tipo do imóvel';

  typeAd: string = 'sale';
  typeofProperty: string;
  typepropertyfull: string;
  typepropertyCR: string;
  propertyapartamento: void;
  propertystudio: void;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private searchService: SearchService,
  ) {
    this.form = this.formBuilder.group({
      search: [''],
      typeStatus: ['', [Validators.required]],
      typeProperty: [''],
      typepropertyTeste: [''],
      typePropertyCity: [''],
      typePropertyState: [''],
      typePropertyValueRent: [''],
      typePropertyValueSale: [''],
      typePropertyBadrooms: [''],
      propertyapartamento: [''],
      propertystudio: [''],

    });
  }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('userDto'));

    localStorage.removeItem('resultSearch');
    localStorage.removeItem('filtro')

    this.searchService.getPropertyHomeExclusivity().subscribe(
      success => {
        this.response = success;
      },
      error => { console.log(error, 'data not collected') }
    );
    this.states = states();

  }


  typePropertyAll(value: string) {
    // if (this.checkedResidencial != false) {
    //   this.checkedResidencial = false;
    // }
    this.typepropertyfull = value;
    this.checkedAll = !this.checkedAll;
  }
  
  typePropertyComercialResidencial(value: string) {
    if (value === 'Todos os imóveis em Residencial') {
      // if(this.checkedResidencial === true){
      //   this.checkedResidencial === true
      // }else{
      //   this.checkedResidencial = !this.checkedResidencial;
      // }
      this.checkedAllResidencial = !this.checkedAllResidencial
    }
    // this.checkedAll = true;
  }

  // typePropertyCharacteristics(typeOf: string, item: string, value: string) {
  //   this.goal = typeOf;
  //   this.typeofProperty = value
  //   this.stylePropertys = item;
  //   this.typePropertyAllTitle = value
  //   this.checkedResidencial = true;
  //   this.checkedAll = true;


  // }
  typePropertyCharacteristics(typeOf: string, item: string) {
    this.goal = typeOf;
    this.typeofProperty
    this.stylePropertys = item;
    this.form.controls['propertyapartamento'].setValue('apartamento');
    // this.form.controls['propertystudio'].setValue('studio');
    // this.checkedResidencial = true;

    // apartamento
    if(this.checkedapartamento === false) this.checkedapartamento = true
    else this.checkedapartamento = false
    // studio
    if(this.checkedstudio === false) this.checkedstudio = true
    else this.checkedstudio = false
    
    this.checkedAllResidencial = false;
    this.checkedAll = true;
    console.log(this.form.controls['propertyapartamento'].value)
  }


  getCities() {
    this.cities = cities(this.stateSelected);
    console.log(this.stateSelected, this.citySelected)
  }

  confirm() {

    if (this.stateSelected === 'Primeiro escolha um estado') this.form.controls['typePropertyState'].setValue('')
    let filter: any = {
      typeAd: this.typeAd,
      state: this.form.controls['typePropertyState'].value,
      city: this.form.controls['typePropertyCity'].value,
      allResidential: this.typepropertyfull,
      untilValueSale: this.form.controls['typePropertyValueSale'].value,
      untilValueRent: this.form.controls['typePropertyValueRent'].value,
      goal: this.goal, //residencial , comercial
      typeofProperty: this.typeofProperty, // APARTAMENTO, CASA, STUDIO, FLAT, LOFT
      propertyapartamento: this.propertyapartamento,
      propertystudio: this.propertystudio,

      styleProperty: this.stylePropertys, // EDIFICIL, TERRENO
      badRoomsQnt: this.form.controls['typePropertyBadrooms'].value
    };

    console.log(filter.propertyapartamento);




    // ---------------------------
    let announcementTypeAdGroup: AnnouncementGetResponseDto[] = [];
    if (filter.typeAd !== '') {
      for (let i = 0; i < this.response.length; i++) {
        if (this.response[i].typeOfAd === filter.typeAd) {
          announcementTypeAdGroup.push(this.response[i]);
        }
      }
    } else {
      announcementTypeAdGroup = this.response;
    }
    // ---------------------------

    let announcementStateGroup: AnnouncementGetResponseDto[] = [];
    if (filter.state !== '') {
      for (let i = 0; i < announcementTypeAdGroup.length; i++) {
        if (announcementTypeAdGroup[i].ufAddress === filter.state) {
          announcementStateGroup.push(announcementTypeAdGroup[i]);
        }
      }
    } else {
      announcementStateGroup = announcementTypeAdGroup;
    }
    // ---------------------------

    let announcementCityGroup: AnnouncementGetResponseDto[] = [];
    if (filter.city !== '') {
      for (let i = 0; i < announcementStateGroup.length; i++) {
        if (announcementStateGroup[i].cityAddress === filter.city) {
          announcementCityGroup.push(announcementStateGroup[i]);
        }
      }
    } else {
      announcementCityGroup = announcementStateGroup;
    }
    // ---------------------------

    let announcementGoalGroup: AnnouncementGetResponseDto[] = [];
    if (filter.goal !== undefined) {
      for (let i = 0; i < announcementCityGroup.length; i++) {
        if (announcementCityGroup[i].goal === filter.goal) {
          announcementGoalGroup.push(announcementCityGroup[i]);
        }
      }
    } else {
      announcementGoalGroup = announcementCityGroup
    }
    // ---------------------------



    let announcementTypeofPropertyGroup: AnnouncementGetResponseDto[] = [];
    if (
      filter.propertyapartamento !== undefined,
      filter.propertystudio !== undefined
    ) {
      for (let i = 0; i < announcementGoalGroup.length; i++) {
        if (
          announcementGoalGroup[i].propertyType === filter.propertyapartamento ||
          announcementGoalGroup[i].propertyType === filter.propertystudio
        ) {
          announcementTypeofPropertyGroup.push(announcementGoalGroup[i]);
        }
      }
    } else {
      announcementTypeofPropertyGroup = announcementGoalGroup
    }
    // ---------------------------

    let announcementStylePropertyGroup: AnnouncementGetResponseDto[] = [];
    if (filter.styleProperty !== undefined) {
      for (let i = 0; i < announcementTypeofPropertyGroup.length; i++) {
        if (announcementTypeofPropertyGroup[i].propertyCharacteristics === filter.styleProperty) {
          announcementStylePropertyGroup.push(announcementTypeofPropertyGroup[i]);
        }
      }
    } else {
      announcementStylePropertyGroup = announcementTypeofPropertyGroup
    }
    // ---------------------------

    let announcementBadRoomsGroup: AnnouncementGetResponseDto[] = [];
    if (filter.badRoomsQnt !== '') {
      for (let i = 0; i < announcementStylePropertyGroup.length; i++) {
        if (announcementStylePropertyGroup[i].bedrooms >= filter.badRoomsQnt) {
          announcementBadRoomsGroup.push(announcementStylePropertyGroup[i]);
        }
      }
    } else {
      announcementBadRoomsGroup = announcementStylePropertyGroup
    }
    // ---------------------------

    let announcementValueUntilSaleGroup: AnnouncementGetResponseDto[] = [];
    if (filter.untilValueSale !== '') {
      for (let i = 0; i < announcementBadRoomsGroup.length; i++) {
        if (announcementBadRoomsGroup[i].saleValue >= filter.untilValueSale) {
          announcementValueUntilSaleGroup.push(announcementBadRoomsGroup[i]);
        }
      }
    } else {
      announcementValueUntilSaleGroup = announcementBadRoomsGroup
    }
    // ---------------------------

    let announcementValueUntilRentGroup: AnnouncementGetResponseDto[] = [];
    if (filter.untilValueRent !== '') {
      for (let i = 0; i < announcementValueUntilSaleGroup.length; i++) {
        if (announcementValueUntilSaleGroup[i].leaseValue >= filter.untilValueRent) {
          announcementValueUntilRentGroup.push(announcementValueUntilSaleGroup[i]);
        }
      }
    } else {
      announcementValueUntilRentGroup = announcementValueUntilSaleGroup
    }



    this.resultType = announcementValueUntilRentGroup;
    console.log(this.resultType, filter)


    localStorage.setItem('filtro', JSON.stringify(filter))
    localStorage.setItem('resultSearch', JSON.stringify(this.resultType));
    // this.router.navigate(['/search']);

  }


  buyOption(value: string) {
    this.typeAd = value;
    if (value === 'sale') {
      this.collapsed = false;
    } else if (value === 'rent') {
      this.collapsed = true;
    }
  }
}

