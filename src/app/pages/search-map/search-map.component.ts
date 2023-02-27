import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalLoginComponent } from 'src/app/auth/modal-login/modal-login.component';
import { AnnouncementGetResponseDto } from 'src/app/dtos/announcement-get-response.dto';
import { UserGetResponseDto } from 'src/app/dtos/user-get-response.dtos';
import { AnnouncementService } from 'src/app/service/announcement.service';
import estados from '../../../assets/json/estados-cidades.json';

@Component({
  selector: 'app-search-map',
  templateUrl: './search-map.component.html',
  styleUrls: ['./search-map.component.scss']
})
export class SearchMapComponent implements OnInit {
  response: AnnouncementGetResponseDto[] = [];
  user: UserGetResponseDto;
  form: FormGroup;
  paginationProduct: number = 1;
  products: any = [];
  messageNotSearch = false;


  filtroSelected: any;
  propertyproducts: AnnouncementGetResponseDto[] = [];
  filterResult: AnnouncementGetResponseDto[] = [];
  orderBy: string = 'Selecione'
  listAllForFilter: AnnouncementGetResponseDto[] = [];
  recentlySeenList: AnnouncementGetResponseDto[] = [];
  listLikesForFilter: AnnouncementGetResponseDto[] = [];

  listLikes: AnnouncementGetResponseDto[] = [];
  responseAnnouncement: AnnouncementGetResponseDto[] = [];


  filtroResultDisplay: {
    state: string,
    city: string,
    untilValueSale: string,
    untilValueRent: string,
    badRoomsQnt: number,
    propertiesType: string,
    typeAd: string,
    goal: string,
    styleProperty: string,
    typeOfProperty: any[];
  }


  selectTypeAd = 'Selecione';
  selectBathrooms = 'Banheiros';
  selectBadRooms = 'Dormitórios';
  selectCity: string = 'Local';
  selectVacancies = 'Vagas';
  getSelectedCity: string;
  valuePrices: 0;
  stateSelected = 'Escolha o Estado'
  TypeProperty = 'Tipo de Imóvel';
  listOfPrices: any = [];
  keyword = 'name'
  stylePropertyTitle: string = 'O que está buscando?';
  listAllCity: any = [
    {
      cidade: ''
    }
  ];
  estados: any;


