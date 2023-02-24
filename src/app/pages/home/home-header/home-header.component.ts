import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AnnouncementGetResponseDto } from 'src/app/dtos/announcement-get-response.dto';
import { AnnouncementService } from '../../../service/announcement.service';
import  estados  from '../../../../assets/json/estados-cidades.json';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {
  @Input() fieldvalue = '';
  form: FormGroup;
  @ViewChild('searchresult') targetElement: ElementRef;


  response: AnnouncementGetResponseDto[] = [];
  filterResponse: AnnouncementGetResponseDto[] = [];
  isChecked = false;
  stringValue = '';
  selectedResidencial = 'residencial'
  selectedRural = 'rural'
  selectedComercial = 'comercial'
  stateSelected = 'Primeiro escolha um estado'
  citySelected = 'Escolha uma cidade'
  cities: any[];
  states: any[] = [
    {
      uf: 'AC',
      ufLirycs: 'Acre'
    },
    {
      uf: 'AL',
      ufLirycs: 'Alagoas'
    },
    {
      uf: 'AP',
      ufLirycs: 'Amapá'
    },
    {
      uf: 'AM',
      ufLirycs: 'Amazonas'
    },
    {
      uf: 'BA',
      ufLirycs: 'Bahia'
    },
    {
      uf: 'CE',
      ufLirycs: 'Ceara'
    },
    {
      uf: 'DF',
      ufLirycs: 'Distrito Federal'
    },
    {
      uf: 'ES',
      ufLirycs: 'Espírito Santo	'
    },
    {
      uf: 'GO',
      ufLirycs: 'Goiás'
    },
    {
      uf: 'MA',
      ufLirycs: 'Maranhão'
    },
    {
      uf: 'MT',
      ufLirycs: 'Mato Grosso'
    },
    {
      uf: 'MS',
      ufLirycs: 'Mato Grosso do Sul'
    },
    {
      uf: 'MG',
      ufLirycs: 'Minas Gerais'
    },
    {
      uf: 'PA',
      ufLirycs: 'Pará'
    },
    {
      uf: 'PB',
      ufLirycs: 'Paraíba'
    },
    {
      uf: 'PR',
      ufLirycs: 'Paraná'
    },
    {
      uf: 'PE',
      ufLirycs: 'Pernambuco'
    },
    {
      uf: 'PI',
      ufLirycs: 'Piauí'
    },
    {
      uf: 'RJ',
      ufLirycs: 'Rio de Janeiro	'
    },
    {
      uf: 'RN',
      ufLirycs: 'Rio Grande do Norte	'
    },
    {
      uf: 'RS',
      ufLirycs: 'Rio Grande do Sul	'
    },
    {
      uf: 'RO',
      ufLirycs: 'Rondônia'
    },
    {
      uf: 'RR',
      ufLirycs: 'Roraima'
    },
       {
      uf: 'SC',
      ufLirycs: 'Santa Catarina	'
    },
    {
      uf: 'SP',
      ufLirycs: 'São Paulo	'
    },
       {
      uf: 'SE',
      ufLirycs: 'Sergipe'
    },
       {
      uf: 'TO',
      ufLirycs: 'Tocantins	'
    },
    
  ];
  valueUntilSaleArray: any[] = [100000, 200000, 300000, 400000, 500000, 800000, 1000000, 2000000, 3000000, 4000000, 5000000, 10000000, 20000000,];
  valueUntilRentArray: any[] = [100, 200, 300, 400, 500, 800, 1000, 2000, 3000, 4000, 5000, 10000, 20000];
  badroomsArray: any[] = [1, 2, 3, 4, 5];
  goal: string;
  styleforPropertyE = 'edificio';
  styleforPropertyT = 'terreno';
  stylePropertys: string;


  typePropertyAllTitle: string = 'Tipo do imóvel';
  typeAd: string = 'sale';
  typeofProperty: string;
  typepropertyfull: string;
  typepropertyCR: string;


  checkedAll = false;

  AllResidencial = true;
  AllResidencial2 = false;
  checkedAllResidencial = false;
  checkedAllResidencial2 = false;

  checkedapartamento = false;
  checkedstudio = false;
  checkedkitnet = false;
  checkedcasa = false;
  checkedcasacondominio = false;
  checkedcasadevila = false;
  checkedcobertura = false;
  checkedloft = false;
  checkedflat = false;
  checkedterreno = false;
  checkedchacara = false;
  propertyapartamento: string;
  propertystudio: string;
  propertykitnet: string;
  propertycasa: string;
  propertycasacondominio: string;
  propertycasadevila: string;
  propertycobertura: string;
  propertyloft: string;
  propertyflat: string;
  propertyterreno: string;
  propertychacara: string;



  AllComercial = true;
  AllComercial2 = false;
  checkedAllComercial = false;
  checkedAllComercial2 = false;

  checkedloja = false;
  checkedsalao = false;
  checkedsala = false;
  checkedgalpao = false;
  checkedconjuntocomercial = false;
  checkedcasacomercial = false;
  checkedhotel = false;
  checkedmotel = false;
  checkedpousada = false;
  checkedlajecorporativa = false;
  checkedprediointeiro = false;
  propertyloja: string;
  propertysalao: string;
  propertysala: string;
  propertygalpao: string;
  propertyconjuntocomercial: string;
  propertycasacomercial: string;
  propertypousada: string;
  propertyhotel: string;
  propertymotel: string;
  propertylajecorporativa: string;
  propertyprediointeiro: string;



  resultsearchfor: any = [];
  collapsed = false;
  typepropertydiv = false;
  typeoffResidential = false;
  typeoffRural = false;
  typeoffCommercial = false;
  searchresult: any;
  filtersearch = false;
  liresultsearch: any = [];
  selectedcities: string;
  searchfilterTypeProperty: string;
  searchfilterType: string;
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
  alertPropertyOptions = false;
  resultType: any = [];


  listAllCity: any = [];
  keyword = 'name'
  getSelectedCity: string;
  estados: any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private announcementService: AnnouncementService,
    private toastrService: ToastrService
  ) {
    this.form = this.formBuilder.group({
      search: [''],
      typeStatus: ['', [Validators.required]],
      typeProperty: [''],
      typepropertyTeste: [''],
      typePropertyCity: [''],
      typePropertyState: [''],
      typePropertyValueRent: [''],
      typePropertyValueSale: [''],
      typePropertyBadrooms: [''],
    });
    this.estados = estados;
  }


  ngAfterViewInit(): void {
    // this.announcementService.listAnnouncement().subscribe({
    //   next: data => {
    //     let removeRepets: any = [];
    //     for (let i = 0; i < data.length; i++) {
    //       removeRepets.push(data[i].cityAddress)
    //     }
    //     var novaArr = removeRepets.filter((este, i) => removeRepets.indexOf(este) === i);
    //     for (let i = 0; i < novaArr.length; i++) {
    //       let testeCity = {
    //         name: novaArr[i]
    //       }
    //       this.listAllCity.push(testeCity)
    //     }
    //     console.log(this.listAllCity, 'lista cidades');
    //   }
    // })
  }


  ngOnInit() {
    console.log(this.estados);
    localStorage.removeItem('resultSearch');
    localStorage.removeItem('filtro')

    this.announcementService.listAnnouncement().subscribe(
      success => {
        this.response = success;
      },
      error => { console.log(error, 'data not collected') }
    );
  }

  selectEvent(item) {
    this.getSelectedCity = item.name;
    // do something with selected item
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something
  }
















  typePropertyCharacteristics(typeOf: string, item: string, value: string) {
    this.checkedAll = false;
    this.goal = typeOf;
    this.stylePropertys = item;

    // residencial
    if (value === 'apartamento') {
      this.checkedAllResidencial = false;
      this.checkedapartamento = !this.checkedapartamento;
      this.checkedapartamento ? this.propertyapartamento = 'apartamento' : this.propertyapartamento = '';
      console.log(this.propertyapartamento, this.checkedapartamento);
    }
    if (value === 'studio') {
      this.checkedAllResidencial = false;
      this.checkedstudio = !this.checkedstudio;
      this.checkedstudio ? this.propertystudio = 'studio' : this.propertystudio = '';
      console.log(this.propertystudio, this.checkedstudio);

    }
    if (value === 'kitnet') {
      this.checkedAllResidencial = false;
      this.checkedkitnet = !this.checkedkitnet;
      this.checkedkitnet ? this.propertykitnet = 'kitnet' : this.propertykitnet = '';
    }
    if (value === 'casa') {
      this.checkedAllResidencial = false;
      this.checkedcasa = !this.checkedcasa;
      this.checkedcasa ? this.propertycasa = 'casa' : this.propertycasa = '';
    }
    if (value === 'casacondominio') {
      this.checkedAllResidencial = false;
      this.checkedcasacondominio = !this.checkedcasacondominio;
      this.checkedcasacondominio ? this.propertycasacondominio = 'casacondominio' : this.propertycasacondominio = '';
    }
    if (value === 'casadevila') {
      this.checkedAllResidencial = false;
      this.checkedcasadevila = !this.checkedcasadevila;
      this.checkedcasadevila ? this.propertycasadevila = 'casadevila' : this.propertycasadevila = '';
    }
    if (value === 'loft') {
      this.checkedAllResidencial = false;
      this.checkedloft = !this.checkedloft;
      this.checkedloft ? this.propertyloft = 'loft' : this.propertyloft = '';
    }
    if (value === 'flat') {
      this.checkedAllResidencial = false;
      this.checkedflat = !this.checkedflat;
      this.checkedflat ? this.propertyflat = 'flat' : this.propertyflat = '';
    }
    if (value === 'terreno') {
      this.checkedAllResidencial = false;
      this.checkedterreno = !this.checkedterreno;
      this.checkedterreno ? this.propertyterreno = 'terreno' : this.propertyterreno = '';
    }
    if (value === 'chacara') {
      this.checkedAllResidencial = false;
      this.checkedchacara = !this.checkedchacara;
      this.checkedchacara ? this.propertychacara = 'chacara' : this.propertychacara = '';
    }
    if (value === 'todosesidencial') {
      this.AllResidencial = false;
      this.AllResidencial2 = true;
      this.checkedAllResidencial = false;
      this.checkedAllResidencial2 = true;

      this.checkedapartamento = true;
      this.checkedapartamento ? this.propertyapartamento = 'apartamento' : this.propertyapartamento = '';
      this.checkedstudio = true;
      this.checkedstudio ? this.propertystudio = 'studio' : this.propertystudio = '';
      this.checkedkitnet = true;
      this.checkedkitnet ? this.propertykitnet = 'kitnet' : this.propertykitnet = '';
      this.checkedcasa = true;
      this.checkedcasa ? this.propertycasa = 'casa' : this.propertycasa = '';
      this.checkedcobertura = true;
      this.checkedcobertura ? this.propertycobertura = 'cobertura' : this.propertycobertura = '';
      this.checkedcasacondominio = true;
      this.checkedcasacondominio ? this.propertycasacondominio = 'casacondominio' : this.propertycasacondominio = '';
      this.checkedcasadevila = true;
      this.checkedcasadevila ? this.propertycasadevila = 'casadevila' : this.propertycasadevila = '';
      this.checkedloft = true;
      this.checkedloft ? this.propertyloft = 'loft' : this.propertyloft = '';
      this.checkedflat = true;
      this.checkedflat ? this.propertyflat = 'flat' : this.propertyflat = '';
      this.checkedterreno = true;
      this.checkedterreno ? this.propertyterreno = 'terreno' : this.propertyterreno = '';
      this.checkedchacara = true;
      this.checkedchacara ? this.propertychacara = 'chacara' : this.propertychacara = '';
    }
    if (value === 'todosesidencial2') {
      this.AllResidencial = true;
      this.AllResidencial2 = false;
      this.checkedAllResidencial = false;
      this.checkedAllResidencial2 = !this.checkedAllResidencial2;

      this.checkedapartamento = !this.checkedapartamento;
      this.checkedapartamento ? this.propertyapartamento = 'apartamento' : this.propertyapartamento = '';
      this.checkedstudio = !this.checkedstudio;
      this.checkedstudio ? this.propertystudio = 'studio' : this.propertystudio = '';
      this.checkedkitnet = !this.checkedkitnet;
      this.checkedkitnet ? this.propertykitnet = 'kitnet' : this.propertykitnet = '';
      this.checkedcobertura = !this.checkedcobertura;
      this.checkedcobertura ? this.propertycobertura = 'cobertura' : this.propertycobertura = '';
      this.checkedcasa = !this.checkedcasa;
      this.checkedcasa ? this.propertycasa = 'casa' : this.propertycasa = '';
      this.checkedcasacondominio = !this.checkedcasacondominio;
      this.checkedcasacondominio ? this.propertycasacondominio = 'casacondominio' : this.propertycasacondominio = '';
      this.checkedcasadevila = !this.checkedcasadevila;
      this.checkedcasadevila ? this.propertycasadevila = 'casadevila' : this.propertycasadevila = '';
      this.checkedloft = !this.checkedloft;
      this.checkedloft ? this.propertyloft = 'loft' : this.propertyloft = '';
      this.checkedflat = !this.checkedflat;
      this.checkedflat ? this.propertyflat = 'flat' : this.propertyflat = '';
      this.checkedterreno = !this.checkedterreno;
      this.checkedterreno ? this.propertyterreno = 'terreno' : this.propertyterreno = '';
      this.checkedchacara = !this.checkedchacara;
      this.checkedchacara ? this.propertychacara = 'chacara' : this.propertychacara = '';
    }


    // Comercial
    if (value === 'loja') {
      this.checkedAllComercial = false;
      this.checkedloja = !this.checkedloja;
      this.checkedloja ? this.propertyloja = 'loja' : this.propertyloja = '';
      console.log(this.propertyloja, this.checkedloja);
    }
    if (value === 'salao') {
      this.checkedAllComercial = false;
      this.checkedsalao = !this.checkedsalao;
      this.checkedsalao ? this.propertysalao = 'salao' : this.propertysalao = '';
      console.log(this.propertysalao, this.checkedsalao);
    }
    if (value === 'sala') {
      this.checkedAllComercial = false;
      this.checkedsala = !this.checkedsala;
      this.checkedsala ? this.propertysala = 'sala' : this.propertysala = '';
      console.log(this.propertysala, this.checkedsala);
    }
    if (value === 'galpao') {
      this.checkedAllComercial = false;
      this.checkedgalpao = !this.checkedgalpao;
      this.checkedgalpao ? this.propertygalpao = 'galpao' : this.propertygalpao = '';
      console.log(this.propertygalpao, this.checkedgalpao);
    }
    if (value === 'conjuntocomercial') {
      this.checkedAllComercial = false;
      this.checkedconjuntocomercial = !this.checkedconjuntocomercial;
      this.checkedconjuntocomercial ? this.propertyconjuntocomercial = 'conjuntocomercial' : this.propertyconjuntocomercial = '';
      console.log(this.propertyconjuntocomercial, this.checkedconjuntocomercial);
    }
    if (value === 'casacomercial') {
      this.checkedAllComercial = false;
      this.checkedcasacomercial = !this.checkedcasacomercial;
      this.checkedcasacomercial ? this.propertycasacomercial = 'casacomercial' : this.propertycasacomercial = '';
      console.log(this.propertycasacomercial, this.checkedcasacomercial);
    }
    if (value === 'hotel') {
      this.checkedAllComercial = false;
      this.checkedhotel = !this.checkedhotel;
      this.checkedhotel ? this.propertyhotel = 'hotel' : this.propertyhotel = '';
      console.log(this.propertyhotel, this.checkedhotel);
    }
    if (value === 'motel') {
      this.checkedAllComercial = false;
      this.checkedmotel = !this.checkedmotel;
      this.checkedmotel ? this.propertymotel = 'motel' : this.propertymotel = '';
      console.log(this.propertymotel, this.checkedmotel);
    }
    if (value === 'pousada') {
      this.checkedAllComercial = false;
      this.checkedpousada = !this.checkedpousada;
      this.checkedpousada ? this.propertypousada = 'pousada' : this.propertypousada = '';
      console.log(this.propertypousada, this.checkedpousada);
    }
    if (value === 'lajecorporativa') {
      this.checkedAllComercial = false;
      this.checkedlajecorporativa = !this.checkedlajecorporativa;
      this.checkedlajecorporativa ? this.propertylajecorporativa = 'lajecorporativa' : this.propertylajecorporativa = '';
      console.log(this.propertylajecorporativa, this.checkedlajecorporativa);
    }
    if (value === 'prediointeiro') {
      this.checkedAllComercial = false;
      this.checkedprediointeiro = !this.checkedprediointeiro;
      this.checkedprediointeiro ? this.propertyprediointeiro = 'prediointeiro' : this.propertyprediointeiro = '';
      console.log(this.propertyprediointeiro, this.checkedprediointeiro);
    }

    if (value === 'todoscomercial') {
      this.AllComercial = false;
      this.AllComercial2 = true;
      this.checkedAllComercial = false;
      this.checkedAllComercial2 = true;

      this.checkedloja = true;
      this.checkedloja ? this.propertyloja = 'loja' : this.propertyloja = '';
      this.checkedsalao = true;
      this.checkedsalao ? this.propertysalao = 'salao' : this.propertysalao = '';
      this.checkedsala = true;
      this.checkedsala ? this.propertysala = 'sala' : this.propertysala = '';
      this.checkedgalpao = true;
      this.checkedgalpao ? this.propertygalpao = 'galpao' : this.propertygalpao = '';
      this.checkedconjuntocomercial = true;
      this.checkedconjuntocomercial ? this.propertyconjuntocomercial = 'conjuntocomercial' : this.propertyconjuntocomercial = '';
      this.checkedcasacomercial = true;
      this.checkedcasacomercial ? this.propertycasacomercial = 'casacomercial' : this.propertycasacomercial = '';
      this.checkedhotel = true;
      this.checkedhotel ? this.propertyhotel = 'hotel' : this.propertyhotel = '';
      this.checkedmotel = true;
      this.checkedmotel ? this.propertymotel = 'motel' : this.propertymotel = '';
      this.checkedpousada = true;
      this.checkedpousada ? this.propertypousada = 'pousada' : this.propertypousada = '';
      this.checkedlajecorporativa = true;
      this.checkedlajecorporativa ? this.propertylajecorporativa = 'lajecorporativa' : this.propertylajecorporativa = '';
      this.checkedprediointeiro = true;
      this.checkedprediointeiro ? this.propertyprediointeiro = 'prediointeiro' : this.propertyprediointeiro = '';
    }

    if (value === 'todoscomercial2') {
      this.AllComercial = true;
      this.AllComercial2 = false;
      this.checkedAllComercial = false;
      this.checkedAllComercial2 = !this.checkedAllComercial2;

      this.checkedloja = !this.checkedloja;
      this.checkedloja ? this.propertyloja = 'loja' : this.propertyloja = '';
      this.checkedsalao = !this.checkedsalao;
      this.checkedsalao ? this.propertysalao = 'salao' : this.propertysalao = '';
      this.checkedsala = !this.checkedsala;
      this.checkedsala ? this.propertysala = 'sala' : this.propertysala = '';
      this.checkedgalpao = !this.checkedgalpao;
      this.checkedgalpao ? this.propertygalpao = 'galpao' : this.propertygalpao = '';
      this.checkedconjuntocomercial = !this.checkedconjuntocomercial;
      this.checkedconjuntocomercial ? this.propertyconjuntocomercial = 'conjuntocomercial' : this.propertyconjuntocomercial = '';
      this.checkedcasacomercial = !this.checkedcasacomercial;
      this.checkedcasacomercial ? this.propertycasacomercial = 'casacomercial' : this.propertycasacomercial = '';
      this.checkedhotel = !this.checkedhotel;
      this.checkedhotel ? this.propertyhotel = 'hotel' : this.propertyhotel = '';
      this.checkedmotel = !this.checkedmotel;
      this.checkedmotel ? this.propertymotel = 'motel' : this.propertymotel = '';
      this.checkedpousada = !this.checkedpousada;
      this.checkedpousada ? this.propertypousada = 'pousada' : this.propertypousada = '';
      this.checkedlajecorporativa = !this.checkedlajecorporativa;
      this.checkedlajecorporativa ? this.propertylajecorporativa = 'lajecorporativa' : this.propertylajecorporativa = '';
      this.checkedprediointeiro = !this.checkedprediointeiro;
      this.checkedprediointeiro ? this.propertyprediointeiro = 'prediointeiro' : this.propertyprediointeiro = '';
    }

  }



  confirm() {

    if (this.stateSelected === 'Primeiro escolha um estado') this.form.controls['typePropertyState'].setValue('')
    let filter: any = {
      typeAd: this.typeAd,
      state: this.form.controls['typePropertyState'].value,
      city: this.getSelectedCity,
      allResidential: this.typepropertyfull,
      untilValueSale: this.form.controls['typePropertyValueSale'].value,
      untilValueRent: this.form.controls['typePropertyValueRent'].value,
      goal: this.goal, //residencial , comercial
      // residencial
      propertyapartamento: this.propertyapartamento,
      propertystudio: this.propertystudio,
      propertykitnet: this.propertykitnet,
      propertycasa: this.propertycasa,
      propertycasacondominio: this.propertycasacondominio,
      propertycasadevila: this.propertycasadevila,
      propertycobertura: this.propertycobertura,
      propertyloft: this.propertyloft,
      propertyflat: this.propertyflat,
      propertyterreno: this.propertyterreno,
      propertychacara: this.propertychacara,
      // comercial
      propertyloja: this.propertyloja,
      propertysalao: this.propertysalao,
      propertysala: this.propertysala,
      propertygalpao: this.propertygalpao,
      propertyconjuntocomercial: this.propertyconjuntocomercial,
      propertycasacomercial: this.propertycasacomercial,
      propertypousada: this.propertypousada,
      propertyhotel: this.propertyhotel,
      propertymotel: this.propertymotel,
      propertylajecorporativa: this.propertylajecorporativa,
      propertyprediointeiro: this.propertyprediointeiro,
      styleProperty: this.stylePropertys, // EDIFICIL, TERRENO
      badRoomsQnt: this.form.controls['typePropertyBadrooms'].value
    };

    console.log(filter.state, filter.city)


    // ---------------------------
    let announcementTypeAdGroup: AnnouncementGetResponseDto[] = [];
    if (filter.typeAd !== '') {
      for (let i = 0; i < this.response.length; i++) {
        if (this.response[i].typeOfAd === filter.typeAd) {
          announcementTypeAdGroup.push(this.response[i]);
        }
      }
    } else {
      announcementTypeAdGroup = this.response;
    }
    // ---------------------------

    let announcementStateGroup: AnnouncementGetResponseDto[] = [];
    if (filter.state !== '') {
      for (let i = 0; i < announcementTypeAdGroup.length; i++) {
        if (announcementTypeAdGroup[i].ufAddress === filter.state) {
          announcementStateGroup.push(announcementTypeAdGroup[i]);
        }
      }
    } else {
      announcementStateGroup = announcementTypeAdGroup;
    }
    // ---------------------------

    let announcementCityGroup: AnnouncementGetResponseDto[] = [];
    if (filter.city !== undefined) {
      for (let i = 0; i < announcementStateGroup.length; i++) {
        if (announcementStateGroup[i].cityAddress === filter.city) {
          announcementCityGroup.push(announcementStateGroup[i]);
        }
      }
    } else {
      announcementCityGroup = announcementStateGroup;
    }
    // ---------------------------

    let announcementGoalGroup: AnnouncementGetResponseDto[] = [];
    if (filter.goal !== undefined) {
      for (let i = 0; i < announcementCityGroup.length; i++) {
        if (announcementCityGroup[i].goal === filter.goal) {
          announcementGoalGroup.push(announcementCityGroup[i]);
        }
      }
    } else {
      announcementGoalGroup = announcementCityGroup
    }
    // ---------------------------



    let announcementTypeofPropertyGroup: AnnouncementGetResponseDto[] = [];
    if (
      // residencial
      filter.propertyapartamento !== undefined ||
      filter.propertystudio !== undefined ||
      filter.propertykitnet !== undefined ||
      filter.propertycasa !== undefined ||
      filter.propertycasacondominio !== undefined ||
      filter.propertycasadevila !== undefined ||
      filter.propertycobertura !== undefined ||
      filter.propertyloft !== undefined ||
      filter.propertyflat !== undefined ||
      filter.propertyterreno !== undefined ||
      filter.propertychacara !== undefined ||
      // comercial
      filter.propertyloja !== undefined ||
      filter.propertysalao !== undefined ||
      filter.propertysala !== undefined ||
      filter.propertygalpao !== undefined ||
      filter.propertyconjuntocomercial !== undefined ||
      filter.propertycasacomercial !== undefined ||
      filter.propertypousada !== undefined ||
      filter.propertyhotel !== undefined ||
      filter.propertymotel !== undefined ||
      filter.propertylajecorporativa !== undefined ||
      filter.propertyprediointeiro !== undefined
    ) {
      for (let i = 0; i < announcementGoalGroup.length; i++) {
        if (
          // residencial
          announcementGoalGroup[i].propertyType === filter.propertyapartamento ||
          announcementGoalGroup[i].propertyType === filter.propertystudio ||
          announcementGoalGroup[i].propertyType === filter.propertykitnet ||
          announcementGoalGroup[i].propertyType === filter.propertycasa ||
          announcementGoalGroup[i].propertyType === filter.propertycasacondominio ||
          announcementGoalGroup[i].propertyType === filter.propertycasadevila ||
          announcementGoalGroup[i].propertyType === filter.propertycobertura ||
          announcementGoalGroup[i].propertyType === filter.propertyloft ||
          announcementGoalGroup[i].propertyType === filter.propertyflat ||
          announcementGoalGroup[i].propertyType === filter.propertyterreno ||
          announcementGoalGroup[i].propertyType === filter.propertychacara ||
          // comercial
          announcementGoalGroup[i].propertyType === filter.propertyloja ||
          announcementGoalGroup[i].propertyType === filter.propertysalao ||
          announcementGoalGroup[i].propertyType === filter.propertysala ||
          announcementGoalGroup[i].propertyType === filter.propertygalpao ||
          announcementGoalGroup[i].propertyType === filter.propertyconjuntocomercial ||
          announcementGoalGroup[i].propertyType === filter.propertycasacomercial ||
          announcementGoalGroup[i].propertyType === filter.propertypousada ||
          announcementGoalGroup[i].propertyType === filter.propertyhotel ||
          announcementGoalGroup[i].propertyType === filter.propertymotel ||
          announcementGoalGroup[i].propertyType === filter.propertylajecorporativa ||
          announcementGoalGroup[i].propertyType === filter.propertyprediointeiro
        ) {
          announcementTypeofPropertyGroup.push(announcementGoalGroup[i]);
        }
      }
    } else {
      announcementTypeofPropertyGroup = announcementGoalGroup
    }
    // ---------------------------

    let announcementStylePropertyGroup: AnnouncementGetResponseDto[] = [];
    if (filter.styleProperty !== undefined) {
      for (let i = 0; i < announcementTypeofPropertyGroup.length; i++) {
        if (announcementTypeofPropertyGroup[i].propertyCharacteristics === filter.styleProperty) {
          announcementStylePropertyGroup.push(announcementTypeofPropertyGroup[i]);
        }
      }
    } else {
      announcementStylePropertyGroup = announcementTypeofPropertyGroup
    }
    // ---------------------------

    let announcementBadRoomsGroup: AnnouncementGetResponseDto[] = [];
    if (filter.badRoomsQnt !== '') {
      for (let i = 0; i < announcementStylePropertyGroup.length; i++) {
        if (announcementStylePropertyGroup[i].bedrooms >= filter.badRoomsQnt) {
          announcementBadRoomsGroup.push(announcementStylePropertyGroup[i]);
        }
      }
    } else {
      announcementBadRoomsGroup = announcementStylePropertyGroup
    }
    // ---------------------------

    let announcementValueUntilSaleGroup: AnnouncementGetResponseDto[] = [];
    if (filter.untilValueSale !== '') {
      for (let i = 0; i < announcementBadRoomsGroup.length; i++) {
        if (announcementBadRoomsGroup[i].saleValue >= filter.untilValueSale) {
          announcementValueUntilSaleGroup.push(announcementBadRoomsGroup[i]);
        }
      }
    } else {
      announcementValueUntilSaleGroup = announcementBadRoomsGroup
    }
    // ---------------------------

    let announcementValueUntilRentGroup: AnnouncementGetResponseDto[] = [];
    if (filter.untilValueRent !== '') {
      for (let i = 0; i < announcementValueUntilSaleGroup.length; i++) {
        if (announcementValueUntilSaleGroup[i].leaseValue >= filter.untilValueRent) {
          announcementValueUntilRentGroup.push(announcementValueUntilSaleGroup[i]);
        }
      }
    } else {
      announcementValueUntilRentGroup = announcementValueUntilSaleGroup
    }



    this.resultType = announcementValueUntilRentGroup;
    console.log(this.resultType, filter)


    localStorage.setItem('filtro', JSON.stringify(filter))
    localStorage.setItem('resultSearch', JSON.stringify(this.resultType));
    this.router.navigate(['/search']);

  }


  buyOption(value: string) {
    this.typeAd = value;
    if (value === 'sale') {
      this.collapsed = false;
    } else if (value === 'rent') {
      this.collapsed = true;
    }
  }

  getEstados(value){
    let valor = value.target.value;
    console.log(valor);
    this.listAllCity = [];
    for (let i = 0; i < estados.estados.length; i++) {
      if(valor === estados.estados[i].nome){
        for (let x = 0; x < estados.estados[i].cidades.length; x++) {
          this.listAllCity.push({name: estados.estados[i].cidades[x]})
          this.stateSelected = estados.estados[i].sigla
        }
      }
    }
    console.log(this.listAllCity, 'lista');
  }
}


