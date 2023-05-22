import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AnnouncementGetResponseDto } from 'src/app/dtos/announcement-get-response.dto';
import { AnnouncementService } from '../../../service/announcement.service';
import estados from '../../../../assets/json/estados-cidades.json';
import { AnnouncementFilterListResponseDto } from '../../../dtos/announcement-filter-list-response.dto';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss'],
})
export class HomeHeaderComponent implements OnInit {
  form: FormGroup;
  response: AnnouncementGetResponseDto[] = [];
  filterResponse: AnnouncementGetResponseDto[] = [];
  isChecked = false;
  stringValue = '';

  stateSelected = 'Primeiro escolha um estado';
  citySelected = 'Escolha uma cidade';

  valueUntilSaleArray: number[] = [
    100000, 200000, 300000, 400000, 500000, 800000, 1000000, 2000000, 3000000,
    4000000, 5000000, 10000000, 20000000,
  ];

  valueUntilRentArray: number[] = [
    100, 200, 300, 400, 500, 800, 1000, 2000, 3000, 4000, 5000, 10000, 20000,
  ];

  badroomsArray: number[] = [1, 2, 3, 4, 5];
  goal: string;

  stylePropertys: string;

  typeAd: string = 'sale';
  typeofProperty: string;
  typepropertyfull: string;
  typepropertyCR: string;

  collapsed = false;

  // listAllCity: any = [];

  listEveryCity: { cidade: string; estado: string, render: string }[] = [];

  getSelectedCity: string;
  estados: { estados: { sigla: string; nome: string; cidades: string[] }[] };
  extensiveState: any;

  dropdownList = [
    { item_id: 'apartamento', item_text: 'Apartamento' },
    { item_id: 'casa', item_text: 'Casa' },
    { item_id: 'sobrado', item_text: 'Sobrado' },
    { item_id: 'sobradoemcondominio', item_text: 'Sobrado em Condomínio' },
    { item_id: 'casadecondominio', item_text: 'Casa de Condomínio' },
    { item_id: 'casadevila', item_text: 'Casa de Vila' },
    { item_id: 'studio', item_text: 'Studio' },
    { item_id: 'kitnet', item_text: 'Kitnet' },
    { item_id: 'cobertura', item_text: 'Cobertura' },
    { item_id: 'flat', item_text: 'Flat' },
    { item_id: 'loft', item_text: 'Loft' },
    { item_id: 'terreno', item_text: 'Terreno' },
    { item_id: 'comercial', item_text: 'Comercial' },
    { item_id: 'farm', item_text: 'Chácara' },
    { item_id: 'casacomercial', item_text: 'Casa Comercial' },
    { item_id: 'garagem', item_text: 'Garagem' },
    { item_id: 'pontocomercial', item_text: 'Ponto Comercial' },
    { item_id: 'conjuntocomercial', item_text: 'Conjunto Comercial' },
    { item_id: 'loja', item_text: 'Loja' },
    { item_id: 'salao', item_text: 'Salão' },
    { item_id: 'galpao', item_text: 'Galpão' },
    { item_id: 'deposito', item_text: 'Depósito' },
    { item_id: 'armazem', item_text: 'Armazém' },
    { item_id: 'hotel', item_text: 'Hotel' },
    { item_id: 'motel', item_text: 'Motel' },
    { item_id: 'pousada', item_text: 'Pousada' },
    { item_id: 'lajecorporativa', item_text: 'Laje Corporativa' },
    { item_id: 'prediointeiro', item_text: 'Prédio Inteiro' },
  ];

