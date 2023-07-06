import {
  Component,
  HostListener,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalLoginComponent } from 'src/app/auth/modal-login/modal-login.component';
import { AnnouncementGetResponseDto } from 'src/app/dtos/announcement-get-response.dto';
import { UserGetResponseDto } from 'src/app/dtos/user-get-response.dtos';
import { AnnouncementService } from 'src/app/service/announcement.service';
import { propertyTypesConst } from 'src/app/utils/propertyTypes';
import SwiperCore, { A11y, Navigation, Pagination, Scrollbar } from 'swiper';
import estados from '../../../assets/json/estados-cidades.json';
import { AnnouncementFilterListResponseDto } from '../../dtos/announcement-filter-list-response.dto';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.handlerMaxItens();
  }
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

  stateSelected = 'Escolha o Estado';
  citySelected = 'Selecione uma ciadade';

  user: UserGetResponseDto;
  urlsimg: any = [];

  filterResult: AnnouncementGetResponseDto[] = [];

  filtroResultDisplay: AnnouncementFilterListResponseDto;

  orderBy: string = 'Selecione';
  lastPaginationPage: number;

  recentlySeenIdsList: any = [];

  recentlySeenList: AnnouncementGetResponseDto[] = [];

  lastPage: number;

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
      cidade: '',
    },
  ];

  modalFilter: boolean = false;

  formModal: FormGroup;

  modalFilterOpen: boolean = false;
  states: string[];
  cities: string[];

  keyword = 'name';
  getSelectedCity: string;
  getSelectedDistrict: string;

  estados: { estados: { sigla: string; nome: string; cidades: string[] }[] };
  listEveryCity: { cidade: string; estado: string; render: string }[] = [];
  listDistricts: { district: string }[] = [];
  maxItensPagination: number = 5;

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
    { item_id: 'ground', item_text: 'Terreno' },
    { item_id: 'comercial', item_text: 'Comercial' },
    { item_id: 'farm', item_text: 'Chácara' },
    { item_id: 'casacomercial', item_text: 'Casa Comercial' },
    { item_id: 'garagem', item_text: 'Garagem' },
    { item_id: 'pontocomercial', item_text: 'Ponto Comercial' },
    { item_id: 'conjuntocomercial', item_text: 'Conjunto / Sala Comercial' },
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
    { item_id: 'barracao', item_text: 'Barracão' },
    { item_id: 'terrenoemcondominio', item_text: 'Terreno em Condomínio' },
  ];

  dropdownListDistrict = [
    { item_id: 1, item_text: '' }
  ];

  selectedItems: any[] = [];
  selectedItemsDistricts: any[] = [];

  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Selecionar todos',
    unSelectAllText: 'Desmarcar todos',
    itemsShowLimit: 1,
    searchPlaceholderText: 'Procurar',
    allowSearchFilter: true,
    noFilteredDataAvailablePlaceholderText: 'Tipo de imóvel não encontrado!',
  };

  dropdownSettingsDistrict: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Selecionar todos',
    unSelectAllText: 'Desmarcar todos',
    itemsShowLimit: 2,
    searchPlaceholderText: 'Procurar',
    allowSearchFilter: true,
    noFilteredDataAvailablePlaceholderText: 'Tipo de imóvel não encontrado!',
  };

  constructor(
    private router: Router,
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
      typePropertyDistrict: [''],
      typeMaxPrice: [''],
      finalValueCondominium: [''],
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
      typePropertyDistrict: [''],
      typeMaxPrice: [''],
      finalValueCondominium: [''],
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

    this.handlerMaxItens();

    this.announcementService.listExclusive(10).subscribe({
      next: (data) => {
        this.propertyproducts = data;
      },
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

    let filtro: any = localStorage.getItem('filtro');

    if (filtro !== null) {
      filtro = JSON.parse(filtro);

      this.searchByTypeAd(filtro.typeOfAdd);

      this.citySelected = filtro.cityAddress;
      this.getSelectedCity = filtro.cityAddress;

      if (!!filtro.ufAddress) this.stateSelected = filtro.ufAddress;

      if (this.citySelected) this.listDistrictByCity(this.citySelected);

      this.form.patchValue({
        typeStatus: filtro.typeOfAdd,
        typePropertyCity: filtro.cityAddress + ' , ' + this.stateSelected,
        typePropertyState: filtro.ufAddress,
        typePropertyDistrict: { district: filtro?.districtAddress || '' },
        typeMaxPrice: filtro.finalValue,
      });

      if (filtro.propertyTypeList?.length > 0)
        this.selectedItems = [...filtro.propertyTypeList];

      if (filtro.districtAddress?.length > 0) {
        this.selectedItemsDistricts = [...filtro.districtAddress];
      }

      this.formModal.patchValue({
        typePropertyCity: filtro.cityAddress + ' , ' + this.stateSelected,
        typePropertyState: filtro.ufAddress,
        typePropertyDistrict: { district: filtro?.districtAddress || '' },
        typeMaxPrice: filtro.finalValue,
      });

      this.searchByBadRoom(filtro.bedrooms);

      this.filtroResultDisplay = {
        ufAddress: filtro?.ufAddress,
        cityAddress: filtro?.cityAddress,
        districtAddress: filtro?.districtAddress,
        initialValue: filtro?.initialValue,
        finalValue: filtro?.finalValue,
        finalValueCondominium: filtro?.finalValueCondominium,
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
        propertyTypeList: filtro?.propertyTypeList,
      };
    } else {
      this.filtroResultDisplay = {
        typeOfAdd: null,
      };
    }

    let recentlySeenList = localStorage.getItem('recentlySeen');
    this.recentlySeenIdsList = JSON.parse(recentlySeenList);

    let resultadoVerify = localStorage.getItem('resultSearch');
    if (resultadoVerify !== null) {
      this.filterResult = JSON.parse(resultadoVerify);
    } else {
      this.filterResult = [];
    }

    // CHECK-LIKES
    if (this.filterResult === null || this.filterResult.length === 0) {
      this.messageNotSearch = true;
      this.announcementService.listAnnouncement(5).subscribe({
        next: (success) => {
          this.filterResult = success;
          if (localStorage.getItem('user') !== null) {
            this.announcementService.listLikes().subscribe((success) => {
              for (let i = 0; i < success.length; i++) {
                for (let x = 0; x < this.filterResult.length; x++) {
                  if (
                    success[i].announcement._id === this.filterResult[x]._id
                  ) {
                    Object.assign(this.filterResult[x], { liked: true });
                  }
                }
              }
              this.listLikes = success.map((item) => item.announcement);
              this.ngxSpinnerService.hide();
            });
          } else {
            this.ngxSpinnerService.hide();
          }
        },
        error: (error) => {
          this.ngxSpinnerService.hide();
          this.messageNotSearch = true;
        },
      });
    } else if (localStorage.getItem('user') !== null) {
      this.messageNotSearch = false;
      this.announcementService.listLikes().subscribe({
        next: (success) => {
          for (let i = 0; i < success.length; i++) {
            for (let x = 0; x < this.filterResult.length; x++) {
              if (success[i].announcement._id === this.filterResult[x]._id) {
                Object.assign(this.filterResult[x], { liked: true });
              }
            }
          }
          this.listLikes = success.map((item) => item.announcement);
          this.ngxSpinnerService.hide();
        },
        error: (error) => {
          this.ngxSpinnerService.hide();
          console.log(error);
        },
      });
    } else {
      this.messageNotSearch = false;
      this.ngxSpinnerService.hide();
    }

    //Pegar página atual do paginator
    this.paginationProduct = Number(localStorage.getItem('currentyPage')) || 1;
    localStorage.removeItem('currentyPage');

  }

  handlerMaxItens() {
    const width = screen.width;
    if (width <= 768) {
      this.maxItensPagination = 3;
    } else if (width <= 520) {
      this.maxItensPagination = 2;
    } else {
      this.maxItensPagination = 5;
    }
  }

  onItemSelect(item: any) {
    const nativeElement = this.dropdownRef;
    if (nativeElement.isDropdownOpen === true) {
      console.log(nativeElement);
      nativeElement.closeDropdown();
    }
  }

  onItemSelectDistrict(item: any) {
  }

  onSelectAllDistrict(items: any) {
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

  onItemSelect2(item: any) {
    const multiselect = document.getElementById('dropdownRefModal');
    multiselect.click();
  }

  onItemDeSelect2(item: any) {
    if (this.selectedItems.length === 0) {
      const multiselect = document.getElementById('dropdownRefModal');
      multiselect.click();
    }
  }

  onSelectAll2(items: any) {
    const multiselect = document.getElementById('dropdownRefModal');
    multiselect.click();
  }

  onDeSelectAll2(items) {
    const multiselect = document.getElementById('dropdownRefModal');
    multiselect.click();
  }

  selectEvent(item) {
    this.getSelectedCity = item.cidade;
    this.stateSelected = item.estado;
    this.form.patchValue({
      typePropertyCity: item.render,
      typePropertyState: item.estado,
    });

    this.listDistrictByCity(item.cidade);
  }

  onPageChange(pageNumber) {
    const filter = JSON.parse(localStorage.getItem('filtro'));

    const prevPage = this.paginationProduct;
    this.paginationProduct = pageNumber;
    if (pageNumber >= 4) {
      filter.page = pageNumber + 1;
      if (prevPage < pageNumber) {
        this.announcementService.listFilter(filter).subscribe((response) => {
          const announcements = response?.data;

          if (announcements.length) {
            this.filterResult.push(...announcements);
          }
        });
      }
      this.paginationProduct = pageNumber;
    }

    this.scrollUp();
  }

  selectEvent2(item) {
    this.getSelectedDistrict = item.district;
    this.form.patchValue({
      typePropertyDistrict: { district: item?.district || '' },
    });
  }

  onChangeSearch(search: string) { }

  limpaValoresRepetidos(array) {
    for (let i in array) {
      let valorComparado = array[i];
      let cont = 0; //contador de incidencia de repeticao, seu valor deve ser 1
      for (let i in array) {
        if (valorComparado === array[i]) {
          cont += 1;
          if (cont > 1) {
            cont--;
            delete array[i];
          }
        }
      }
    }
    return array;
  }

  likeHeart(value, condition) {
    let request = {
      announcementId: value,
    };

    if (localStorage.getItem('user') === null) {
      this.modalService.open(ModalLoginComponent, { centered: true });
      return;
    }

    if (this.listLikes.length === 0) {
      this.announcementService.registerLike(request).subscribe(
        (success) => {
          this.ngOnInit();
          return;
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      if (condition === true) {
        this.announcementService.registerUnlike(request).subscribe(
          (success) => {
            this.ngOnInit();
          },
          (error) => {
            console.log(error);
          }
        );
      } else if (condition === undefined) {
        this.announcementService.registerLike(request).subscribe(
          (success) => {
            this.ngOnInit();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }

  announcementSelected(value) {
    const recentlySeen = JSON.parse(localStorage.getItem('recentlySeen')) || [];
    const verify = { _id: value };
    const exists = recentlySeen.some((item) => item._id === value);
    const width = screen.width;

    if (!exists) {
      recentlySeen.push(verify);
    }

    localStorage.setItem('recentlySeen', JSON.stringify(recentlySeen));

    localStorage.setItem('currentyPage', this.paginationProduct.toString());

    if (width >= 1241) {
      window.open(`announcement/detail/${value}`, '_blank');
    } else {
      this.router.navigate([`announcement/detail/${value}`]);
    }
  }

  searchByTypeAd(item) {
    if (item === 'sale') {
      this.selectTypeAd = 'Comprar';
    } else if (item === 'rent') {
      this.selectTypeAd = 'Alugar';
    }
    this.selectFilterOfAd = item;
    this.form.controls['typeStatus'].setValue(item);
  }

  searchByBadRoom(item) {
    // SELECT BADROOMS
    if (item === '1') {
      this.selectBadRooms = '+1 Quarto';
    } else if (!!item) {
      this.selectBadRooms = `+${item} Quartos`;
    } else {
      this.selectBadRooms = 'Quartos';
    }
    if(item !== 0){
      this.form.controls['typeBadrooms'].setValue(item);
    }
  }

  searchBySuites(item) {
    // SELECT SUITES
    if (item === '1') {
      this.selectSuites = '+1 Suíte';
    } else if (!!item) {
      this.selectSuites = `+${item} Suítes`;
    } else {
      this.selectSuites = 'Suítes';
    }
    this.form.controls['typeSuites'].setValue(item);
  }
  searchByBathRoom(item) {
    // SELECT BATHROOMS
    if (item === '1') {
      this.selectBathrooms = '+1 Banheiro';
    } else if (!!item) {
      this.selectBathrooms = `+${item} Banheiros`;
    } else {
      this.selectBathrooms = 'Banheiros';
    }
    this.form.controls['typeBathRoom'].setValue(item);
  }
  searchByVacancies(item) {
    // SELECT VACANCES
    if (item === '1') {
      this.selectVacancies = '+1 Vaga';
    } else if (!!item) {
      this.selectVacancies = `+${item} Vagas`;
    } else {
      this.selectVacancies = 'Vagas';
    }
    this.form.controls['typevacancies'].setValue(item);
  }

  searchByStyleProperty(value) {
    this.stylePropertyTitle = value;
  }

  filterTypeProperty(value) {
    this.TypeProperty = value;
  }

  removeTag(index: any) {
    let filterDisplay =
      this.filtroResultDisplay.propertyTypeList.indexOf(index);
    this.filtroResultDisplay.propertyTypeList.splice(filterDisplay, 1);

    let filterDisplayDistrict =
      this.filtroResultDisplay.districtAddress.indexOf(index);
    this.filtroResultDisplay.districtAddress.splice(filterDisplayDistrict, 1);

    this.selectedItems = [];
    this.selectedItemsDistricts = []

    setTimeout(() => {
      this.selectedItems = this.filtroResultDisplay.propertyTypeList;
    }, 100);
    setTimeout(() => {
      this.selectedItemsDistricts = this.filtroResultDisplay.districtAddress;
    }, 100);

    this.filtrar();
  }

  listDistrictByCity(value) {
    this.announcementService.listDistrictsByCity(value).subscribe({
      next: (response) => {
        // response.unshift({ district: 'Todos os bairros' });
        this.listDistricts = response;
        this.dropdownListDistrict = response.map((item, index) => {
          return { item_text: item.district, item_id: index }
        }
        )
      },
      error: (error) => console.log(error),
    });

  }

  clearAndSearch() {
    this.filtroResultDisplay.propertyTypeList = [];
    this.selectedItems = [];

    let city = this.getSelectedCity;
    let ufAddress =
      this.form.controls['typePropertyState'].value ||
      this.formModal.controls['typePropertyState'].value;

    this.form.reset();
    this.formModal.reset();

    this.form.controls['typePropertyState'].setValue(ufAddress);
    this.form.controls['typePropertyCity'].setValue(
      this.listEveryCity.find((x) => x.cidade === city)?.render || city
    );

    this.searchByBadRoom('');
    this.searchBySuites('');
    this.searchByBathRoom('');
    this.searchByVacancies('');

    this.filtrar();
  }

  filtrar() {
    this.paginationProduct = 0;
    this.ngxSpinnerService.show();
    this.form.controls['typePropertyState'].setValue(this.stateSelected);

    if (this.stateSelected === 'Escolha o Estado')
      this.form.controls['typePropertyState'].setValue('');

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

    if (this.selectTypeAd === 'Selecione' || this.selectTypeAd === undefined) {
      this.selectFilterOfAd = 'sale';
    }

    const district = this.form.controls['typePropertyDistrict'].value?.map(item => item.item_text) || '';

    let request: AnnouncementFilterListResponseDto = {
      typeOfAdd: this.selectFilterOfAd,
      cityAddress: city,
      districtAddress: district,
      ufAddress:
        this.form.controls['typePropertyState'].value ||
        this.formModal.controls['typePropertyState'].value,
      bedrooms:
        this.form.controls['typeBadrooms'].value ||
        this.formModal.controls['typeBadrooms'].value,
      suites:
        this.form.controls['typeSuites'].value ||
        this.formModal.controls['typeSuites'].value,
      bathrooms:
        this.form.controls['typeBathRoom'].value ||
        this.formModal.controls['typeBathRoom'].value,
      initialValue:
        this.form.controls['typeMaxPrice'].value ||
        this.formModal.controls['typeMaxPrice'].value,
      finalValueCondominium:
        this.form.controls['finalValueCondominium'].value ||
        this.formModal.controls['finalValueCondominium'].value,
      finalValue:
        this.form.controls['typeMinPrice'].value ||
        this.formModal.controls['typeMinPrice'].value,
      finalUsefulArea:
        this.form.controls['typefootagemax'].value ||
        this.formModal.controls['typefootagemax'].value,
      initialUsefulArea:
        this.form.controls['typefootagemin'].value ||
        this.formModal.controls['typefootagemin'].value,
      parkingSpaces:
        this.form.controls['typevacancies'].value ||
        this.formModal.controls['typevacancies'].value,
      yearOfConstruction:
        this.form.controls['typeconstruction'].value ||
        this.formModal.controls['typeconstruction'].value,
      propertyType: !!propertyTypeList ? propertyTypeList : [],
      propertyTypeList:
        this.form.controls['propertyType'].value ||
        this.formModal.controls['propertyType'].value,
      goal: '',
    };
    console.log(request);
    
    this.announcementService.listFilter(request).subscribe({
      next: (data) => {
        this.ngxSpinnerService.hide();
        this.filterResult = data.data;
        this.filtroResultDisplay = request;

        this.messageNotSearch = false;
        localStorage.setItem('resultSearch', JSON.stringify(data.data));
        localStorage.setItem('filtro', JSON.stringify(request));
        this.listDistrictByCity(this.getSelectedCity);
        if (this.filterResult.length === 0) {
          this.messageNotSearch = true;
          this.announcementService.listAnnouncement(10).subscribe(
            (success) => {
              this.filterResult = success;
            },
            (error) => {
              console.error(error);
            }
          );
        }
        if (this.modalFilterOpen === true) {
          this.exit();
        }
      },
      error: (error) => {
        this.ngxSpinnerService.hide();
        console.log(error);
      },
    });
  }

  openFilter(content) {
    this.modalFilterOpen = true;
    const modalRef = this.modalService.open(content, { centered: true });
    modalRef.result.then(
      (data) => { },
      (error) => {
        this.modalFilterOpen = false;
      }
    );
  }

  exit() {
    this.modalService.dismissAll();
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
  customFilter(
    items: {
      cidade: string;
      estado: string;
      render?: string;
      district?: string;
    }[],
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
  customDistrictFilter(items: any[], query: string): any[] {
    if (!query || query.length < 2) {
      // Retorna todos os itens quando a consulta é vazia ou possui menos de 2 caracteres
      return items;
    }

    // Remove acentos e caracteres especiais da consulta
    const normalizedQuery = query
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

    // Filtra os itens com base no nome do bairro, removendo acentos e caracteres especiais
    const filteredItems = items.filter((item) => {
      const normalizedDistrict = item.district
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
      return normalizedDistrict.includes(normalizedQuery);
    });
    return filteredItems;
  }

  sortPriceList(value: string) {
    const listOfPrices = this.filterResult;
    if (value === 'minor>major') {
      listOfPrices.sort((a, b) => (a.saleValue < b.saleValue ? -1 : 0));
      this.orderBy = 'Menor preço';
    } else if (value === 'major>minor') {
      listOfPrices.sort((a, b) => (a.saleValue > b.saleValue ? -1 : 0));
      this.orderBy = 'Maior preço';
    }
  }

  redirectToMap() {
    this.router.navigate(['/search-map']);
  }

  resolveProperty(text: string): string {
    return (
      propertyTypesConst.find((x) => x.value === text)?.name || text || '-'
    );
  }

  scrollUp() {
    window.scrollTo({ behavior: 'smooth', top: 150 });
  }
}
