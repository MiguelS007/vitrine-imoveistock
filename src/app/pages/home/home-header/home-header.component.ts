import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnnouncementGetResponsetDto } from 'src/app/dtos/announcement-get-response.dto';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {
  @Input() fieldvalue = '';
  form: FormGroup;

  response: AnnouncementGetResponsetDto[] = [];
  filterResponse: AnnouncementGetResponsetDto[] = [];

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

  resultType: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private searchService: SearchService
  ) {
    this.form = this.formBuilder.group({
      search: ['', [Validators.required]],
      typeStatus: ['', [Validators.required]],
      typeProperty: ['', [Validators.required]],
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
    this.searchService.searchLocalHome().subscribe(
      success => {
        this.response = success;
      },
      error => { console.log(error, 'o erro') }
    );
  }
  // make full search
  confirm() {

  }
  // search filter
  resultSearch(tableName: string) {
    if(tableName.length > 0) this.filtersearch = true
    else this.filtersearch = false
    this.filterResponse = this.response.filter(el => el.city.toLowerCase().includes(tableName.toLowerCase()))
    console.log(this.filterResponse);
  }


  buyOption(value: string) {
    if (value === 'buy') {
      this.collapsed = false;
    } else if (value === 'rent') {
      this.collapsed = true;
    }
  }

  typePropertyStep1(value: string) {
    if (value === 'residential') {
      this.searchfilterTypeProperty = 'residential';
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
    if (value === 'typeproperty') {
      this.typepropertydiv = !this.typepropertydiv;
      this.typeoffResidential = false;
      this.typeoffRural = false;
      this.typeoffCommercial = false;

    } else if (value === 'residential') {
      this.typeoffResidential = !this.typeoffResidential;
    } else if (value === 'rural') {
      this.typeoffRural = !this.typeoffRural;
    } else if (value === 'comercial') {
      this.typeoffCommercial = !this.typeoffCommercial;
    }
  }



  // addItem(value: string) {
  //   if (value === 'residential') {
  //   }
  // }



  propertyCharacteristics(value: string) {
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