  selectedItems: any = [];
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Selecionar todos',
    unSelectAllText: 'Desmarcar todos',
    itemsShowLimit: 3,
    searchPlaceholderText: 'Procurar',
    allowSearchFilter: true,
  };

  @ViewChild('dropdownRef') dropdownRef: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private announcementService: AnnouncementService,
    private toastrService: ToastrService
  ) {
    this.form = this.formBuilder.group({
      search: [''],
      propertyType: [''],
      typeStatus: ['sale', [Validators.required]],
      typeProperty: [''],
      typePropertyCity: ['', [Validators.required]],
      typePropertyState: ['', [Validators.required]],
      typePropertyValueRent: [''],
      typePropertyValueSale: [''],
      typePropertyBadrooms: [''],
    });
    this.estados = estados;
  }
  ngOnInit() {
    localStorage.removeItem('resultSearch');
    localStorage.removeItem('filtro');

    this.announcementService.listAnnouncement().subscribe({
      next: (success) => {
        this.response = success;
      },
      error: (error) => console.error(error, 'data not collected'),
    });

    for (let i = 0; i < this.estados.estados.length; i++) {
      for (let j = 0; j < this.estados.estados[i].cidades.length; j++) {
        this.listEveryCity.push({
          cidade: this.estados.estados[i].cidades[j],
          estado: this.estados.estados[i].sigla,
          render: this.estados.estados[i].cidades[j] + ' , ' + this.estados.estados[i].sigla
        });
      }
    }
    this.listEveryCity.sort((a, b) => (a.cidade > b.cidade ? 1 : -1));
  }

  onItemSelect(item: any) {
    const nativeElement = this.dropdownRef
    if (nativeElement.isDropdownOpen === true) {
      nativeElement.closeDropdown()
    }
  }

  onItemDeSelect(item: any) {
    if (this.selectedItems.length === 0) {
      const nativeElement = this.dropdownRef
      if (nativeElement.isDropdownOpen === true) {
        nativeElement.closeDropdown()
      }
    }
  }

  onSelectAll(items: any) {
    const nativeElement = this.dropdownRef
    if (nativeElement.isDropdownOpen === true) {
      nativeElement.closeDropdown()
    }
  }

  onDeSelectAll(items) {
    const nativeElement = this.dropdownRef
    if (nativeElement.isDropdownOpen === true) {
      nativeElement.closeDropdown()
    }
  }

  onDropDownClose(event: any) {
    console.log('close')
  }

  onChangeSearch(search: string) { }

  selectEvent(item: { cidade: string; estado: string }) {
    this.getSelectedCity = item.cidade;
    this.stateSelected = item.estado;
    this.form.patchValue({
      typePropertyCity: item.cidade,
      typePropertyState: item.estado,
    });
  }

  confirm() {
    if (this.stateSelected === 'Primeiro escolha um estado')
      this.form.controls['typePropertyState'].setValue('');

    let filter = {
      typeAd: this.typeAd,
      state: this.form.controls['typePropertyState'].value,
      city: this.getSelectedCity,
      allResidential: this.typepropertyfull,
      untilValueSale: this.form.controls['typePropertyValueSale'].value,
      untilValueRent: this.form.controls['typePropertyValueRent'].value,
      goal: this.goal, //residencial , comercial
      // residencial
      styleProperty: this.stylePropertys, // EDIFICIL, TERRENO
      badRoomsQnt: this.form.controls['typePropertyBadrooms'].value,
    };

    let city = this.getSelectedCity !== undefined ? this.getSelectedCity : '';

    let initialValue: number =
      filter.untilValueSale !== undefined ? filter.untilValueSale : 0;

    let propertyTypeList = this.form.controls['propertyType'].value?.map(
      (item: any) => item.item_id
    );

    let requestList: AnnouncementFilterListResponseDto = {
      typeOfAdd: filter.typeAd,
      propertyType: !!propertyTypeList ? propertyTypeList : [],
      cityAddress: city,
      ufAddress: filter.state,
      initialValue: initialValue,
      finalValue: filter.untilValueSale,
      bedrooms: filter.badRoomsQnt,
    };

    console.log(requestList, 'request');


    this.announcementService.listFilter(requestList).subscribe({
      next: (data) => {
        Object.assign(requestList, {
          propertyTypeList: this.form.controls['propertyType'].value,
        });
        localStorage.setItem('filtro', JSON.stringify(requestList));
        localStorage.setItem('resultSearch', JSON.stringify(data));
        this.router.navigate(['/search']);
      },
      error: (error) => {
        console.log(error);
      },
    });
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
