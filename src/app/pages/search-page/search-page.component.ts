import { Component, OnInit, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnnouncementGetResponseDto } from 'src/app/dtos/announcement-get-response.dto';
import { UserGetResponseDto } from 'src/app/dtos/user-get-response.dtos';
import { DatamokService } from 'src/app/service/datamok.service';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { NgxSpinnerService } from "ngx-spinner";
import { AnnouncementService } from 'src/app/service/announcement.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalLoginComponent } from 'src/app/auth/modal-login/modal-login.component';
import estados from '../../../assets/json/estados-cidades.json';
import { AnnouncementFilterListResponseDto } from '../../dtos/announcement-filter-list-response.dto';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { propertyTypesConst } from 'src/app/utils/propertyTypes';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})

export class SearchPageComponent implements OnInit {

  form: FormGroup;
  formfilter: FormGroup;
  iconlikeheart = false;
  products: any = [];
  propertyproducts: AnnouncementGetResponseDto[] = [];
  paginationProduct: number = 1;

  countApartment: number;
  filterbtn = true;
  countCondominium: number;
  countHouse: number;
  countLoft: number;
  countKitnet: number;

  stateSelected = 'Escolha o Estado'
  citySelected = 'Selecione uma ciadade'

  response: AnnouncementGetResponseDto[] = [];
  user: UserGetResponseDto;
  urlsimg: any = [];

  filterResult: AnnouncementGetResponseDto[] = [];

  filtroResultDisplay: AnnouncementFilterListResponseDto;

  orderBy: string = 'Selecione';

  recentlySeenIdsList: any = [];


  recentlySeenList: AnnouncementGetResponseDto[] = [];

  listLikes: AnnouncementGetResponseDto[] = [];

  messageNotSearch = false;

  selectTypeAd = 'Selecione';
  selectBathrooms = 'Banheiros';
  selectBadRooms = 'Dormitórios';
  selectSuites = 'Suítes';
  selectVacancies = 'Vagas';
  valuePrices: 0;

  selectFilterOfAd: string = '';

  stylePropertyTitle: string = 'O que está buscando?';
  TypeProperty = 'Tipo de Imóvel';


  listAllForFilter: AnnouncementGetResponseDto[] = [];
  listLikesForFilter: AnnouncementGetResponseDto[] = [];

  listAllCity: any = [
    {
      cidade: ''
    }
  ];


  modalFilter: boolean = false;

  formModal: FormGroup;

  modalFilterOpen: boolean = false;
  states: string[];
  cities: string[];

  keyword = 'name'
  getSelectedCity: string;

  estados: { estados: { sigla: string; nome: string; cidades: string[] }[] };
  listEveryCity: { cidade: string; estado: string, render: string }[] = [];

  listOfPrices: any = [];

