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

  listEveryCity: { cidade: string; estado: string; render: string }[] = [];

  getSelectedCity: string;
  estados: { estados: { sigla: string; nome: string; cidades: string[] }[] };
  listDistricts: { district: string }[] = [];
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
    { item_id: 'ground', item_text: 'Terreno' },
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
    noFilteredDataAvailablePlaceholderText: 'Tipo de imóvel não encontrado!',
  };

  @ViewChild('dropdownRef') dropdownRef: any;

  viewLabelValueMax: boolean = true;

  labelValueSale: any = 'Valor até';
  labelValueRent: any = 'Valor até';

  labelValueBadroom: any = 'Quartos';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private announcementService: AnnouncementService,
    private toastrService: ToastrService
  ) {
    this.form = this.formBuilder.group({
      search: [''],
      propertyType: [''],
      chooseCity: [''],
      typeStatus: ['sale', [Validators.required]],
      typeProperty: [''],
      typePropertyDistrict: [''],
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
      next: (success) => (this.response = success),
      error: (error) => console.error(error, 'data not collected'),
    });

    this.announcementService.listCitys().subscribe({
      next: (data) => {
        data.forEach((item) => {
          if (item.city !== 'string' && item.uf.length === 2) {
            const city =
              item.city.charAt(0).toUpperCase() +
              item.city.slice(1).toLowerCase();
            this.listEveryCity.push({
              cidade: city,
              estado: item.uf.toUpperCase(),
              render: `${city}, ${item.uf.toUpperCase()}`,
            });
          }
        });
        this.listEveryCity.sort((a, b) => (a.cidade > b.cidade ? 1 : -1));
      },
    });

    // for (let i = 0; i < this.estados.estados.length; i++) {
    //   for (let j = 0; j < this.estados.estados[i].cidades.length; j++) {
    //     this.listEveryCity.push({
    //       cidade: this.estados.estados[i].cidades[j],
    //       estado: this.estados.estados[i].sigla,
    //       render: this.estados.estados[i].cidades[j] + ' , ' + this.estados.estados[i].sigla
    //     });
    //   }
    // }
  }

  removeLabel(event) {
    this.viewLabelValueMax = false;
  }

  selectValueSale(item) {
    this.labelValueSale = item;
  }

  selectValueRent(item) {
    this.labelValueRent = item;
  }

  onItemSelect(item: any) {
    const nativeElement = this.dropdownRef;
    if (nativeElement.isDropdownOpen === true) {
      nativeElement.closeDropdown();
    }
  }

  onItemDeSelect(item: any) {
    if (this.selectedItems.length === 0) {
      const nativeElement = this.dropdownRef;
      if (nativeElement.isDropdownOpen === true) {
        nativeElement.closeDropdown();
      }
    }
  }

  onSelectAll(items: any) {
    const nativeElement = this.dropdownRef;
    if (nativeElement.isDropdownOpen === true) {
      nativeElement.closeDropdown();
    }
  }

  onDeSelectAll(items) {
    const nativeElement = this.dropdownRef;
    if (nativeElement.isDropdownOpen === true) {
      nativeElement.closeDropdown();
    }
  }

  selectValueBadroom(item) {
    this.labelValueBadroom = item;
  }

  onChangeSearch(search: string) { }

  selectEvent(item: { cidade: string; estado: string }) {
    this.getSelectedCity = item.cidade;
    this.stateSelected = item.estado;
    this.form.patchValue({
      typePropertyCity: item.cidade,
      typePropertyState: item.estado,
    });
    this.listDistrictByCity(item.cidade);
  }

  listDistrictByCity(value: string) {
    this.announcementService.listDistrictsByCity(value).subscribe({
      next: (response) => {
        response.unshift({ district: 'Todos' });
        this.listDistricts = response;
      },
      error: (error) => console.log(error),
    });
  }

  customFilter(
    items: { cidade: string; estado: string; render?: string; district?: string }[],
    query: string
  ): { cidade: string; estado: string; render?: string; district?: string }[] {
    function removeAccents(text: string): string {
      text = text.toLowerCase();
      text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
      text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
      text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
      text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
      text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
      text = text.replace(new RegExp('[Ç]', 'gi'), 'c');
      return text.toLocaleLowerCase();
    }
  
    if (query.length < 2) {
      return [];
    }
  
    return items.filter((item) => {
      const normalizedQuery = removeAccents(query.toLowerCase());
  
      if (item.render) {
        const normalizedRender = removeAccents(item.render.toLowerCase());
        return normalizedRender.includes(normalizedQuery);
      }
  
      if (item.district) {
        const normalizedDistrict = removeAccents(item.district.toLowerCase());
        return normalizedDistrict.includes(normalizedQuery);
      }
  
      return false;
    });
  }

  selectEvent2(item) {
    this.form.controls['typePropertyDistrict'].setValue(item.district);
  }

  confirm() {
    if (this.stateSelected === 'Primeiro escolha um estado')
      this.form.controls['typePropertyState'].setValue('');
    console.log(this.form.value);

    let filter = {
      typeAd: this.typeAd,
      state: this.form.controls['typePropertyState'].value,
      city: this.getSelectedCity,
      district:
        this.form.controls['typePropertyDistrict'].value?.district ||
        this.form.controls['typePropertyDistrict'].value ||
        '',
      allResidential: this.typepropertyfull,
      untilValueSale: !isNaN(this.labelValueSale)
        ? Number(this.labelValueSale)
        : typeof this.labelValueSale === 'string'
          ? 0
          : this.labelValueSale,
      untilValueRent: !isNaN(this.labelValueRent)
        ? Number(this.labelValueRent)
        : typeof this.labelValueRent === 'string'
          ? 0
          : this.labelValueRent,
      goal: this.goal, //residencial , comercial
      // residencial
      styleProperty: this.stylePropertys, // EDIFICIL, TERRENO
      badRoomsQnt: !isNaN(this.labelValueBadroom)
        ? Number(this.labelValueBadroom)
        : typeof this.labelValueBadroom === 'string'
          ? 0
          : this.labelValueBadroom,
    };

    let city = this.getSelectedCity !== undefined ? this.getSelectedCity : '';

    let initialValue: number;

    if (filter.typeAd === 'sale') {
      // Neste componente não pode considerar valor inicial, apenas no search-component
      initialValue = 2;
    } else if (filter.typeAd === 'rent') {
      initialValue = filter.untilValueRent;
    } else {
      initialValue = 0;
    }

    let finalValue: number;

    if (filter.typeAd === 'sale') {
      finalValue = filter.untilValueSale;
    } else if (filter.typeAd === 'rent') {
      finalValue = filter.untilValueRent;
    } else {
      finalValue = 0;
    }

    let propertyTypeList = this.form.controls['propertyType'].value?.map(
      (item: any) => item.item_id
    );

    let requestList: AnnouncementFilterListResponseDto = {
      typeOfAdd: filter.typeAd,
      propertyType: !!propertyTypeList ? propertyTypeList : [],
      cityAddress: city,
      ufAddress: filter.state,
      districtAddress: filter?.district || '',
      initialValue: initialValue,
      finalValue: finalValue,
      bedrooms: filter.badRoomsQnt,
    };

    this.announcementService.listFilter(requestList).subscribe({
      next: (data) => {
        Object.assign(requestList, {
          propertyTypeList: this.form.controls['propertyType'].value,
        });
        localStorage.setItem('totalSearch', JSON.stringify(data.total));
        localStorage.setItem('filtro', JSON.stringify(requestList));
        localStorage.setItem('resultSearch', JSON.stringify(data.data));
        this.router.navigate(['/search']);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  buyOption(value: string) {
    this.typeAd = value;
    if (value === 'sale') {
      this.collapsed = false;
      this.viewLabelValueMax = true;
      this.labelValueRent = 'Valor até';
    } else if (value === 'rent') {
      this.collapsed = true;
      this.viewLabelValueMax = true;
      this.labelValueSale = 'Valor até';
    }
  }
}
