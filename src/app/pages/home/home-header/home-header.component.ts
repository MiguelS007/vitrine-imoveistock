import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {

  form: FormGroup;

  collapsed = false;
  typepropertydiv = false;
  typeoffResidential = false;
  typeoffRural = false;
  typeoffCommercial = false;
  propertyCharacteristicsOptions = false;

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

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
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
  }
  buyOption(value: string) {
    if (value === 'buy') {
      this.collapsed = false;
    } else if (value === 'rent') {
      this.collapsed = true;
    }
  }
  typePropertyOptions(value: string) {
    if (value === 'typeproperty') {
      this.typepropertydiv = !this.typepropertydiv;
    } else if (value === 'typeoffResidential') {
      this.typeoffResidential = !this.typeoffResidential;
    } else if (value === 'typeoffRural') {
      this.typeoffRural = !this.typeoffRural;
    } else if (value === 'typeoffCommercial') {
      this.typeoffCommercial = !this.typeoffCommercial;
    }
  }


  addItem(value: string) {

    if (value === 'residential') {

    }
  }



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
