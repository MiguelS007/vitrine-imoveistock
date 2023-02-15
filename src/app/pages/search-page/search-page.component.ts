import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnnouncementGetResponseDto } from 'src/app/dtos/announcement-get-response.dto';
import { UserGetResponseDto } from 'src/app/dtos/user-get-response.dtos';
import { DatamokService } from 'src/app/service/datamok.service';
import { SearchService } from 'src/app/service/search.service';
import { UserService } from 'src/app/service/user.service';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { NgxSpinnerService } from "ngx-spinner";
import { AnnouncementService } from 'src/app/service/announcement.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalLoginComponent } from 'src/app/auth/modal-login/modal-login.component';

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

  response: AnnouncementGetResponseDto[] = [];
  user: UserGetResponseDto;
  urlsimg: any = [];

  filterResult: AnnouncementGetResponseDto[] = [];

  filtroSelected: any;

  filtroResultDisplay: {
    typeAd: string,
    where: string,
    whatAreYouLookingFor: string,
    propertyType: string,
    goal: string,
    checkvacancies: string,
    checkbathrooms: string,
    checksuites: string,
    checkrooms: string,
    checkcondominium: string,
    checkfootage: string,
    checkconstruction: string,
    checkrenovated: string,
  }

  orderBy: string = 'Selecione'

  recentlySeenIdsList: any = [];


  recentlySeenList: AnnouncementGetResponseDto[] = [];

  listLikes: AnnouncementGetResponseDto[] = [];

  messageNotSearch = false;

  selectTypeAd = 'Selecione';
  selectBathrooms = 'Banheiros';
  selectRooms = 'Dormitórios';
  selectVacancies = 'Vagas';
  valuePrices: 0;

  whatAreYouLookingForTitle: string = 'O que está buscando?';
  TypeProperty = 'Tipo de Imóvel';


  listAllForFilter: AnnouncementGetResponseDto[] = [];
  listLikesForFilter: AnnouncementGetResponseDto[] = [];

  listAllCity: any = [
    {
      cidade: ''
    }
  ];

  selectCity: string = 'Local';

  modalFilter: boolean = false;

  formModal: FormGroup;

  modalFilterOpen: boolean = false;

  constructor(
    private router: Router,
    private datamokservice: DatamokService,
    private userService: UserService,
    private searchService: SearchService,
    private formBuilder: FormBuilder,
    private ngxSpinnerService: NgxSpinnerService,
    private announcementService: AnnouncementService,
    private modalService: NgbModal

  ) {
    this.form = this.formBuilder.group({
      searchwords: [''],
      localproperty: [''],
      propertyType: [''],
      typeproperty: [''],
      typeMaxPrice: [''],
      typeMinPrice: [''],
      typebathroom: [''],
      typerooms: [''],
      typevacancies: [''],
      typeconstruction: [''],
      typefootagemax: [''],
      typefootagemin: [''],
      orderby: [''],
    });


    this.formModal = this.formBuilder.group({
      searchwords: [''],
      localproperty: [''],
      propertyType: [''],
      typeproperty: [''],
      typeMaxPrice: [''],
      typeMinPrice: [''],
      typebathroom: [''],
      typerooms: [''],
      typevacancies: [''],
      typeconstruction: [''],
      typefootagemax: [''],
      typefootagemin: [''],
      orderby: [''],
    });

  }

  ngOnInit(): void {

    this.ngxSpinnerService.show();
    this.products = this.datamokservice.resultSearch;


    let recentlySeenList = localStorage.getItem('recentlySeen');
    this.recentlySeenIdsList = JSON.parse(recentlySeenList);

    let resultadoVerify = localStorage.getItem('resultSearch');
    if (resultadoVerify !== null) {
      this.filterResult = JSON.parse(resultadoVerify);
      if (this.filterResult.length === 0) {
        this.messageNotSearch = true;
      }
    } else {
      this.filterResult = [];
    }

    if (this.recentlySeenIdsList !== null) {
      for (let i = 0; i < this.recentlySeenIdsList.length; i++) {
        this.searchService.getPropertyDetails(this.recentlySeenIdsList[i]._id).subscribe(
          success => this.recentlySeenList.push(success),
          error => console.log(error)
        )
      }
    }

    let filtro = localStorage.getItem('filtro');
    this.filtroSelected = JSON.parse(filtro);

    let typeAdTranslate: string = ''

    if (this.filtroSelected?.typeAd === 'rent') {
      typeAdTranslate = 'Alugar'
    } else if (this.filtroSelected?.typeAd === 'sale') {
      typeAdTranslate = 'Venda'
    }


    this.filtroResultDisplay = {
      typeAd: typeAdTranslate,
      where: this.filtroSelected?.where,
      whatAreYouLookingFor: this.filtroSelected?.whatAreYouLookingFor,
      propertyType: this.filtroSelected?.propertyType,
      goal: this.filtroSelected?.goal,
      checkvacancies: '',
      checkbathrooms: '',
      checksuites: '',
      checkrooms: '',
      checkcondominium: '',
      checkfootage: '',
      checkconstruction: '',
      checkrenovated: '',
    }

    if (filtro !== null) {
      this.form.patchValue({
        // typeproperty: this.filtroSelected.whatAreYouLookingFor,
        localproperty: this.filtroSelected.where,
        propertyType: this.filtroSelected.propertyType
      })
      this.searchByTypeAd(this.filtroSelected?.typeAd);

      if (this.filtroSelected.whatAreYouLookingFor !== '') {
        this.whatAreYouLookingFor(this.filtroSelected.whatAreYouLookingFor)
      }
    }

    if (this.filterResult === null || this.filterResult.length === 0) {
      this.searchService.getPropertyListAll().subscribe(
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

    let teste: any = [];

    this.searchService.getPropertyListAll().subscribe({
      next: data => {
        this.listAllCity = [];
        let removeRepets: any = [];
        for (let i = 0; i < data.length; i++) {
          removeRepets.push(data[i].cityAddress)
        }
        teste = new Set(removeRepets)
        this.listAllCity = teste
      }
    })




    this.searchService.getPropertyHomeExclusivity().subscribe(
      success => {
        this.propertyproducts = success
        this.response = success;
        this.ngxSpinnerService.hide();
      },
      error => { console.log(error, 'data not collected') }
    );
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

  filterSearch() {
    this.filterbtn = !this.filterbtn
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
  searchBy(item) {
    // SELECT BADROOMS
    if (item === '1') {
      this.selectRooms = '+1 Quarto'
    } else if (item === '2') {
      this.selectRooms = '+2  Quartos'
    } else if (item === '3') {
      this.selectRooms = '+3  Quartos'
    } else if (item === '4') {
      this.selectRooms = '+4  Quartos'
    } else if (item === '5') {
      this.selectRooms = '+5  Quartos'
    }
    // SELECT BATHROOMS
    else if (item === '1b') {
      this.selectBathrooms = '+1  Banheiro'
    } else if (item === '2b') {
      this.selectBathrooms = '+2  Banheiros'
    } else if (item === '3b') {
      this.selectBathrooms = '+3  Banheiros'
    } else if (item === '4b') {
      this.selectBathrooms = '+4  Banheiros'
    } else if (item === '5b') {
      this.selectBathrooms = '+5  Banheiros'
    }
    // SELECT ROOMS
    else if (item === 'tf') {
      this.selectVacancies = 'Tanto faz'
    } else if (item === '1v') {
      this.selectVacancies = '+1  Vagas'
    } else if (item === '2v') {
      this.selectVacancies = '+2  Vagas'
    } else if (item === '3v') {
      this.selectVacancies = '+3  Vagas'
    } else if (item === '4v') {
      this.selectVacancies = '+4  Vagas'
    } else if (item === '5v') {
      this.selectVacancies = '+5  Vagas'
    }
  }

  whatAreYouLookingFor(value) {
    this.whatAreYouLookingForTitle = value
  }
  filterTypeProperty(value) {
    this.TypeProperty = value
  }

  searchByCity(item) {
    this.selectCity = item
  }

  filtrar() {
    // this.listForFilterOnClick();
    // let listAll:  AnnouncementGetResponseDto[] = [];
    // let listLikesFilter: AnnouncementGetResponseDto[] = [];
    this.ngxSpinnerService.show();
    this.searchService.getPropertyListAll().subscribe(
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
        let filter1: AnnouncementGetResponseDto[] = [];
        if (this.whatAreYouLookingForTitle !== 'O que está buscando?') {
          console.log('filtro um é', this.whatAreYouLookingForTitle)
          filter1 = this.listAllForFilter.filter(elemento => elemento.propertyCharacteristics === this.removerAcento(this.whatAreYouLookingForTitle))
          if (filter1.length === 0) {
            // filter1 = this.listAllForFilter;
            console.log('nao tem', this.whatAreYouLookingForTitle)
          }
        } else {
          filter1 = this.listAllForFilter;
          console.log('não tem filtro', this.whatAreYouLookingForTitle);
          console.log(filter1)
        }
        let filter2: AnnouncementGetResponseDto[] = [];
        if (this.selectTypeAd !== 'Selecione') {
          if (filter1.length !== 0) {
            let type = ''
            if (this.selectTypeAd === 'Comprar') {
              type = 'sale'
            } else {
              type = 'rent'
            }
            filter2 = filter1.filter(elemento => elemento.typeOfAd === type)
            console.log('entrou no filtro 2', type);
          }
        } else {
          filter2 = filter1
        }
        let filter3: AnnouncementGetResponseDto[] = [];
        if (this.selectCity !== 'Local') {
          filter3 = filter2.filter(elemento => elemento.cityAddress === this.selectCity)
          console.log('cidade selecionada', this.selectCity)
          if (filter3.length === 0) {
            console.log('filtro 3 zerado')
          }
        } else {
          filter3 = filter2
        }

        let filter4: AnnouncementGetResponseDto[] = [];
        if (this.TypeProperty !== 'Tipo de Imóvel') {
          filter4 = filter3.filter(elemento => elemento.propertyType === this.TypeProperty)
          if (filter4.length === 0) {
            console.log('caiu no filtro 4, zerado')
          }
        } else {
          filter4 = filter3
        }

        let filter5: AnnouncementGetResponseDto[] = [];

        let valueMin: number = 0;
        let maxValue: number = 0;


        if(this.modalFilterOpen === false) {
          if (this.form.controls['typeMinPrice'].value !== '') {
            valueMin = this.form.controls['typeMinPrice'].value;
          }
  
          if (this.form.controls['typeMaxPrice'].value !== '') {
            maxValue = this.form.controls['typeMaxPrice'].value;
          }
        } else {
          if (this.form.controls['typeMinPrice'].value !== '') {
            valueMin = this.formModal.controls['typeMinPrice'].value;
          }
  
          if (this.form.controls['typeMaxPrice'].value !== '') {
            maxValue = this.formModal.controls['typeMaxPrice'].value;
          }
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

        let filter6: AnnouncementGetResponseDto[] = [];

        if (this.selectRooms !== 'Dormitórios') {
          let quartos = this.selectRooms.replace(/\D/gim, '')
          filter6 = filter5.filter(elemento => elemento.bedrooms >= parseInt(quartos))
          console.log(quartos)
        } else {
          filter6 = filter5
        }

        let filter7: AnnouncementGetResponseDto[] = [];

        if (this.selectBathrooms !== 'Banheiros') {
          let banheiros = this.selectBathrooms.replace(/\D/gim, '')
          filter7 = filter6.filter(elemento => elemento.bathrooms >= parseInt(banheiros))
          console.log(banheiros)
        } else {
          filter7 = filter6
        }

        let filter8: AnnouncementGetResponseDto[] = [];

        if (this.selectVacancies !== 'Vagas' && this.selectVacancies !== 'Tanto faz') {
          let vagas = this.selectVacancies.replace(/\D/gim, '')
          filter8 = filter7.filter(elemento => elemento.parkingSpaces >= parseInt(vagas))
          console.log(vagas)
        } else {
          filter8 = filter7
        }

        let filter9: AnnouncementGetResponseDto[] = [];

        let constructionYear = this.form.controls['typeconstruction'].value
        if (constructionYear !== 0 && constructionYear !== '') {
          filter9 = filter8.filter(elemento => parseInt(elemento.yearOfConstruction) >= constructionYear)
        } else {
          filter9 = filter8
        }

        let filter10: AnnouncementGetResponseDto[] = [];


        let areaMax: number = 0;
        let minArea: number = 0;

        if(this.modalFilterOpen === false) {
          if (this.form.controls['typefootagemin'].value !== '') {
            minArea = this.form.controls['typefootagemin'].value;
          }
  
          if (this.form.controls['typefootagemax'].value !== '') {
            areaMax = this.form.controls['typefootagemax'].value;
          }
        } else {
          if (this.form.controls['typefootagemin'].value !== '') {
            minArea = this.formModal.controls['typefootagemin'].value;
          }
  
          if (this.form.controls['typefootagemax'].value !== '') {
            areaMax = this.formModal.controls['typefootagemax'].value;
          }
        }


        if (minArea !== 0 && areaMax !== 0) {
          filter10 = filter9.filter(elemento => parseInt(elemento.usefulArea) <= areaMax && parseInt(elemento.usefulArea) >= minArea)
        } else {
          filter10 = filter9;
        }

        this.filterResult = filter10;

        if (filter10.length === 0) {
          this.messageNotSearch = true;
          this.filterResult = this.listAllForFilter;
        }

        if (this.modalFilterOpen === true) {
          this.exit()
        }

        this.ngxSpinnerService.hide();
      },
    );
  }

  openFilter(content) {

    this.modalFilterOpen = true

    const modalRef = this.modalService.open(content, { centered: true });
      modalRef.result.then(data => {
      }, error => {
        this.modalFilterOpen = false
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

}
