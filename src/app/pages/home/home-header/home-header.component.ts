import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  response: AnnouncementGetResponseDto[] = [];
  filterResponse: AnnouncementGetResponseDto[] = [];

  resultsearchfor: any = [];
  collapsed = false;
  typepropertydiv = false;
  typeoffResidential = false;
  typeoffRural = false;
  typeoffCommercial = false;
  searchresult: any;
  propertyCharacteristicsOptions = false;
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

  whatAreYouLookingForTitle: string = 'O que está buscando?';

  typeAd: string = 'sale';


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
      typePropertyLocal: ['', [Validators.required]],
      typePropertyOptions: ['', [Validators.required]],
      typeOfResidential: ['', [Validators.required]],
      typeOfRural: ['', [Validators.required]],
      typeOfCommercial: ['', [Validators.required]],
      checkvacancies: ['', [Validators.required]],
      checkbathrooms: ['', [Validators.required]],
      checksuites: ['', [Validators.required]],
      checkrooms: ['', [Validators.required]],
      checkcondominium: ['', [Validators.required]],
      checkfootage: ['', [Validators.required]],
      checkconstruction: ['', [Validators.required]],
      checkrenovated: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('userDto'));

    localStorage.removeItem('resultSearch');
    localStorage.removeItem('filtro')

    this.searchService.getPropertyListAll().subscribe(
      success => {
        this.response = success;
      },
      error => { console.log(error, 'data not collected') }
    );
  }

  // make full search
  confirm() {

    let oqEstaBuscando: string = '';

    if (this.whatAreYouLookingForTitle !== 'O que está buscando?') {
      if (this.whatAreYouLookingForTitle === 'Terreno') {
        oqEstaBuscando = 'terreno'
      } else if (this.whatAreYouLookingForTitle === 'Edifício') {
        oqEstaBuscando = 'edificio'
      } else if (this.whatAreYouLookingForTitle === 'Casa') {
        oqEstaBuscando = 'casa'
      }
    }

    let filter: any = {
      typeAd: this.typeAd,
      where: this.form.controls['typePropertyLocal'].value,
      whatAreYouLookingFor: oqEstaBuscando,
      propertyType: this.searchfilterTypeProperty,
      goal: this.searchfilterType,
      checkvacancies: this.form.controls['checkvacancies'].value,
      checkbathrooms: this.form.controls['checkbathrooms'].value,
      checksuites: this.form.controls['checksuites'].value,
      checkrooms: this.form.controls['checkrooms'].value,
      checkcondominium: this.form.controls['checkcondominium'].value,
      checkfootage: this.form.controls['checkfootage'].value,
      checkconstruction: this.form.controls['checkconstruction'].value,
      checkrenovated: this.form.controls['checkrenovated'].value,
    };

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

    let announcementCityGroup: AnnouncementGetResponseDto[] = [];

    if (filter.where !== '') {
      for (let i = 0; i < announcementTypeAdGroup.length; i++) {
        if (announcementTypeAdGroup[i].cityAddress === filter.where) {
          announcementCityGroup.push(announcementTypeAdGroup[i]);
        }
      }
    } else {
      announcementCityGroup = announcementTypeAdGroup;
    }

    let announcementPropertyCharacteristicsGroup: AnnouncementGetResponseDto[] = [];

    if (filter.whatAreYouLookingFor !== '') {
      for (let i = 0; i < announcementCityGroup.length; i++) {
        if (announcementCityGroup[i].propertyCharacteristics === filter.whatAreYouLookingFor) {
          announcementPropertyCharacteristicsGroup.push(announcementCityGroup[i]);
        }
      }

    } else {
      announcementPropertyCharacteristicsGroup = announcementCityGroup;
    }

    let announcementpropertyTypeGroup: AnnouncementGetResponseDto[] = [];

    if (filter.propertyType !== undefined) {
      for (let i = 0; i < announcementPropertyCharacteristicsGroup.length; i++) {
        if (announcementPropertyCharacteristicsGroup[i].goal === filter.propertyType) {
          announcementpropertyTypeGroup.push(announcementPropertyCharacteristicsGroup[i]);
        }
      }
    } else {
      announcementpropertyTypeGroup = announcementPropertyCharacteristicsGroup
    }

    let announcementGoalGroup: AnnouncementGetResponseDto[] = [];

    if (filter.goal !== undefined) {
      for (let i = 0; i < announcementpropertyTypeGroup.length; i++) {
        if (announcementpropertyTypeGroup[i].propertyType
          === filter.goal) {
          announcementGoalGroup.push(announcementpropertyTypeGroup[i]);
        }
      }
    } else {
      announcementGoalGroup = announcementpropertyTypeGroup
    }

    this.resultType = announcementGoalGroup;


  
    localStorage.setItem('filtro', JSON.stringify(filter))
    localStorage.setItem('resultSearch', JSON.stringify(this.resultType));
    this.router.navigate(['/search']);

  }

  // search filter
  resultSearch(tableName: string) {
    if (tableName.length > 0) this.filtersearch = true
    else this.filtersearch = false
    this.filterResponse;
    let removeRepets: any = [];
    for (let i = 0; i < this.response.length; i++) {
      removeRepets.push(this.response[i].cityAddress);
    };
    console.log(this.filterResponse)
    const filtered = removeRepets.filter((item, index) => removeRepets.indexOf(item) === index);
    this.filterResponse = filtered;
    this.filtersearch = true
  }

  selectCites(selected) {
    this.form.patchValue({
      typePropertyLocal: selected
    });
    this.filtersearch = false;
  }

  buyOption(value: string) {
    this.typeAd = value;
    if (value === 'sale') {
      this.collapsed = false;
    } else if (value === 'rent') {
      this.collapsed = true;
    }
  }

  typePropertyStep1(value: string) {
    let typepropertyTesteRename = value
    this.form.patchValue({
      typepropertyTeste: typepropertyTesteRename
    })
    if (value === 'residencial') {
      this.searchfilterTypeProperty = 'residencial';
    } else if (value === 'rural') {
      this.searchfilterTypeProperty = 'rural';
    } else if (value === 'comercial') {
      this.searchfilterTypeProperty = 'comercial';
    }
    this.typepropertydiv = !this.typepropertydiv;
  }



  typeProperty(value: string) {
    this.searchfilterType = value
    this.typeoffResidential = false;
    this.typeoffRural = false;
    this.typeoffCommercial = false;

  }


  typePropertyOptions(value: string) {
    this.propertyCharacteristicsOptions = false;
   console.log(value)
    if (value === 'typeproperty') {
      this.typeoffResidential = false;
      this.typeoffRural = false;
      this.typeoffCommercial = false;
    } else if (value === 'residencial') {
      this.typeoffResidential = !this.typeoffResidential;
    } else if (value === 'rural') {
      this.typeoffRural = !this.typeoffRural;
    } else if (value === 'comercial') {
      this.typeoffCommercial = !this.typeoffCommercial;
    } else if(value == undefined){
        this.alertPropertyOptions = true;
        setTimeout(() => {
          this.alertPropertyOptions = false;
        }, 3000)
    }
  }

  whatAreYouLookingFor(value) {
    this.whatAreYouLookingForTitle = value

  }



  // addItem(value: string) {
  //   if (value === 'residential') {
  //   }
  // }



  propertyCharacteristics(value: string) {
    this.typeoffResidential = false;
    this.typeoffRural = false;
    this.typeoffCommercial = false;
    const divviewoptions = document.querySelector('.divviewoptions') as HTMLElement
    if (value === 'propertyCharacteristics') {
      this.propertyCharacteristicsOptions = !this.propertyCharacteristicsOptions;
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
  hideView() {
    const divviewoptions = document.querySelector('.divviewoptions') as HTMLElement
    divviewoptions.style.display = 'none'
    this.hideviewoptions = false;
  }


}

