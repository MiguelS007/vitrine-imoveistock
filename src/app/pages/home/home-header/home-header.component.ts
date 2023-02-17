import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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


  selectedResidencial = 'residencial'
  selectedRural = 'rural'
  selectedComercial = 'comercial'
  stateSelected = 'Primeiro escolha um estado'
  citySelected = 'Escolha uma cidade'
  cities: any[];
  states: any[];
  valueUntilArray: any[] = [100000, 200000, 300000, 400000, 500000, 1000000, 2000000, 3000000, 4000000, 5000000, 10000000, 20000000,];
  badroomsArray: any[] = [1, 2, 3, 4, 5];
  goal: string;
  styleforPropertyE = 'edificio';
  styleforPropertyT = 'terreno';
  stylePropertys: string;



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


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private searchService: SearchService,
    private toastrService: ToastrService
  ) {
    this.form = this.formBuilder.group({
      search: ['', [Validators.required]],
      typeStatus: ['', [Validators.required]],
      typeProperty: ['', [Validators.required]],
      typepropertyTeste: [''],
      typePropertyCity: ['', [Validators.required]],
      typePropertyState: ['', [Validators.required]],
      typePropertyValue: ['', [Validators.required]],
      typePropertyBadrooms: ['', [Validators.required]],


      // typePropertyOptions: ['', [Validators.required]],
      // checkvacancies: ['', [Validators.required]],
      // checkbathrooms: ['', [Validators.required]],
      // checksuites: ['', [Validators.required]],
      // checkrooms: ['', [Validators.required]],
      // checkcondominium: ['', [Validators.required]],
      // checkfootage: ['', [Validators.required]],
      // checkconstruction: ['', [Validators.required]],
      // checkrenovated: ['', [Validators.required]],
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

  typePropertyAll(typeOf: string , item: string , value: string) {
    this.goal = typeOf;
    this.typeofProperty = value
    this.stylePropertys = item;
    this.typePropertyAllTitle = value
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
      untilValue: this.form.controls['typePropertyValue'].value,
      goal: this.goal, //residencial , comercial
      typeofProperty: this.typeofProperty, // APARTAMENTO, CASA, STUDIO, FLAT, LOFT
      styleProperty: this.stylePropertys, // EDIFICIL, TERRENO
      badRoomsQnt: this.form.controls['typePropertyBadrooms'].value
    };
    console.log('este e o tipão', filter.styleProperty)

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
    // --------------------------
    let announcementCityGroup: AnnouncementGetResponseDto[] = [];
    if (filter.city !== '') {
      for (let i = 0; i < announcementTypeAdGroup.length; i++) {
        if (announcementTypeAdGroup[i].cityAddress === filter.city) {
          announcementCityGroup.push(announcementTypeAdGroup[i]);
        }
      }
    } else {
      announcementCityGroup = announcementTypeAdGroup;
    }
    // --------------------------
    let announcementStateGroup: AnnouncementGetResponseDto[] = [];
    if (filter.state !== '') {
      for (let i = 0; i < announcementCityGroup.length; i++) {
        if (announcementCityGroup[i].ufAddress === filter.state) {
          announcementStateGroup.push(announcementCityGroup[i]);
        }
      }
    } else {
      announcementStateGroup = announcementCityGroup;
    }

    let announcementGoalGroup: AnnouncementGetResponseDto[] = [];
    if (filter.goal !== undefined) {
      for (let i = 0; i < announcementStateGroup.length; i++) {
        if (announcementStateGroup[i].goal === filter.goal) {
          announcementGoalGroup.push(announcementStateGroup[i]);
        }
      }
    } else {
      announcementGoalGroup = announcementStateGroup
    }
    // --------------------------
    let announcementTypeofPropertyGroup: AnnouncementGetResponseDto[] = [];
    if (filter.typeofProperty !== undefined) {
      for (let i = 0; i < announcementGoalGroup.length; i++) {
        if (announcementGoalGroup[i].propertyType === filter.typeofProperty) {
          announcementTypeofPropertyGroup.push(announcementGoalGroup[i]);
        }
      }
    } else {
      announcementTypeofPropertyGroup = announcementGoalGroup
    }
    // --------------------------
    let announcementValueUntilGroup: AnnouncementGetResponseDto[] = [];
    if (filter.untilValue !== undefined) {
      for (let i = 0; i < announcementTypeofPropertyGroup.length; i++) {
        if (announcementTypeofPropertyGroup[i].saleValue === filter.untilValue) {
          announcementValueUntilGroup.push(announcementTypeofPropertyGroup[i]);
        }
      }
    } else {
      announcementValueUntilGroup = announcementTypeofPropertyGroup
    }
    // --------------------------
    // let announcementStylePropertyGroup: AnnouncementGetResponseDto[] = [];
    // if (filter.styleProperty !== undefined) {
    //   for (let i = 0; i < announcementValueUntilGroup.length; i++) {
    //     if (announcementValueUntilGroup[i].propertyCharacteristics === filter.styleProperty) {
    //       announcementStylePropertyGroup.push(announcementValueUntilGroup[i]);
    //     }
    //   }
    // } else {
    //   announcementStylePropertyGroup = announcementValueUntilGroup
    // }
    // --------------------------



    this.resultType = announcementValueUntilGroup;
    console.log(this.resultType, filter)


    localStorage.setItem('filtro', JSON.stringify(filter))
    localStorage.setItem('resultSearch', JSON.stringify(this.resultType));
    // this.router.navigate(['/search']);

  }




  // filterCity(tableName: string) {
  //   if (tableName.length == 0) { this.filtersearch = false }
  //   else { this.filtersearch = true }
  //   this.filterResponse;
  //   let removeRepets: any = [];
  //   for (let i = 0; i < this.response.length; i++) {
  //     removeRepets.push(this.response[i].cityAddress);
  //   };
  //   const filtered = removeRepets.filter((item, index) => removeRepets.indexOf(item) === index);
  //   this.filterResponse = filtered;
  // }


  buyOption(value: string) {
    this.typeAd = value;
    if (value === 'sale') {
      this.collapsed = false;
    } else if (value === 'rent') {
      this.collapsed = true;
    }
  }

  // typePropertyStep1(value: string) {
  //   let typepropertyTesteRename = value
  //   this.form.patchValue({
  //     typepropertyTeste: typepropertyTesteRename
  //   })
  //   if (value === 'residencial') {
  //     this.searchfilterTypeProperty = 'residencial';
  //   } else if (value === 'rural') {
  //     this.searchfilterTypeProperty = 'rural';
  //   } else if (value === 'comercial') {
  //     this.searchfilterTypeProperty = 'comercial';
  //   }
  //   this.typepropertydiv = !this.typepropertydiv;
  // }

  // typeProperty(value: string) {
  //   this.searchfilterType = value
  //   this.typeoffResidential = false;
  //   this.typeoffRural = false;
  //   this.typeoffCommercial = false;
  // }

  // typePropertyOptions(value: string) {
  //   this.filtersearch = false;
  //   console.log(value)
  //   if (value === 'typeproperty') {
  //     this.typeoffResidential = false;
  //     this.typeoffRural = false;
  //     this.typeoffCommercial = false;
  //   } else if (value === 'residencial') {
  //     this.typeoffResidential = !this.typeoffResidential;
  //   } else if (value === 'rural') {
  //     this.typeoffRural = !this.typeoffRural;
  //   } else if (value === 'comercial') {
  //     this.typeoffCommercial = !this.typeoffCommercial;
  //   } else if (value == undefined) {
  //     this.alertPropertyOptions = true;
  //     setTimeout(() => {
  //       this.alertPropertyOptions = false;
  //     }, 3000)
  //   }
  // }



  propertyCharacteristics(value: string) {
    this.typeoffResidential = false;
    this.typeoffRural = false;
    this.filtersearch = false;
    this.typeoffCommercial = false;
    const divviewoptions = document.querySelector('.divviewoptions') as HTMLElement
    if (value === 'propertyCharacteristics') {
    } else if (value === 'vacancies') {
      this.viewvacancies = !this.viewvacancies;
      divviewoptions.style.display = 'flex'
    } else if (value === 'bathrooms') {
      divviewoptions.style.display = 'flex'
      this.viewbathrooms = !this.viewbathrooms;
    } else if (value === 'suites') {
      divviewoptions.style.display = 'flex'
      this.viewsuites = !this.viewsuites;
    } else if (value === 'rooms') {
      divviewoptions.style.display = 'flex'
      this.viewrooms = !this.viewrooms;
    } else if (value === 'condominium') {
      divviewoptions.style.display = 'flex'
      this.viewcondominium = !this.viewcondominium;
    } else if (value === 'footage') {
      divviewoptions.style.display = 'flex'
      this.viewfootage = !this.viewfootage;
    } else if (value === 'construction') {
      divviewoptions.style.display = 'flex'
      this.viewconstruction = !this.viewconstruction;
    } else if (value === 'renovated') {
      divviewoptions.style.display = 'flex'
      this.viewrenovated = !this.viewrenovated;
    }
    if (value) {
      this.hideviewoptions = true
    } else if (!value) {
      this.hideviewoptions = false
    };

  }


}