  @ViewChild('dropdownRef') dropdownRef: any;


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
    { item_id: 'armazem', item_text: 'Armazem' },
    { item_id: 'hotel', item_text: 'Hotel' },
    { item_id: 'motel', item_text: 'Motel' },
    { item_id: 'pousada', item_text: 'Pousada' },
    { item_id: 'lajecorporativa', item_text: 'Laje Corporativa' },
    { item_id: 'prediointeiro', item_text: 'Prédio Inteiro' },
  ];

  selectedItems: any[] = [];
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Selecionar todos',
    unSelectAllText: 'Desmarcar todos',
    itemsShowLimit: 1,
    searchPlaceholderText: 'Procurar',
    allowSearchFilter: true
  };

  constructor(
    private router: Router,
    private datamokservice: DatamokService,
    private formBuilder: FormBuilder,
    private ngxSpinnerService: NgxSpinnerService,
    private announcementService: AnnouncementService,
    private modalService: NgbModal

  ) {

    this.form = this.formBuilder.group({
      typeStatus: ['', [Validators.required]],
      searchwords: [''],
      propertyType: [''],
      typePropertyState: ['', [Validators.required]],
      typePropertyCity: ['', [Validators.required]],
      typeMaxPrice: [''],
      typeMinPrice: [''],
      typeBathRoom: [''],
      typeBadrooms: [''],
      typeSuites: [''],
      typevacancies: [''],
      typeconstruction: [''],
      typefootagemax: [''],
      typefootagemin: [''],
      orderby: [''],
    });

    this.formModal = this.formBuilder.group({
      searchwords: [''],
      propertyType: [''],
      typePropertyState: [''],
      typePropertyCity: [''],
      typeMaxPrice: [''],
      typeMinPrice: [''],
      typeBathRoom: [''],
      typeBadrooms: [''],
      typeSuites: [''],
      typevacancies: [''],
      typeconstruction: [''],
      typefootagemax: [''],
      typefootagemin: [''],
      orderby: [''],
    });
    this.estados = estados;
  }

  ngOnInit(): void {
    this.ngxSpinnerService.show();

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

    let filtro: any = localStorage.getItem('filtro');

    if (filtro !== null) {

      filtro = JSON.parse(filtro);

      this.searchByTypeAd(filtro.typeOfAdd);

      this.citySelected = filtro.cityAddress;
      this.getSelectedCity = filtro.cityAddress;

      if (!!filtro.ufAddress) this.stateSelected = filtro.ufAddress;

      this.form.patchValue({
        typeStatus: filtro.typeOfAdd,
        typePropertyCity: filtro.cityAddress + ' , ' + this.stateSelected,
        typePropertyState: filtro.ufAddress,
        typeMaxPrice: filtro.finalValue,
      });

      if (filtro.propertyTypeList.length > 0)
        this.selectedItems = [...filtro.propertyTypeList]

      this.formModal.patchValue({
        typePropertyCity: filtro.cityAddress + ' , ' + this.stateSelected,
        typePropertyState: filtro.ufAddress,
        typeMaxPrice: filtro.finalValue,
      });

      this.searchByBadRoom(filtro.bedrooms)

      this.filtroResultDisplay = {
        ufAddress: filtro?.ufAddress,
        cityAddress: filtro?.cityAddress,
        initialValue: filtro?.initialValue,
        finalValue: filtro?.finalValue,
        bedrooms: filtro?.bedrooms,
        suites: filtro?.suites,
        propertyType: filtro?.propertyType,
        typeOfAdd: filtro?.typeOfAdd,
        bathrooms: filtro?.bathrooms,
        finalUsefulArea: filtro?.finalUsefulArea,
        goal: filtro?.goal,
        initialUsefulArea: filtro?.initialUsefulArea,
        parkingSpaces: filtro?.parkingSpaces,
        yearOfConstruction: filtro?.yearOfConstruction,
        propertyTypeList: filtro?.propertyTypeList
      }


    } else {
      this.filtroResultDisplay = {
        typeOfAdd: null,
      }
    }

    let recentlySeenList = localStorage.getItem('recentlySeen');
    this.recentlySeenIdsList = JSON.parse(recentlySeenList);

    let resultadoVerify = localStorage.getItem('resultSearch');
    if (resultadoVerify !== null) {
      this.filterResult = JSON.parse(resultadoVerify);
      // list-price-orderBy
      for (let i = 0; i < this.filterResult.length; i++) {
        this.listOfPrices.push(this.filterResult[i].saleValue);
      }

      if (this.filterResult.length === 0) {
        this.messageNotSearch = true;
      } else {
        this.messageNotSearch = false;
      }
    } else {
      this.filterResult = [];
    }


    // CHECK-LIKES
    if (this.filterResult === null || this.filterResult.length === 0) {
      this.announcementService.listAnnouncement().subscribe(
        success => {
          this.filterResult = success;
          if (localStorage.getItem('user') !== null) {
            this.announcementService.listLikes().subscribe(
              success => {
                for (let i = 0; i < success.length; i++) {
                  for (let x = 0; x < this.filterResult.length; x++) {
                    if (success[i].announcement._id === this.filterResult[x]._id) {
                      Object.assign(this.filterResult[x], { liked: true });
                    }
                  }
                  this.listLikes.push(success[i].announcement)
                }
              }
            )
          }
          this.ngxSpinnerService.hide();
        },
      )
    } else if (localStorage.getItem('user') !== null) {
      this.announcementService.listLikes().subscribe(
        success => {
          for (let i = 0; i < success.length; i++) {
            for (let x = 0; x < this.filterResult.length; x++) {
              if (success[i].announcement._id === this.filterResult[x]._id) {
                Object.assign(this.filterResult[x], { liked: true });
              }
            }
            this.listLikes.push(success[i].announcement)
          }
        }
      )
    }
    // GET-CITIES
    let teste: any = [];
    this.announcementService.listAnnouncement().subscribe({
      next: data => {
        this.listAllCity = [];
        let removeRepets: any = [];
        for (let i = 0; i < data.length; i++) {
          removeRepets.push(data[i].cityAddress)
        }
        teste = new Set(removeRepets)
        this.response = data;
        this.ngxSpinnerService.hide();
      }
    })

    this.announcementService.listExclusive().subscribe({
      next: data => {
        this.propertyproducts = data;
      }
    })

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

  selectEvent(item) {
    this.getSelectedCity = item.cidade;
    this.stateSelected = item.estado;
    this.form.patchValue({
      typePropertyCity: item.render,
      typePropertyState: item.estado,
    });
  }
  onChangeSearch(search: string) {
  }

  limpaValoresRepetidos(array) {
    for (let i in array) {
      let valorComparado = array[i]
      let cont = 0         //contador de incidencia de repeticao, seu valor deve ser 1
      for (let i in array) {
        if (valorComparado === array[i]) {
          cont += 1
          if (cont > 1) {
            cont--
            delete array[i]
          }
        }
      }
    }
    return array
  }

  likeHeart(value, condition) {

    let request = {
      announcementId: value
    }

    if (localStorage.getItem('user') === null) {
      this.modalService.open(ModalLoginComponent, { centered: true });
      return
    }

    if (this.listLikes.length === 0) {
      this.announcementService.registerLike(request).subscribe(
        success => {
          this.ngOnInit()
          return
        },
        error => {
          console.log(error)
        }
      )
    } else {
      if (condition === true) {
        this.announcementService.registerUnlike(request).subscribe(
          success => {
            this.ngOnInit()
          },
          error => {
            console.log(error)
          }
        )
      } else if (condition === undefined) {
        this.announcementService.registerLike(request).subscribe(
          success => {
            this.ngOnInit()
          },
          error => {
            console.log(error)
          }
        )
      }

    }
  }

  announcementSelected(value) {
    let teste: any = localStorage.getItem('recentlySeen');
    this.recentlySeenList = JSON.parse(teste);
    let verify = { _id: value };
    let list: any = this.recentlySeenList;
    if (list === null) {
      list = [];
    }
    if (this.recentlySeenList !== null) {
      for (let i = 0; i < list.length; i++) {
        if (list[i]._id !== value) {
          list.push(verify);
        }
      }
    }
    this.recentlySeenList = list;
    localStorage.setItem('recentlySeen', JSON.stringify(this.recentlySeenList))
    this.router.navigate([`announcement/detail/${value}`])
  }

  searchByTypeAd(item) {
    if (item === 'sale') {
      this.selectTypeAd = 'Comprar'
    } else if (item === 'rent') {
      this.selectTypeAd = 'Alugar'
    }
    this.selectFilterOfAd = item;

    this.form.patchValue({
      typeStatus: item,
    });
  }

  searchByBadRoom(item) {
    // SELECT BADROOMS
    if (item === '1') {
      this.selectBadRooms = '+1 Quarto'
    } else if (!!item) {
      this.selectBadRooms = `+${item} Quartos`
    }
  }

  searchBySuites(item) {
    // SELECT SUITES
    if (item === '1') {
      this.selectSuites = '+1 Suíte'
    } else if (!!item) {
      this.selectSuites = `+${item} Suítes`
    }
  }
  searchByBathRoom(item) {
    // SELECT BATHROOMS
    if (item === '1') {
      this.selectBathrooms = '+1 Banheiro'
    } else if (!!item) {
      this.selectBathrooms = `+${item} Banheiros`
    }
  }
  searchByVacancies(item) {
    // SELECT VACANCES
    if (item === '1') {
      this.selectVacancies = '+1 Vaga'
    } else if (!!item) {
      this.selectVacancies = `+${item} Vagas`
    }
  }

  searchByStyleProperty(value) {
    this.stylePropertyTitle = value;
  }

  filterTypeProperty(value) {
    this.TypeProperty = value
  }

  removeTag(index: any) {
    let filterDisplay = this.filtroResultDisplay.propertyTypeList.indexOf(index);
    this.filtroResultDisplay.propertyTypeList.splice(filterDisplay, 1);

    this.selectedItems = [];

    setTimeout(() => {
      this.selectedItems = this.filtroResultDisplay.propertyTypeList
    }, 100);

    this.filtrar();
  }


  filtrar() {
    this.form.controls['typePropertyState'].setValue(this.stateSelected)

    if (this.stateSelected === 'Escolha o Estado') this.form.controls['typePropertyState'].setValue('')

    let filter: any = {
      state: this.form.controls['typePropertyState'].value,
      stateModal: this.formModal.controls['typePropertyState'].value,
      city: this.getSelectedCity,
      goal: this.TypeProperty, //residencial , comercial
      styleProperty: this.removerAcento(this.stylePropertyTitle), // EDIFICIL, TERRENO
    };

    let city = filter.city !== undefined ? filter.city : '';

    let propertyTypeList = this.form.controls['propertyType'].value?.map(
      (item: any) => item.item_id
    );

    if (this.selectTypeAd === 'Selecione') {
      this.selectFilterOfAd = 'sale'
    }

    let request: AnnouncementFilterListResponseDto = {
      typeOfAdd: this.selectFilterOfAd,
      cityAddress: city,
      ufAddress: this.form.controls['typePropertyState'].value || this.formModal.controls['typePropertyState'].value,
      bedrooms: this.form.controls['typeBadrooms'].value || this.formModal.controls['typeBadrooms'].value,
      suites: this.form.controls['typeSuites'].value || this.formModal.controls['typeSuites'].value,
      bathrooms: this.form.controls['typeBathRoom'].value || this.formModal.controls['typeBathRoom'].value,
      initialValue: this.form.controls['typeMaxPrice'].value || this.formModal.controls['typeMaxPrice'].value,
      finalValue: this.form.controls['typeMinPrice'].value || this.formModal.controls['typeMinPrice'].value,
      finalUsefulArea: this.form.controls['typefootagemax'].value || this.formModal.controls['typefootagemax'].value,
      initialUsefulArea: this.form.controls['typefootagemin'].value || this.formModal.controls['typefootagemin'].value,
      parkingSpaces: this.form.controls['typevacancies'].value || this.formModal.controls['typevacancies'].value,
      yearOfConstruction: this.form.controls['typeconstruction'].value || this.formModal.controls['typeconstruction'].value,
      propertyType: !!propertyTypeList ? propertyTypeList : [],
      propertyTypeList: this.form.controls['propertyType'].value || this.formModal.controls['propertyType'].value,
      goal: ''
    }

    this.announcementService.listFilter(request).subscribe({
      next: data => {
        this.filterResult = data;
        this.filtroResultDisplay = request;

        this.messageNotSearch = false;
        localStorage.setItem('resultSearch', JSON.stringify(data));
        localStorage.setItem('filtro', JSON.stringify(request));

        if (this.filterResult.length === 0) {
          this.messageNotSearch = true;
          this.announcementService.listAnnouncement().subscribe(
            success => {
              this.filterResult = success;
            },
            error => {
              console.error(error)
            }
          );
        }
        if (this.modalFilterOpen === true) {
          this.exit()
        }
      },
      error: error => {
        console.log(error)
      }
    })
  }

  openFilter(content) {
    this.modalFilterOpen = true;
    const modalRef = this.modalService.open(content, { centered: true });
    modalRef.result.then(data => {
    }, error => {
      this.modalFilterOpen = false;
    });
  }

  exit() {
    this.modalService.dismissAll()
  }


  public removerAcento(text) {
    text = text.toLowerCase();
    text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
    text = text.replace(new RegExp('[Ç]', 'gi'), 'c');
    return text.toLocaleLowerCase();
  }

  sortPriceList(value: string) {
    this.listOfPrices = this.filterResult;
    if (value === 'minor>major') this.listOfPrices.sort((a, b) => a.saleValue < b.saleValue ? -1 : 0);
    else if (value === 'major>minor') this.listOfPrices.sort((a, b) => a.saleValue > b.saleValue ? -1 : 0);
  }

  redirectToMap() {
    this.router.navigate(['/search-map']);
  }

  resolveProperty(text:string):string{
    return propertyTypesConst.find(x => x.value === text)?.name || text || '-';
  }

}



