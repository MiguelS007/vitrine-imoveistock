import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetImoveisHomeRequestDto } from 'src/app/dtos/get-imoveis-home-request.dto';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {

  form: FormGroup;

  request: GetImoveisHomeRequestDto[] = [];

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

  }
  retornaEstado(value) {
    if (value.charAt(0) == "f")
      return value;
  }
  searchKeyUp(value) {
    this.searchService.getSaearchImoveis().subscribe(
      success => {
        this.request = success;
        let search = value.target.value;

        // console.log(this.request[1].propertyType.indexOf(search) !== -1);
        // var theString = "I have been looking for Sam.";
        // var theWord = "looking";
        // var theCharacter = "I";
        // var theSubstring = "for Sam";


        // // Output — The word "looking" exists in given string.
        // if (theString.indexOf(theWord) !== -1) {
        //   console.log('The word "' + theWord + '" exists in given string.');
        // }

        // // Output — The character "I" exists in given string.
        // if (theString.indexOf(theCharacter) !== -1) {
        //   console.log('The character "' + theCharacter + '" exists in given string.');
        // }

        // // Output — The substring "for Sam" exists in given string.
        // if (theString.indexOf(theSubstring) !== -1) {
        //   console.log('The substring "' + theSubstring + '" exists in given string.');
        // }

        let searchvalue;
        console.log(this.request[1].propertyCharacteristics)
        for (let i = 0; i < this.request.length; i++) { 
          console.log(this.request[i].propertyCharacteristics)
          // searchvalue = this.request[i].propertyType

          //   if (this.request[i].propertyType) {
          //     searchvalue.push({ loft: this.request[i].propertyType });
          //     console.log();
          //   }
        }
        // this.resultType = searchvalue.length;
      },
      error => { console.log(error, 'o erro') }
    );
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