  constructor(
    private formBuilder: FormBuilder,
    private ngxSpinnerService: NgxSpinnerService,
    private announcementService: AnnouncementService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.form = this.formBuilder.group({
      searchwords: [''],
      propertyType: [''],
      typeproperty: [''],
      typePropertyState: [''],
      localproperty: [''],
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
      }
    } else {
      this.filterResult = [];
    }
    let filtro = localStorage.getItem('filtro');
    this.filtroSelected = JSON.parse(filtro);

    let typeAdTranslate: string = ''

    if (this.filtroSelected?.typeAd === 'rent') {
      typeAdTranslate = 'Alugar'
    } else if (this.filtroSelected?.typeAd === 'sale') {
      typeAdTranslate = 'Comprar'
    }
    this.filtroResultDisplay = {
      state: this.filtroSelected?.state,
      city: this.filtroSelected?.city,
      untilValueSale: this.filtroSelected?.untilValueSale,
      untilValueRent: this.filtroSelected?.untilValueRent,
      badRoomsQnt: this.filtroSelected?.badRoomsQnt,
      propertiesType: this.filtroSelected?.propertiesType,
      styleProperty: this.filtroSelected?.styleProperty,
      typeAd: typeAdTranslate,
      goal: this.filtroSelected?.goal,
      typeOfProperty:
        this.filtroSelected?.propertyapartamento ||
        this.filtroSelected?.propertystudio ||
        this.filtroSelected?.propertykitnet ||
        this.filtroSelected?.propertycasa ||
        this.filtroSelected?.propertycasacondominio ||
        this.filtroSelected?.propertycasadevila ||
        this.filtroSelected?.propertycobertura ||
        this.filtroSelected?.propertyloft ||
        this.filtroSelected?.propertyflat ||
        this.filtroSelected?.propertyterreno ||
        this.filtroSelected?.propertychacara ||
        this.filtroSelected?.propertyloja ||
        this.filtroSelected?.propertysalao ||
        this.filtroSelected?.propertysala ||
        this.filtroSelected?.propertygalpao ||
        this.filtroSelected?.propertyconjuntocomercial ||
        this.filtroSelected?.propertycasacomercial ||
        this.filtroSelected?.propertypousada ||
        this.filtroSelected?.propertyhotel ||
        this.filtroSelected?.propertymotel ||
        this.filtroSelected?.propertylajecorporativa ||
        this.filtroSelected?.propertyprediointeiro
    }
    if (filtro !== null) {
      this.form.patchValue({
        typeMaxPrice: this.filtroResultDisplay.untilValueSale,
        localproperty: this.filtroResultDisplay.city,
        typeOfProperty: this.filtroSelected?.typeOfProperty
      })
      this.searchByTypeAd(this.filtroSelected?.typeAd);
      this.filterTypeProperty(this.filtroSelected?.goal || 'Tipo do Imóvel');
      this.searchByBadRoom(this.filtroSelected?.badRoomsQnt)
      if (this.filtroSelected.styleProperty !== '') {
        this.searchByStyleProperty(this.filtroSelected.styleProperty || 'O que está buscando')
      }
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
    } else {
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
        // this.listAllCity = teste;
        this.propertyproducts = data
        this.response = data;
        this.ngxSpinnerService.hide();
        // console.log(this.listAllCity);
      }
    })
  }
  // compo-get-states
  selectEvent(item) {
    this.getSelectedCity = item.name;
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

  changeOderBy(value) {
    this.orderBy = value
  }

  searchByTypeAd(item) {
    if (item === 'sale') {
      this.selectTypeAd = 'Comprar'
    } else if (item === 'rent') {
      this.selectTypeAd = 'Alugar'
    }
  }

  filterTypeProperty(value) {
    this.TypeProperty = value
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
    if (item === '0') {
      this.selectVacancies = 'Tanto faz'
    } else if (item === '1') {
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

  filtrar() {
    this.ngxSpinnerService.show();
    this.announcementService.listAnnouncement().subscribe(
      success => {
        this.listAllForFilter = success;
        console.log(this.listAllForFilter)
        if (localStorage.getItem('user') !== null) {
          this.announcementService.listLikes().subscribe(
            success => {
              for (let i = 0; i < success.length; i++) {
                for (let x = 0; x < this.listAllForFilter.length; x++) {
                  if (success[i].announcement._id === this.listAllForFilter[x]._id) {
                    Object.assign(this.listAllForFilter[x], { liked: true });
                  }
                }
                this.listLikesForFilter.push(success[i].announcement)
              }
            }
          )
        }

        // 1° filtro
        let filter1: AnnouncementGetResponseDto[] = [];
        if (this.stylePropertyTitle !== 'O que está buscando') {
          console.log('filtro um é', this.stylePropertyTitle)
          filter1 = this.listAllForFilter.filter(elemento => elemento.propertyCharacteristics === this.removerAcento(this.stylePropertyTitle))
        } else {
          filter1 = this.listAllForFilter;
        }

        // 2° filtro
        let filter2: AnnouncementGetResponseDto[] = [];
        if (this.selectTypeAd !== 'Selecione') {
          if (filter1.length !== 0) {
            let type = ''
            if (this.selectTypeAd === 'Comprar') {
              type = 'sale'
            } else if (this.selectTypeAd === 'Alugar') {
              type = 'rent'
            }
            filter2 = filter1.filter(elemento => elemento.typeOfAd === type)
          }
        } else {
          filter2 = filter1
        }

        // 2° filtro
        let filter3: AnnouncementGetResponseDto[] = [];
        if (this.selectCity !== 'Local') {
          filter3 = filter2.filter(elemento => elemento.cityAddress === this.getSelectedCity)
          console.log('cidade selecionada', this.getSelectedCity)
          if (filter3.length === 0) {
            console.log(this.getSelectedCity, 'filtro 3 zerado')
          }
        } else {
          filter3 = filter2;
        }

        // 3-4° filtro
        let filter4: AnnouncementGetResponseDto[] = [];
        if (this.TypeProperty !== 'Tipo do Imóvel') {

          filter4 = filter3.filter(elemento => elemento.goal === this.TypeProperty)
          if (filter4.length === 0) {
            console.log(filter4,)
            console.log('caiu no filtro 4, zerado')
          }
        } else {
          filter4 = filter3
        }

        // 4-5° filtro
        let filter5: AnnouncementGetResponseDto[] = [];
        let valueMin: number = 0;
        let maxValue: number = 0;
        if (this.form.controls['typeMinPrice'].value !== '') {
          valueMin = this.form.controls['typeMinPrice'].value;
        }
        if (this.form.controls['typeMaxPrice'].value !== '') {
          maxValue = this.form.controls['typeMaxPrice'].value;
        }
        if (valueMin !== 0 && maxValue !== 0) {
          if (this.selectTypeAd === 'Comprar') {
            filter5 = filter4.filter(elemento => parseInt(elemento.saleValue) <= maxValue && parseInt(elemento.saleValue) >= valueMin)
          } else if (this.selectTypeAd === 'Alugar') {
            filter5 = filter4.filter(elemento => parseInt(elemento.leaseValue) <= maxValue && parseInt(elemento.leaseValue) >= valueMin)
          }
        } else {
          filter5 = filter4;
        }

        // 6° filtro

        let filter6: AnnouncementGetResponseDto[] = [];

        if (this.selectBadRooms !== 'Dormitórios') {
          let quartos = this.selectBadRooms.replace(/\D/gim, '')
          filter6 = filter5.filter(elemento => elemento.bedrooms >= parseInt(quartos))
        } else {
          filter6 = filter5
        }

        // 7° filtro
        let filter7: AnnouncementGetResponseDto[] = [];

        if (this.selectBathrooms !== 'Banheiros') {
          let banheiros = this.selectBathrooms.replace(/\D/gim, '')
          filter7 = filter6.filter(elemento => elemento.bathrooms >= parseInt(banheiros))
        } else {
          filter7 = filter6
        }

        // 8° filtro
        let filter8: AnnouncementGetResponseDto[] = [];

        if (this.selectVacancies !== 'Vagas' && this.selectVacancies !== 'Tanto faz') {
          let vagas = this.selectVacancies.replace(/\D/gim, '')
          filter8 = filter7.filter(elemento => elemento.parkingSpaces >= parseInt(vagas))
        } else {
          filter8 = filter7
        }


        // 9° filtro
        let filter9: AnnouncementGetResponseDto[] = [];

        let constructionYear = this.form.controls['typeconstruction'].value
        if (constructionYear !== 0 && constructionYear !== '') {
          filter9 = filter8.filter(elemento => parseInt(elemento.yearOfConstruction) >= constructionYear)
        } else {
          filter9 = filter8
        }

        // 10° filtro
        let filter10: AnnouncementGetResponseDto[] = [];


        let areaMax: number = 0;
        let minArea: number = 0;

        if (this.form.controls['typefootagemin'].value !== '') {
          minArea = this.form.controls['typefootagemin'].value;
        }

        if (this.form.controls['typefootagemax'].value !== '') {
          areaMax = this.form.controls['typefootagemax'].value;
        }



        if (minArea !== 0 && areaMax !== 0) {
          filter10 = filter9.filter(elemento => parseInt(elemento.usefulArea) <= areaMax && parseInt(elemento.usefulArea) >= minArea)
        } else {
          filter10 = filter9;
        }

        this.filterResult = filter10;
        console.log(this.filterResult)

        if (filter10.length === 0) {
          this.messageNotSearch = true;
          this.filterResult = this.listAllForFilter;
        }

        this.filtroResultDisplay = {
          state: '',
          city: '',
          untilValueSale: '',
          untilValueRent: '',
          badRoomsQnt: 0,
          propertiesType: '',
          typeAd: '',
          goal: '',
          styleProperty: '',
          typeOfProperty: []
        }
        this.ngxSpinnerService.hide();
      },
    );
  }

  searchByStyleProperty(value) {
    this.stylePropertyTitle = value
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
    // console.log(valor);
    this.listAllCity = [];
    for (let i = 0; i < estados.estados.length; i++) {
      if (valor === estados.estados[i].nome) {
        for (let x = 0; x < estados.estados[i].cidades.length; x++) {
          this.listAllCity.push({ name: estados.estados[i].cidades[x] })
          this.stateSelected = estados.estados[i].sigla
        }
      }
    }
    // console.log(this.listAllCity, 'lista');
  }
  sortPriceList(value: string) {
    this.listOfPrices = this.filterResult;
    if (value === 'minor>major') this.listOfPrices.sort((a, b) => a.saleValue < b.saleValue ? -1 : 0);
    else if (value === 'major>minor') this.listOfPrices.sort((a, b) => a.saleValue > b.saleValue ? -1 : 0);
  }
}
