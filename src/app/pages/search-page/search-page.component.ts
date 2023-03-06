import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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

  filtroSelected: AnnouncementFilterListResponseDto;

  filtroResultDisplay: AnnouncementFilterListResponseDto;

  orderBy: string = 'Selecione';

  recentlySeenIdsList: any = [];


  recentlySeenList: AnnouncementGetResponseDto[] = [];

  listLikes: AnnouncementGetResponseDto[] = [];

  messageNotSearch = false;

  selectTypeAd = 'Selecione';
  selectBathrooms = 'Banheiros';
  selectBadRooms = 'Dormitórios';
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
  estados: any;
  listOfPrices: any = [];
  constructor(
    private router: Router,
    private datamokservice: DatamokService,
    private formBuilder: FormBuilder,
    private ngxSpinnerService: NgxSpinnerService,
    private announcementService: AnnouncementService,
    private modalService: NgbModal

  ) {
    this.form = this.formBuilder.group({
      searchwords: [''],
      propertyType: [''],
      typeproperty: [''],
      typePropertyState: [''],
      typePropertyCity: [''],
      typeMaxPrice: [''],
      typeMinPrice: [''],
      typeBathRoom: [''],
      typeBadrooms: [''],
      typevacancies: [''],
      typeconstruction: [''],
      typefootagemax: [''],
      typefootagemin: [''],
      orderby: [''],
    });
    this.formModal = this.formBuilder.group({
      searchwords: [''],
      propertyType: [''],
      typeproperty: [''],
      typePropertyState: [''],
      typePropertyCity: [''],
      typeMaxPrice: [''],
      typeMinPrice: [''],
      typeBathRoom: [''],
      typeBadrooms: [''],
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
    console.log(this.form.value);

    if (localStorage.getItem('filtro') !== null) {
      let filtro: any = localStorage.getItem('filtro');
      filtro = JSON.parse(filtro);

      this.searchByTypeAd(filtro.typeOfAdd);

      this.citySelected = filtro.cityAddress;

      for (let i = 0; i < estados.estados.length; i++) {
        if (filtro.ufAddress === estados.estados[i].sigla) {
          for (let x = 0; x < estados.estados[i].cidades.length; x++) {
            this.stateSelected = estados.estados[i].nome
          }
        }
      }

      this.form.patchValue({
        typePropertyCity: filtro.cityAddress,
        typeMaxPrice: filtro.finalValue
      });

      this.formModal.patchValue({
        typePropertyCity: filtro.cityAddress,
        typeMaxPrice: filtro.finalValue
      });

      this.searchByBadRoom(filtro.bedrooms)

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
      // console.log(this.listOfPrices);
      if (this.filterResult.length === 0) {
        this.messageNotSearch = true;
      } else {
        this.messageNotSearch = false;
      }
    } else {
      this.filterResult = [];
    }

    let filtro = localStorage.getItem('filtro');
    this.filtroSelected = JSON.parse(filtro);
    let typeAdTranslate: string = ''

    if (this.filtroSelected?.typeOfAdd === 'rent') {
      typeAdTranslate = 'Alugar'
    } else if (this.filtroSelected?.typeOfAdd === 'sale') {
      typeAdTranslate = 'Comprar'
    }

    this.filtroResultDisplay = {
      ufAddress: this.filtroSelected?.ufAddress,
      cityAddress: this.filtroSelected?.cityAddress,
      initialValue: this.filtroSelected?.initialValue,
      finalValue: this.filtroSelected?.finalValue,
      bedrooms: this.filtroSelected?.bedrooms,
      propertyType: this.filtroSelected?.propertyType,
      typeOfAdd: this.filtroSelected?.typeOfAdd,
      bathrooms: this.filtroSelected?.bathrooms,
      finalUsefulArea: this.filtroSelected?.finalUsefulArea,
      goal: this.filtroSelected?.goal,
      initialUsefulArea: this.filtroSelected?.initialUsefulArea,
      parkingSpaces: this.filtroSelected?.parkingSpaces,
      yearOfConstruction: this.filtroSelected?.yearOfConstruction,
    }


    console.log(this.filtroSelected, 'dados do storage')

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
  selectEvent(item) {
    this.getSelectedCity = item.name;
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
  }

  searchByBadRoom(item) {
    // SELECT BADROOMS
    if (item === '1') {
      this.selectBadRooms = '+1 Quarto'
    } else if (item === '2') {
      this.selectBadRooms = '+2  Quartos'
    } else if (item === '3') {
      this.selectBadRooms = '+3  Quartos'
    } else if (item === '4') {
      this.selectBadRooms = '+4  Quartos'
    } else if (item === '5') {
      this.selectBadRooms = '+5  Quartos'
    }
  }
  searchByBathRoom(item) {
    // SELECT BATHROOMS
    if (item === '1') {
      this.selectBathrooms = '+1  Banheiro'
    } else if (item === '2') {
      this.selectBathrooms = '+2  Banheiros'
    } else if (item === '3') {
      this.selectBathrooms = '+3  Banheiros'
    } else if (item === '4') {
      this.selectBathrooms = '+4  Banheiros'
    } else if (item === '5') {
      this.selectBathrooms = '+5  Banheiros'
    }
  }
  searchByVacancies(item) {
    // SELECT VACANCES
    if (item === '1') {
      this.selectVacancies = '+1  Vagas'
    } else if (item === '2') {
      this.selectVacancies = '+2  Vagas'
    } else if (item === '3') {
      this.selectVacancies = '+3  Vagas'
    } else if (item === '4') {
      this.selectVacancies = '+4  Vagas'
    } else if (item === '5') {
      this.selectVacancies = '+5  Vagas'
    }
  }

  searchByStyleProperty(value) {
    this.stylePropertyTitle = value;
  }

  filterTypeProperty(value) {
    this.TypeProperty = value
  }


  filtrar() {

    if (this.stateSelected === 'Escolha o Estado') this.form.controls['typePropertyState'].setValue('')
    if (this.stateSelected === 'Escolha o Estado') this.formModal.controls['typePropertyState'].setValue('')
    if (this.stateSelected === 'Acre') { this.form.controls['typePropertyState'].setValue('AC') } else if (this.stateSelected === 'Alagoas') { this.form.controls['typePropertyState'].setValue('AL') } else if (this.stateSelected === 'Amapá') { this.form.controls['typePropertyState'].setValue('AP') } else if (this.stateSelected === 'Amazonas') { this.form.controls['typePropertyState'].setValue('AM') } else if (this.stateSelected === 'Bahia') { this.form.controls['typePropertyState'].setValue('BA') } else if (this.stateSelected === 'Ceara') { this.form.controls['typePropertyState'].setValue('CE') } else if (this.stateSelected === 'Distrito Federal') { this.form.controls['typePropertyState'].setValue('DF') } else if (this.stateSelected === 'Espírito Santo') { this.form.controls['typePropertyState'].setValue('ES') } else if (this.stateSelected === 'Goiás') { this.form.controls['typePropertyState'].setValue('GO') } else if (this.stateSelected === 'Maranhão') { this.form.controls['typePropertyState'].setValue('MA') } else if (this.stateSelected === 'Mato Grosso') { this.form.controls['typePropertyState'].setValue('MT') } else if (this.stateSelected === 'Mato Grosso do Sul') { this.form.controls['typePropertyState'].setValue('MS') } else if (this.stateSelected === 'Minas Gerais') { this.form.controls['typePropertyState'].setValue('MG') } else if (this.stateSelected === 'Pará') { this.form.controls['typePropertyState'].setValue('PA') } else if (this.stateSelected === 'Paraíba') { this.form.controls['typePropertyState'].setValue('PB') } else if (this.stateSelected === 'Paraná') { this.form.controls['typePropertyState'].setValue('PR') } else if (this.stateSelected === 'Pernambuco') { this.form.controls['typePropertyState'].setValue('PE') } else if (this.stateSelected === 'Piauí') { this.form.controls['typePropertyState'].setValue('PI') } else if (this.stateSelected === 'Rio de Janeiro') { this.form.controls['typePropertyState'].setValue('RJ') } else if (this.stateSelected === 'Rio Grande do Norte') { this.form.controls['typePropertyState'].setValue('RN') } else if (this.stateSelected === 'Rio Grande do Sul') { this.form.controls['typePropertyState'].setValue('RS') } else if (this.stateSelected === 'Rondônia') { this.form.controls['typePropertyState'].setValue('RO') } else if (this.stateSelected === 'Roraima') { this.form.controls['typePropertyState'].setValue('RR') } else if (this.stateSelected === 'Santa Catarina') { this.form.controls['typePropertyState'].setValue('SC') } else if (this.stateSelected === 'São Paulo') { this.form.controls['typePropertyState'].setValue('SP') } else if (this.stateSelected === 'Sergipe') { this.form.controls['typePropertyState'].setValue('SE') } else if (this.stateSelected === 'Tocantins') { this.form.controls['typePropertyState'].setValue('TO') }
    if (this.stateSelected === 'Acre') { this.formModal.controls['typePropertyState'].setValue('AC') } else if (this.stateSelected === 'Alagoas') { this.formModal.controls['typePropertyState'].setValue('AL') } else if (this.stateSelected === 'Amapá') { this.formModal.controls['typePropertyState'].setValue('AP') } else if (this.stateSelected === 'Amazonas') { this.formModal.controls['typePropertyState'].setValue('AM') } else if (this.stateSelected === 'Bahia') { this.formModal.controls['typePropertyState'].setValue('BA') } else if (this.stateSelected === 'Ceara') { this.formModal.controls['typePropertyState'].setValue('CE') } else if (this.stateSelected === 'Distrito Federal') { this.formModal.controls['typePropertyState'].setValue('DF') } else if (this.stateSelected === 'Espírito Santo') { this.formModal.controls['typePropertyState'].setValue('ES') } else if (this.stateSelected === 'Goiás') { this.formModal.controls['typePropertyState'].setValue('GO') } else if (this.stateSelected === 'Maranhão') { this.formModal.controls['typePropertyState'].setValue('MA') } else if (this.stateSelected === 'Mato Grosso') { this.formModal.controls['typePropertyState'].setValue('MT') } else if (this.stateSelected === 'Mato Grosso do Sul') { this.formModal.controls['typePropertyState'].setValue('MS') } else if (this.stateSelected === 'Minas Gerais') { this.formModal.controls['typePropertyState'].setValue('MG') } else if (this.stateSelected === 'Pará') { this.formModal.controls['typePropertyState'].setValue('PA') } else if (this.stateSelected === 'Paraíba') { this.formModal.controls['typePropertyState'].setValue('PB') } else if (this.stateSelected === 'Paraná') { this.formModal.controls['typePropertyState'].setValue('PR') } else if (this.stateSelected === 'Pernambuco') { this.formModal.controls['typePropertyState'].setValue('PE') } else if (this.stateSelected === 'Piauí') { this.formModal.controls['typePropertyState'].setValue('PI') } else if (this.stateSelected === 'Rio de Janeiro') { this.formModal.controls['typePropertyState'].setValue('RJ') } else if (this.stateSelected === 'Rio Grande do Norte') { this.formModal.controls['typePropertyState'].setValue('RN') } else if (this.stateSelected === 'Rio Grande do Sul') { this.formModal.controls['typePropertyState'].setValue('RS') } else if (this.stateSelected === 'Rondônia') { this.formModal.controls['typePropertyState'].setValue('RO') } else if (this.stateSelected === 'Roraima') { this.formModal.controls['typePropertyState'].setValue('RR') } else if (this.stateSelected === 'Santa Catarina') { this.formModal.controls['typePropertyState'].setValue('SC') } else if (this.stateSelected === 'São Paulo') { this.formModal.controls['typePropertyState'].setValue('SP') } else if (this.stateSelected === 'Sergipe') { this.formModal.controls['typePropertyState'].setValue('SE') } else if (this.stateSelected === 'Tocantins') { this.formModal.controls['typePropertyState'].setValue('TO') }

    console.log(this.getSelectedCity, 'cidade atual')
    console.log(this.form.controls['typePropertyState'].value, 'estado atual')

    let filter: any = {
      state: this.form.controls['typePropertyState'].value,
      stateModal: this.formModal.controls['typePropertyState'].value,
      city: this.getSelectedCity,
      goal: this.TypeProperty, //residencial , comercial
      styleProperty: this.removerAcento(this.stylePropertyTitle), // EDIFICIL, TERRENO
    };

    let city = '';
    if (filter.city !== undefined) {
      city = filter.city;
    }

    let request: AnnouncementFilterListResponseDto = {
      typeOfAdd: this.selectFilterOfAd,
      cityAddress: city,
      ufAddress: this.form.controls['typePropertyState'].value,
      bedrooms: this.form.controls['typeBadrooms'].value,
      bathrooms: this.form.controls['typeBathRoom'].value,
      initialValue: this.form.controls['typeMaxPrice'].value,
      finalValue: this.form.controls['typeMinPrice'].value,
      finalUsefulArea: this.form.controls['typefootagemax'].value,
      initialUsefulArea: this.form.controls['typefootagemin'].value,
      parkingSpaces: this.form.controls['typevacancies'].value,
      yearOfConstruction: this.form.controls['typeconstruction'].value,
      propertyType: [],
      goal: ''
    }


    this.announcementService.listFilter(request).subscribe({
      next: data => {
        this.filterResult = data;
        if (data.length > 0) {
          localStorage.setItem('resultSearch', JSON.stringify(data));
          localStorage.setItem('filtro', JSON.stringify(request));
        }
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

  getEstados(value) {
    let valor = value.target.value;
    this.listAllCity = [];
    this.stateSelected = valor;
    for (let i = 0; i < estados.estados.length; i++) {
      if (valor === estados.estados[i].nome) {
        for (let x = 0; x < estados.estados[i].cidades.length; x++) {
          this.listAllCity.push({ name: estados.estados[i].cidades[x] })
          this.stateSelected = estados.estados[i].nome
        }
      }
    }
  }



  sortPriceList(value: string) {
    this.listOfPrices = this.filterResult;
    if (value === 'minor>major') this.listOfPrices.sort((a, b) => a.saleValue < b.saleValue ? -1 : 0);
    else if (value === 'major>minor') this.listOfPrices.sort((a, b) => a.saleValue > b.saleValue ? -1 : 0);
  }

}



