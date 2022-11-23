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
  public maskCpf: Array<any> = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  collapsed = false;
  typepropertydiv = false;
  typeoffResidential = false;
  typeoffRural = false;
  typeoffCommercial = false;
  propertyCharacteristicsOptions = true;
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
      typeOff: ['', [Validators.required]],

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
    }else if(value === 'typeoffResidential'){
      this.typeoffResidential = !this.typeoffResidential;
    }else if(value === 'typeoffRural'){
      this.typeoffRural = !this.typeoffRural;
    }else if(value === 'typeoffCommercial'){
      this.typeoffCommercial = !this.typeoffCommercial;
    }
  }

  propertyCharacteristics(value: string){
    if(value === 'propertyCharacteristics'){
      this.propertyCharacteristicsOptions = !this.propertyCharacteristicsOptions;
    }else if(value === 'ok'){
      this.propertyCharacteristicsOptions = !this.propertyCharacteristicsOptions;
    }
  }
}
