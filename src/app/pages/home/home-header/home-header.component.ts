import { Component, OnInit, ViewChild, } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {

  form: FormGroup;
  response: AnnouncementGetResponseDto[] = [];
  filterResponse: AnnouncementGetResponseDto[] = [];
  isChecked = false;
  stringValue = '';

  stateSelected = 'Primeiro escolha um estado'
  citySelected = 'Escolha uma cidade'
  cities: any[];

  valueUntilSaleArray: any[] = [100000, 200000, 300000, 400000, 500000, 800000, 1000000, 2000000, 3000000, 4000000, 5000000, 10000000, 20000000,];
  valueUntilRentArray: any[] = [100, 200, 300, 400, 500, 800, 1000, 2000, 3000, 4000, 5000, 10000, 20000];
  badroomsArray: any[] = [1, 2, 3, 4, 5];
  goal: string;

  stylePropertys: string;



  typeAd: string = 'sale';
  typeofProperty: string;
  typepropertyfull: string;
  typepropertyCR: string;



  collapsed = false;




  listAllCity: any = [];
  keyword = 'name'
  getSelectedCity: string;
  estados: any;
  extensiveState: any;


  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Selecionar todos',
    unSelectAllText: 'Desmarcar todos',
    itemsShowLimit: 3,
    searchPlaceholderText: 'Procurar',
    allowSearchFilter: true
  };


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
      typepropertyTeste: [''],
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

    this.announcementService.listAnnouncement().subscribe(
      success => {
        this.response = success;
      },
      error => { console.error(error, 'data not collected') }
    );


    this.dropdownList = [
      { item_id: 'apartamento', item_text: 'Apartamento' },
      { item_id: 'casadecondominio', item_text: 'Casa de Condominio' },
      { item_id: 'casadevila', item_text: 'Casa de vila' },
      { item_id: 'studio', item_text: 'Studio' },
      { item_id: 'kitnet', item_text: 'Kitnet' },
      { item_id: 'cobertura', item_text: 'Cobertura' },
      { item_id: 'flat', item_text: 'Flat' },
      { item_id: 'loft', item_text: 'Loft' },
      { item_id: 'terreno', item_text: 'Terreno' },
      { item_id: 'comercial', item_text: 'Comercial' },
      { item_id: 'chacara', item_text: 'Chácara' },
      { item_id: 'casacomercial', item_text: 'Casa comercial' },
      { item_id: 'garagem', item_text: 'Garagem' },
      { item_id: 'pontocomercial', item_text: 'Ponto comercial' },
      { item_id: 'conjuntocomercial', item_text: 'Conjunto comercial' },
      { item_id: 'loja', item_text: 'Loja' },
      { item_id: 'salao', item_text: 'Salão' },
      { item_id: 'galpao', item_text: 'Galpão' },
      { item_id: 'deposito', item_text: 'Depósito' },
      { item_id: 'armazem', item_text: 'Armazem' },
      { item_id: 'hotel', item_text: 'Hotel' },
      { item_id: 'motel', item_text: 'Motel' },
      { item_id: 'pousada', item_text: 'Pousada' },
      { item_id: 'lajecorporativa', item_text: 'Laje Corporativa' },
      { item_id: 'prediointeiro', item_text: 'Predio Inteiro' },
    ];
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }


  selectEvent(item) {
    this.getSelectedCity = item.name;
    this.form.patchValue({
      typePropertyCity: this.getSelectedCity,
    });
  }
  onChangeSearch(search: string) {
  }

  confirm() {
    if (this.stateSelected === 'Primeiro escolha um estado') this.form.controls['typePropertyState'].setValue('')
    if (this.stateSelected === 'Acre') { this.form.controls['typePropertyState'].setValue('AC') } else if (this.stateSelected === 'Alagoas') { this.form.controls['typePropertyState'].setValue('AL') } else if (this.stateSelected === 'Amapá') { this.form.controls['typePropertyState'].setValue('AP') } else if (this.stateSelected === 'Amazonas') { this.form.controls['typePropertyState'].setValue('AM') } else if (this.stateSelected === 'Bahia') { this.form.controls['typePropertyState'].setValue('BA') } else if (this.stateSelected === 'Ceara') { this.form.controls['typePropertyState'].setValue('CE') } else if (this.stateSelected === 'Distrito Federal') { this.form.controls['typePropertyState'].setValue('DF') } else if (this.stateSelected === 'Espírito Santo') { this.form.controls['typePropertyState'].setValue('ES') } else if (this.stateSelected === 'Goiás') { this.form.controls['typePropertyState'].setValue('GO') } else if (this.stateSelected === 'Maranhão') { this.form.controls['typePropertyState'].setValue('MA') } else if (this.stateSelected === 'Mato Grosso') { this.form.controls['typePropertyState'].setValue('MT') } else if (this.stateSelected === 'Mato Grosso do Sul') { this.form.controls['typePropertyState'].setValue('MS') } else if (this.stateSelected === 'Minas Gerais') { this.form.controls['typePropertyState'].setValue('MG') } else if (this.stateSelected === 'Pará') { this.form.controls['typePropertyState'].setValue('PA') } else if (this.stateSelected === 'Paraíba') { this.form.controls['typePropertyState'].setValue('PB') } else if (this.stateSelected === 'Paraná') { this.form.controls['typePropertyState'].setValue('PR') } else if (this.stateSelected === 'Pernambuco') { this.form.controls['typePropertyState'].setValue('PE') } else if (this.stateSelected === 'Piauí') { this.form.controls['typePropertyState'].setValue('PI') } else if (this.stateSelected === 'Rio de Janeiro') { this.form.controls['typePropertyState'].setValue('RJ') } else if (this.stateSelected === 'Rio Grande do Norte') { this.form.controls['typePropertyState'].setValue('RN') } else if (this.stateSelected === 'Rio Grande do Sul') { this.form.controls['typePropertyState'].setValue('RS') } else if (this.stateSelected === 'Rondônia') { this.form.controls['typePropertyState'].setValue('RO') } else if (this.stateSelected === 'Roraima') { this.form.controls['typePropertyState'].setValue('RR') } else if (this.stateSelected === 'Santa Catarina') { this.form.controls['typePropertyState'].setValue('SC') } else if (this.stateSelected === 'São Paulo') { this.form.controls['typePropertyState'].setValue('SP') } else if (this.stateSelected === 'Sergipe') { this.form.controls['typePropertyState'].setValue('SE') } else if (this.stateSelected === 'Tocantins') { this.form.controls['typePropertyState'].setValue('TO') }
    let filter: any = {
      typeAd: this.typeAd,
      state: this.form.controls['typePropertyState'].value,
      city: this.getSelectedCity,
      allResidential: this.typepropertyfull,
      untilValueSale: this.form.controls['typePropertyValueSale'].value,
      untilValueRent: this.form.controls['typePropertyValueRent'].value,
      goal: this.goal, //residencial , comercial
      // residencial
      styleProperty: this.stylePropertys, // EDIFICIL, TERRENO
      badRoomsQnt: this.form.controls['typePropertyBadrooms'].value
    };


    let propertyTypeList = [];

    let city = ''
    if (this.getSelectedCity !== undefined) {
      city = this.getSelectedCity
    }


    let initialValue: number;
    if (filter.untilValueSale !== undefined) {
      initialValue = filter.untilValueSale
    }
    console.log(filter);

    for (let i = 0; i < this.form.controls['propertyType'].value.length; i++) {
      propertyTypeList.push(this.form.controls['propertyType'].value[i].item_id)
    }


    let requestList: AnnouncementFilterListResponseDto = {
      typeOfAdd: filter.typeAd,
      propertyType: propertyTypeList.filter(item => item),
      cityAddress: city,
      ufAddress: filter.state,
      initialValue: initialValue,
      finalValue: filter.untilValueSale,
      bedrooms: filter.badRoomsQnt,
    }


    console.log(this.getSelectedCity)

    console.log(requestList, 'request')


    this.announcementService.listFilter(requestList).subscribe({
      next: data => {
        Object.assign(requestList, { propertyTypeList: this.form.controls['propertyType'].value });
        localStorage.setItem('filtro', JSON.stringify(requestList))
        localStorage.setItem('resultSearch', JSON.stringify(data));
        this.router.navigate(['/search']);
      },
      error: error => {
        console.log(error)
      }
    })


  }


  buyOption(value: string) {
    this.typeAd = value;
    if (value === 'sale') {
      this.collapsed = false;
    } else if (value === 'rent') {
      this.collapsed = true;
    }
  }

  getEstados(value) {
    let valor = value.target.value;
    this.listAllCity = [];
    this.stateSelected = valor;
    for (let i = 0; i < estados.estados.length; i++) {
      if (valor === estados.estados[i].nome) {
        for (let x = 0; x < estados.estados[i].cidades.length; x++) {
          this.listAllCity.push({ name: estados.estados[i].cidades[x] })
          this.stateSelected = estados.estados[i].nome
          this.form.patchValue({
            typePropertyState: this.stateSelected,
          });
        }
      }
    }
  }
}