import { Component,OnInit, } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AnnouncementGetResponseDto } from 'src/app/dtos/announcement-get-response.dto';
import { AnnouncementService } from '../../../service/announcement.service';
import estados from '../../../../assets/json/estados-cidades.json';

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
  selectedResidencial = 'residencial'
  selectedRural = 'rural'
  selectedComercial = 'comercial'
  stateSelected = 'Primeiro escolha um estado'
  citySelected = 'Escolha uma cidade'
  cities: any[];

  valueUntilSaleArray: any[] = [100000, 200000, 300000, 400000, 500000, 800000, 1000000, 2000000, 3000000, 4000000, 5000000, 10000000, 20000000,];
  valueUntilRentArray: any[] = [100, 200, 300, 400, 500, 800, 1000, 2000, 3000, 4000, 5000, 10000, 20000];
  badroomsArray: any[] = [1, 2, 3, 4, 5];
  goal: string;
  styleforPropertyE = 'edificio';
  styleforPropertyT = 'terreno';
  stylePropertys: string;


  typePropertyAllTitle = "Tipo do imóvel";
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
  propertygalpao: string;
  propertyconjuntocomercial: string;
  propertycasacomercial: string;
  propertypousada: string;
  propertyhotel: string;
  propertymotel: string;
  propertylajecorporativa: string;
  propertyprediointeiro: string;



  collapsed = false;
  typepropertydiv = false;
  typeoffResidential = false;
  typeoffRural = false;
  typeoffCommercial = false;
  filtersearch = false;
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
  extensiveState: any;
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
  ngOnInit() {
    localStorage.removeItem('resultSearch');
    localStorage.removeItem('filtro')

    this.announcementService.listAnnouncement().subscribe(
      success => {
        this.response = success;
      },
      error => { console.error(error, 'data not collected') }
    );
  }

  selectEvent(item) {
    this.getSelectedCity = item.name;
  }
  onChangeSearch(search: string) {
  }
  typePropertyCharacteristics(typeOf: string, item: string, value: string): void {
    // this.checkedAll = false;
    this.goal = typeOf;
    this.stylePropertys = item;
    console.log(value);
    // residencial
    if (value === 'apartamento') {
      if (this.checkedAllResidencial2) {
        this.checkedapartamento = false;
        this.checkedstudio = false;
        this.checkedkitnet = false;
        this.checkedcasa = false;
        this.checkedcobertura = false;
        this.checkedcasacondominio = false;
        this.checkedcasadevila = false;
        this.checkedloft = false;
        this.checkedflat = false;
        this.checkedterreno = false;
        this.checkedchacara = false;
      }
      this.checkedAllResidencial = false;
      this.checkedAllResidencial2 = false;

      this.checkedapartamento = !this.checkedapartamento;
      this.checkedapartamento ? this.propertyapartamento = 'apartamento' : this.propertyapartamento = '';
      if (this.typePropertyAllTitle.includes('Tipo do imóvel') || this.typePropertyAllTitle.includes('Todos os Imóveis Residenciais')) {
        this.typePropertyAllTitle = '';
        this.typePropertyAllTitle.replace('Apartamento, ', '')
      }
      if (this.typePropertyAllTitle.includes('Apartamento, ')) {
        this.typePropertyAllTitle = this.typePropertyAllTitle.replace('Apartamento, ', '');
      } else {
        this.typePropertyAllTitle += 'Apartamento, ' + ' ';
      }
    }

    if (value === 'studio') {
      if (this.checkedAllResidencial2) {
        this.checkedapartamento = false;
        this.checkedstudio = false;
        this.checkedkitnet = false;
        this.checkedcasa = false;
        this.checkedcobertura = false;
        this.checkedcasacondominio = false;
        this.checkedcasadevila = false;
        this.checkedloft = false;
        this.checkedflat = false;
        this.checkedterreno = false;
        this.checkedchacara = false;
      } this.checkedAllResidencial = false;
      this.checkedAllResidencial2 = false;
      this.checkedstudio = !this.checkedstudio;
      this.checkedstudio ? this.propertystudio = 'studio' : this.propertystudio = '';
      if (this.typePropertyAllTitle.includes('Tipo do imóvel') || this.typePropertyAllTitle.includes('Todos os Imóveis Residenciais')) {
        this.typePropertyAllTitle = '';
        this.typePropertyAllTitle.replace('Studio, ', '')
      }
      if (this.typePropertyAllTitle.includes('Studio')) {
        this.typePropertyAllTitle = this.typePropertyAllTitle.replace('Studio, ', '');
      } else {
        this.typePropertyAllTitle += 'Studio, ' + ' ';
      }

      console.log(this.propertystudio, this.checkedstudio);

    }
    if (value === 'kitnet') {
      if (this.checkedAllResidencial2) {
        this.checkedapartamento = false;
        this.checkedstudio = false;
        this.checkedkitnet = false;
        this.checkedcasa = false;
        this.checkedcobertura = false;
        this.checkedcasacondominio = false;
        this.checkedcasadevila = false;
        this.checkedloft = false;
        this.checkedflat = false;
        this.checkedterreno = false;
        this.checkedchacara = false;
      }
      this.checkedAllResidencial2 = false;
      this.checkedAllResidencial = false;
      this.checkedkitnet = !this.checkedkitnet;
      this.checkedkitnet ? this.propertykitnet = 'kitnet' : this.propertykitnet = '';
      if (this.typePropertyAllTitle.includes('Tipo do imóvel') || this.typePropertyAllTitle.includes('Todos os Imóveis Residenciais')) {
        this.typePropertyAllTitle = '';
        this.typePropertyAllTitle.replace('Kitnet, ', '')
      }
      if (this.typePropertyAllTitle.includes('Kitnet, ')) {
        this.typePropertyAllTitle = this.typePropertyAllTitle.replace('Kitnet, ', '');
      } else {
        this.typePropertyAllTitle += 'Kitnet, ' + ' ';
      }
    }
    if (value === 'casa') {
      if (this.checkedAllResidencial2) {
        this.checkedapartamento = false;
        this.checkedstudio = false;
        this.checkedkitnet = false;
        this.checkedcasa = false;
        this.checkedcobertura = false;
        this.checkedcasacondominio = false;
        this.checkedcasadevila = false;
        this.checkedloft = false;
        this.checkedflat = false;
        this.checkedterreno = false;
        this.checkedchacara = false;
      }
      this.checkedAllResidencial2 = false;
      this.checkedAllResidencial = false;
      this.checkedcasa = !this.checkedcasa;
      this.checkedcasa ? this.propertycasa = 'casa' : this.propertycasa = '';
      if (this.typePropertyAllTitle.includes('Tipo do imóvel') || this.typePropertyAllTitle.includes('Todos os Imóveis Residenciais')) {
        this.typePropertyAllTitle = '';
        this.typePropertyAllTitle.replace('Casa, ', '')
      }
      if (this.typePropertyAllTitle.includes('Casa, ')) {
        this.typePropertyAllTitle = this.typePropertyAllTitle.replace('Casa, ', '');
      } else {
        this.typePropertyAllTitle += 'Casa, ' + ' ';
      }
    }
    if (value === 'casacondominio') {
      if (this.checkedAllResidencial2) {
        this.checkedapartamento = false;
        this.checkedstudio = false;
        this.checkedkitnet = false;
        this.checkedcasa = false;
        this.checkedcobertura = false;
        this.checkedcasacondominio = false;
        this.checkedcasadevila = false;
        this.checkedloft = false;
        this.checkedflat = false;
        this.checkedterreno = false;
        this.checkedchacara = false;
      }
      this.checkedAllResidencial2 = false;
      this.checkedAllResidencial = false;
      this.checkedcasacondominio = !this.checkedcasacondominio;
      this.checkedcasacondominio ? this.propertycasacondominio = 'casacondominio' : this.propertycasacondominio = '';
      if (this.typePropertyAllTitle.includes('Tipo do imóvel') || this.typePropertyAllTitle.includes('Todos os Imóveis Residenciais')) {
        this.typePropertyAllTitle = '';
        this.typePropertyAllTitle.replace('Casa Condominio, ', '')
      }
      if (this.typePropertyAllTitle.includes('Casa Condominio, ')) {
        this.typePropertyAllTitle = this.typePropertyAllTitle.replace('Casa Condominio, ', '');
      } else {
        this.typePropertyAllTitle += 'Casa Condominio, ' + ' ';
      }
    }
    if (value === 'casadevila') {
      if (this.checkedAllResidencial2) {
        this.checkedapartamento = false;
        this.checkedstudio = false;
        this.checkedkitnet = false;
        this.checkedcasa = false;
        this.checkedcobertura = false;
        this.checkedcasacondominio = false;
        this.checkedcasadevila = false;
        this.checkedloft = false;
        this.checkedflat = false;
        this.checkedterreno = false;
        this.checkedchacara = false;
      }
      this.checkedAllResidencial2 = false;
      this.checkedAllResidencial = false;
      this.checkedcasadevila = !this.checkedcasadevila;
      this.checkedcasadevila ? this.propertycasadevila = 'casadevila' : this.propertycasadevila = '';
      if (this.typePropertyAllTitle.includes('Tipo do imóvel') || this.typePropertyAllTitle.includes('Todos os Imóveis Residenciais')) {
        this.typePropertyAllTitle = '';
        this.typePropertyAllTitle.replace('Casa de Vila, ', '')
      }
      if (this.typePropertyAllTitle.includes('Casa de Vila, ')) {
        this.typePropertyAllTitle = this.typePropertyAllTitle.replace('Casa de Vila, ', '');
      } else {
        this.typePropertyAllTitle += 'Casa de Vila, ' + ' ';
      }
    }
    if (value === 'loft') {
      if (this.checkedAllResidencial2) {
        this.checkedapartamento = false;
        this.checkedstudio = false;
        this.checkedkitnet = false;
        this.checkedcasa = false;
        this.checkedcobertura = false;
        this.checkedcasacondominio = false;
        this.checkedcasadevila = false;
        this.checkedloft = false;
        this.checkedflat = false;
        this.checkedterreno = false;
        this.checkedchacara = false;
      }
      this.checkedAllResidencial2 = false;
      this.checkedAllResidencial = false;
      this.checkedloft = !this.checkedloft;
      this.checkedloft ? this.propertyloft = 'loft' : this.propertyloft = '';
      if (this.typePropertyAllTitle.includes('Tipo do imóvel') || this.typePropertyAllTitle.includes('Todos os Imóveis Residenciais')) {
        this.typePropertyAllTitle = '';
        this.typePropertyAllTitle.replace('Loft, ', '')
      }
      if (this.typePropertyAllTitle.includes('Loft, ')) {
        this.typePropertyAllTitle = this.typePropertyAllTitle.replace('Loft, ', '');
      } else {
        this.typePropertyAllTitle += 'Loft, ' + ' ';
      }
    }
    if (value === 'flat') {
      if (this.checkedAllResidencial2) {
        this.checkedapartamento = false;
        this.checkedstudio = false;
        this.checkedkitnet = false;
        this.checkedcasa = false;
        this.checkedcobertura = false;
        this.checkedcasacondominio = false;
        this.checkedcasadevila = false;
        this.checkedloft = false;
        this.checkedflat = false;
        this.checkedterreno = false;
        this.checkedchacara = false;
      }
      this.checkedAllResidencial2 = false;
      this.checkedAllResidencial = false;
      this.checkedflat = !this.checkedflat;
      this.checkedflat ? this.propertyflat = 'flat' : this.propertyflat = '';
      if (this.typePropertyAllTitle.includes('Tipo do imóvel') || this.typePropertyAllTitle.includes('Todos os Imóveis Residenciais')) {
        this.typePropertyAllTitle = '';
        this.typePropertyAllTitle.replace('Flat, ', '')
      }
      if (this.typePropertyAllTitle.includes('Flat, ')) {
        this.typePropertyAllTitle = this.typePropertyAllTitle.replace('Flat, ', '');
      } else {
        this.typePropertyAllTitle += 'Flat, ' + ' ';
      }
    }
    if (value === 'terreno') {
      if (this.checkedAllResidencial2) {
        this.checkedapartamento = false;
        this.checkedstudio = false;
        this.checkedkitnet = false;
        this.checkedcasa = false;
        this.checkedcobertura = false;
        this.checkedcasacondominio = false;
        this.checkedcasadevila = false;
        this.checkedloft = false;
        this.checkedflat = false;
        this.checkedterreno = false;
        this.checkedchacara = false;
      }
      this.checkedAllResidencial2 = false;
      this.checkedAllResidencial = false;
      this.checkedterreno = !this.checkedterreno;
      this.checkedterreno ? this.propertyterreno = 'terreno' : this.propertyterreno = '';
      if (this.typePropertyAllTitle.includes('Tipo do imóvel') || this.typePropertyAllTitle.includes('Todos os Imóveis Residenciais')) {
        this.typePropertyAllTitle = '';
        this.typePropertyAllTitle.replace('Terreno, ', '')
      }
      if (this.typePropertyAllTitle.includes('Terreno, ')) {
        this.typePropertyAllTitle = this.typePropertyAllTitle.replace('Terreno, ', '');
      } else {
        this.typePropertyAllTitle += 'Terreno, ' + ' ';
      }
    }
    if (value === 'cobertura') {
      if (this.checkedAllResidencial2) {
        this.checkedapartamento = false;
        this.checkedstudio = false;
        this.checkedkitnet = false;
        this.checkedcasa = false;
        this.checkedcobertura = false;
        this.checkedcasacondominio = false;
        this.checkedcasadevila = false;
        this.checkedloft = false;
        this.checkedflat = false;
        this.checkedterreno = false;
        this.checkedchacara = false;
      }
      this.checkedAllResidencial2 = false;
      this.checkedAllResidencial = false;
      this.checkedcobertura = !this.checkedcobertura;
      this.checkedcobertura ? this.propertycobertura = 'cobertura' : this.propertycobertura = '';
      if (this.typePropertyAllTitle.includes('Tipo do imóvel') || this.typePropertyAllTitle.includes('Todos os Imóveis Residenciais')) {
        this.typePropertyAllTitle = '';
        this.typePropertyAllTitle.replace('Cobertura, ', '')
      }
      if (this.typePropertyAllTitle.includes('Cobertura, ')) {
        this.typePropertyAllTitle = this.typePropertyAllTitle.replace('Cobertura, ', '');
      } else {
        this.typePropertyAllTitle += 'Cobertura, ' + ' ';
      }
    }
    if (value === 'chacara') {
      if (this.checkedAllResidencial2) {
        this.checkedapartamento = false;
        this.checkedstudio = false;
        this.checkedkitnet = false;
        this.checkedcasa = false;
        this.checkedcobertura = false;
        this.checkedcasacondominio = false;
        this.checkedcasadevila = false;
        this.checkedloft = false;
        this.checkedflat = false;
        this.checkedterreno = false;
        this.checkedchacara = false;
      }
      this.checkedAllResidencial2 = false;
      this.checkedAllResidencial = false;
      this.checkedchacara = !this.checkedchacara;
      this.checkedchacara ? this.propertychacara = 'chacara' : this.propertychacara = '';
      if (this.typePropertyAllTitle.includes('Tipo do imóvel') || this.typePropertyAllTitle.includes('Todos os Imóveis Residenciais')) {
        this.typePropertyAllTitle = '';
        this.typePropertyAllTitle.replace('Chacara, ', '')
      }
      if (this.typePropertyAllTitle.includes('Chacara, ')) {
        this.typePropertyAllTitle = this.typePropertyAllTitle.replace('Chacara, ', '');
      } else {
        this.typePropertyAllTitle += 'Chacara, ' + ' ';
      }
    }
    if (value === 'todosresidencial') {
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
      if (this.typePropertyAllTitle) {
        this.typePropertyAllTitle = '';
        this.typePropertyAllTitle.replace('Todos os Imóveis Residenciais', '')
      }
      if (this.typePropertyAllTitle.includes(value)) {
        this.typePropertyAllTitle = this.typePropertyAllTitle.replace('Todos os Imóveis Residenciais', 'Tipo do imóvel');
      } else {
        this.typePropertyAllTitle += 'Todos os Imóveis Residenciais';
      }
    }
    if (value === 'todosresidencial2') {
      this.AllResidencial = true;
      this.AllResidencial2 = false;
      this.checkedAllResidencial = false;
      this.checkedAllResidencial2 = false;


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
      if (this.typePropertyAllTitle) {
        this.typePropertyAllTitle = '';
        this.typePropertyAllTitle.replace('Tipo do imóvel', '')
      }
      if (this.typePropertyAllTitle.includes(value)) {
        this.typePropertyAllTitle = this.typePropertyAllTitle.replace('Tipo do imóvel', 'Todos os Imóveis Residenciais');
      } else {
        this.typePropertyAllTitle += 'Tipo do imóvel';
      }
    }

    // Comercial
    if (value === 'loja') {
      if (this.checkedAllComercial2) {
        this.checkedloja = false;
        this.checkedsalao = false;
        this.checkedgalpao = false;
        this.checkedconjuntocomercial = false;
        this.checkedcasacomercial = false;
        this.checkedhotel = false;
        this.checkedmotel = false;
        this.checkedpousada = false;
        this.checkedlajecorporativa = false;
        this.checkedprediointeiro = false;
      }
      this.checkedAllComercial2 = false;
      this.checkedAllComercial = false;
      this.checkedloja = !this.checkedloja;
      this.checkedloja ? this.propertyloja = 'loja' : this.propertyloja = '';
      if (this.typePropertyAllTitle.includes('Tipo do imóvel') || this.typePropertyAllTitle.includes('Todos os Imóveis Comerciais')) {
        this.typePropertyAllTitle = '';
        this.typePropertyAllTitle.replace('Loja, ', '')
      }
      if (this.typePropertyAllTitle.includes('Loja, ')) {
        this.typePropertyAllTitle = this.typePropertyAllTitle.replace('Loja, ', '');
      } else {
        this.typePropertyAllTitle += 'Loja, ' + ' ';
      }
      console.log(this.propertyloja, this.checkedloja);
    }
    if (value === 'salao') {
      if (this.checkedAllComercial2) {
        this.checkedloja = false;
        this.checkedgalpao = false;
        this.checkedconjuntocomercial = false;
        this.checkedcasacomercial = false;
        this.checkedhotel = false;
        this.checkedmotel = false;
        this.checkedpousada = false;
        this.checkedlajecorporativa = false;
        this.checkedprediointeiro = false;
      }
      this.checkedAllComercial2 = false;
      this.checkedAllComercial = false;
      this.checkedsalao = !this.checkedsalao;
      this.checkedsalao ? this.propertysalao = 'salao' : this.propertysalao = '';
      if (this.typePropertyAllTitle.includes('Tipo do imóvel') || this.typePropertyAllTitle.includes('Todos os Imóveis Comerciais')) {
        this.typePropertyAllTitle = '';
        this.typePropertyAllTitle.replace('Salâo, ', '')
      }
      if (this.typePropertyAllTitle.includes('Salâo, ')) {
        this.typePropertyAllTitle = this.typePropertyAllTitle.replace('Salâo, ', '');
      } else {
        this.typePropertyAllTitle += 'Salâo, ' + ' ';
      } 
      console.log(this.propertysalao, this.checkedsalao)

    }
    if (value === 'galpao') {
      if (this.checkedAllComercial2) {
        this.checkedloja = false;
        this.checkedsalao = false;
        this.checkedgalpao = false;
        this.checkedconjuntocomercial = false;
        this.checkedcasacomercial = false;
        this.checkedhotel = false;
        this.checkedmotel = false;
        this.checkedpousada = false;
        this.checkedlajecorporativa = false;
        this.checkedprediointeiro = false;
      }
      this.checkedAllComercial2 = false;
      this.checkedAllComercial = false;
      this.checkedgalpao = !this.checkedgalpao;
      this.checkedgalpao ? this.propertygalpao = 'galpao' : this.propertygalpao = '';
      if (this.typePropertyAllTitle.includes('Tipo do imóvel') || this.typePropertyAllTitle.includes('Todos os Imóveis Comerciais')) {
        this.typePropertyAllTitle = '';
        this.typePropertyAllTitle.replace('Galpão, ', '')
      }
      if (this.typePropertyAllTitle.includes('Galpão, ')) {
        this.typePropertyAllTitle = this.typePropertyAllTitle.replace('Galpão, ', '');
      } else {
        this.typePropertyAllTitle += 'Galpão, ' + ' ';
      } console.log(this.propertygalpao, this.checkedgalpao);
    }
    if (value === 'conjuntocomercial') {
      if (this.checkedAllComercial2) {
        this.checkedloja = false;
        this.checkedsalao = false;
        this.checkedgalpao = false;
        this.checkedconjuntocomercial = false;
        this.checkedcasacomercial = false;
        this.checkedhotel = false;
        this.checkedmotel = false;
        this.checkedpousada = false;
        this.checkedlajecorporativa = false;
        this.checkedprediointeiro = false;
      }
      this.checkedAllComercial2 = false;
      this.checkedAllComercial = false;
      this.checkedconjuntocomercial = !this.checkedconjuntocomercial;
      this.checkedconjuntocomercial ? this.propertyconjuntocomercial = 'conjuntocomercial' : this.propertyconjuntocomercial = '';
      if (this.typePropertyAllTitle.includes('Tipo do imóvel') || this.typePropertyAllTitle.includes('Todos os Imóveis Comerciais')) {
        this.typePropertyAllTitle = '';
        this.typePropertyAllTitle.replace('Conjunto Comercial, ', '')
      }
      if (this.typePropertyAllTitle.includes('Conjunto Comercial, ')) {
        this.typePropertyAllTitle = this.typePropertyAllTitle.replace('Conjunto Comercial, ', '');
      } else {
        this.typePropertyAllTitle += 'Conjunto Comercial, ' + ' ';
      } console.log(this.propertyconjuntocomercial, this.checkedconjuntocomercial);
    }
    if (value === 'casacomercial') {
      if (this.checkedAllComercial2) {
        this.checkedloja = false;
        this.checkedsalao = false;
        this.checkedgalpao = false;
        this.checkedconjuntocomercial = false;
        this.checkedcasacomercial = false;
        this.checkedhotel = false;
        this.checkedmotel = false;
        this.checkedpousada = false;
        this.checkedlajecorporativa = false;
        this.checkedprediointeiro = false;
      }
      this.checkedAllComercial2 = false;
      this.checkedAllComercial = false;
      this.checkedcasacomercial = !this.checkedcasacomercial;
      this.checkedcasacomercial ? this.propertycasacomercial = 'casacomercial' : this.propertycasacomercial = '';
      if (this.typePropertyAllTitle.includes('Tipo do imóvel') || this.typePropertyAllTitle.includes('Todos os Imóveis Comerciais')) {
        this.typePropertyAllTitle = '';
        this.typePropertyAllTitle.replace('Casa Comercial, ', '')
      }
      if (this.typePropertyAllTitle.includes('Casa Comercial, ')) {
        this.typePropertyAllTitle = this.typePropertyAllTitle.replace('Casa Comercial, ', '');
      } else {
        this.typePropertyAllTitle += 'Casa Comercial, ' + ' ';
      } console.log(this.propertycasacomercial, this.checkedcasacomercial);
    }
    if (value === 'hotel') {
      if (this.checkedAllComercial2) {
        this.checkedloja = false;
        this.checkedsalao = false;
        this.checkedgalpao = false;
        this.checkedconjuntocomercial = false;
        this.checkedcasacomercial = false;
        this.checkedhotel = false;
        this.checkedmotel = false;
        this.checkedpousada = false;
        this.checkedlajecorporativa = false;
        this.checkedprediointeiro = false;
      }
      this.checkedAllComercial2 = false;
      this.checkedAllComercial = false;
      this.checkedhotel = !this.checkedhotel;
      this.checkedhotel ? this.propertyhotel = 'hotel' : this.propertyhotel = '';
      if (this.typePropertyAllTitle.includes('Tipo do imóvel') || this.typePropertyAllTitle.includes('Todos os Imóveis Comerciais')) {
        this.typePropertyAllTitle = '';
        this.typePropertyAllTitle.replace('Hotel, ', '')
      }
      if (this.typePropertyAllTitle.includes('Hotel, ')) {
        this.typePropertyAllTitle = this.typePropertyAllTitle.replace('Hotel, ', '');
      } else {
        this.typePropertyAllTitle += 'Hotel, ' + ' ';
      } console.log(this.propertyhotel, this.checkedhotel);
    }
    if (value === 'motel') {
      if (this.checkedAllComercial2) {
        this.checkedloja = false;
        this.checkedsalao = false;
        this.checkedgalpao = false;
        this.checkedconjuntocomercial = false;
        this.checkedcasacomercial = false;
        this.checkedhotel = false;
        this.checkedmotel = false;
        this.checkedpousada = false;
        this.checkedlajecorporativa = false;
        this.checkedprediointeiro = false;
      }
      this.checkedAllComercial2 = false;
      this.checkedAllComercial = false;
      this.checkedmotel = !this.checkedmotel;
      this.checkedmotel ? this.propertymotel = 'motel' : this.propertymotel = '';
      if (this.typePropertyAllTitle.includes('Tipo do imóvel') || this.typePropertyAllTitle.includes('Todos os Imóveis Comerciais')) {
        this.typePropertyAllTitle = '';
        this.typePropertyAllTitle.replace('Motel, ', '')
      }
      if (this.typePropertyAllTitle.includes('Motel, ')) {
        this.typePropertyAllTitle = this.typePropertyAllTitle.replace('Motel, ', '');
      } else {
        this.typePropertyAllTitle += 'Motel, ' + ' ';
      } console.log(this.propertymotel, this.checkedmotel);
    }
    if (value === 'pousada') {
      if (this.checkedAllComercial2) {
        this.checkedloja = false;
        this.checkedsalao = false;
        this.checkedgalpao = false;
        this.checkedconjuntocomercial = false;
        this.checkedcasacomercial = false;
        this.checkedhotel = false;
        this.checkedmotel = false;
        this.checkedpousada = false;
        this.checkedlajecorporativa = false;
        this.checkedprediointeiro = false;
      }
      this.checkedAllComercial2 = false;
      this.checkedAllComercial = false;
      this.checkedpousada = !this.checkedpousada;
      this.checkedpousada ? this.propertypousada = 'pousada' : this.propertypousada = '';
      if (this.typePropertyAllTitle.includes('Tipo do imóvel') || this.typePropertyAllTitle.includes('Todos os Imóveis Comerciais')) {
        this.typePropertyAllTitle = '';
        this.typePropertyAllTitle.replace('Pousada, ', '')
      }
      if (this.typePropertyAllTitle.includes('Pousada, ')) {
        this.typePropertyAllTitle = this.typePropertyAllTitle.replace('Pousada, ', '');
      } else {
        this.typePropertyAllTitle += 'Pousada, ' + ' ';
      } console.log(this.propertypousada, this.checkedpousada);
    }
    if (value === 'lajecorporativa') {
      if (this.checkedAllComercial2) {
        this.checkedloja = false;
        this.checkedsalao = false;
        this.checkedgalpao = false;
        this.checkedconjuntocomercial = false;
        this.checkedcasacomercial = false;
        this.checkedhotel = false;
        this.checkedmotel = false;
        this.checkedpousada = false;
        this.checkedlajecorporativa = false;
        this.checkedprediointeiro = false;
      }
      this.checkedAllComercial2 = false;
      this.checkedAllComercial = false;
      this.checkedlajecorporativa = !this.checkedlajecorporativa;
      this.checkedlajecorporativa ? this.propertylajecorporativa = 'lajecorporativa' : this.propertylajecorporativa = '';
      if (this.typePropertyAllTitle.includes('Tipo do imóvel') || this.typePropertyAllTitle.includes('Todos os Imóveis Comerciais')) {
        this.typePropertyAllTitle = '';
        this.typePropertyAllTitle.replace('Laje Corporativa, ', '')
      }
      if (this.typePropertyAllTitle.includes('Laje Corporativa, ')) {
        this.typePropertyAllTitle = this.typePropertyAllTitle.replace('Laje Corporativa, ', '');
      } else {
        this.typePropertyAllTitle += 'Laje Corporativa, ' + ' ';
      } console.log(this.propertylajecorporativa, this.checkedlajecorporativa);
    }
    if (value === 'prediointeiro') {
      if (this.checkedAllComercial2) {
        this.checkedloja = false;
        this.checkedsalao = false;
        this.checkedgalpao = false;
        this.checkedconjuntocomercial = false;
        this.checkedcasacomercial = false;
        this.checkedhotel = false;
        this.checkedmotel = false;
        this.checkedpousada = false;
        this.checkedlajecorporativa = false;
        this.checkedprediointeiro = false;
      }
      this.checkedAllComercial2 = false;
      this.checkedAllComercial = false;
      this.checkedprediointeiro = !this.checkedprediointeiro;
      this.checkedprediointeiro ? this.propertyprediointeiro = 'prediointeiro' : this.propertyprediointeiro = '';
      if (this.typePropertyAllTitle.includes('Tipo do imóvel') || this.typePropertyAllTitle.includes('Todos os Imóveis Comerciais')) {
        this.typePropertyAllTitle = '';
        this.typePropertyAllTitle.replace('Prédio Inteiro, ', '')
      }
      if (this.typePropertyAllTitle.includes('Prédio Inteiro, ')) {
        this.typePropertyAllTitle = this.typePropertyAllTitle.replace('Prédio Inteiro, ', '');
      } else {
        this.typePropertyAllTitle += 'Prédio Inteiro, ' + ' ';
      } console.log(this.propertyprediointeiro, this.checkedprediointeiro);
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
      if (this.typePropertyAllTitle) {
        this.typePropertyAllTitle = '';
        this.typePropertyAllTitle.replace('Todos os Imóveis Comerciais', '')
      }
      if (this.typePropertyAllTitle.includes(value)) {
        this.typePropertyAllTitle = this.typePropertyAllTitle.replace('Todos os Imóveis Comerciais', 'Tipo do imóvel');
      } else {
        this.typePropertyAllTitle += 'Todos os Imóveis Comerciais';
      }
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
      if (this.typePropertyAllTitle) {
        this.typePropertyAllTitle = '';
        this.typePropertyAllTitle.replace('Tipo do imóvel', '')
      }
      if (this.typePropertyAllTitle.includes(value)) {
        this.typePropertyAllTitle = this.typePropertyAllTitle.replace('Tipo do imóvel', 'Todos os Imóveis Comerciais');
      } else {
        this.typePropertyAllTitle += 'Tipo do imóvel';
      }
    }
    if (this.typePropertyAllTitle === ' ' || this.typePropertyAllTitle === '  ' || this.typePropertyAllTitle === '   ' || this.typePropertyAllTitle === '     ' || this.typePropertyAllTitle === '      ' || this.typePropertyAllTitle === '       ' || this.typePropertyAllTitle === '        ' || this.typePropertyAllTitle === '         ' || this.typePropertyAllTitle === '          ' || this.typePropertyAllTitle === '           ')
      this.typePropertyAllTitle = 'Tipo do imóvel';
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
    console.log(filter);


    // ---------------------------
    // let announcementTypeAdGroup: AnnouncementGetResponseDto[] = [];
    // if (filter.typeAd !== '') {
    //   for (let i = 0; i < this.response.length; i++) {
    //     if (this.response[i].typeOfAd === filter.typeAd) {
    //       announcementTypeAdGroup.push(this.response[i]);
    //     }
    //   }
    // }
    // else {
    //   announcementTypeAdGroup = this.response;
    // }
    // // ---------------------------

    // let announcementStateGroup: AnnouncementGetResponseDto[] = [];
    // if (filter.state !== '') {
    //   for (let i = 0; i < announcementTypeAdGroup.length; i++) {
    //     if (announcementTypeAdGroup[i].ufAddress === filter.state) {
    //       announcementStateGroup.push(announcementTypeAdGroup[i]);
    //     }
    //   }
    // } else {
    //   announcementStateGroup = announcementTypeAdGroup;
    // }
    // // ---------------------------

    // let announcementCityGroup: AnnouncementGetResponseDto[] = [];
    // if (filter.city !== undefined) {
    //   for (let i = 0; i < announcementStateGroup.length; i++) {
    //     if (announcementStateGroup[i].cityAddress === filter.city) {
    //       announcementCityGroup.push(announcementStateGroup[i]);
    //     }
    //   }
    // } else {
    //   announcementCityGroup = announcementStateGroup;
    // }
    // // ---------------------------

    // let announcementGoalGroup: AnnouncementGetResponseDto[] = [];
    // if (filter.goal !== undefined) {
    //   for (let i = 0; i < announcementCityGroup.length; i++) {
    //     if (announcementCityGroup[i].goal === filter.goal) {
    //       announcementGoalGroup.push(announcementCityGroup[i]);
    //     }
    //   }
    // } else {
    //   announcementGoalGroup = announcementCityGroup
    // }
    // // ---------------------------



    // let announcementTypeofPropertyGroup: AnnouncementGetResponseDto[] = [];
    // if (
    //   // residencial
    //   filter.propertyapartamento !== undefined ||
    //   filter.propertystudio !== undefined ||
    //   filter.propertykitnet !== undefined ||
    //   filter.propertycasa !== undefined ||
    //   filter.propertycasacondominio !== undefined ||
    //   filter.propertycasadevila !== undefined ||
    //   filter.propertycobertura !== undefined ||
    //   filter.propertyloft !== undefined ||
    //   filter.propertyflat !== undefined ||
    //   filter.propertyterreno !== undefined ||
    //   filter.propertychacara !== undefined ||
    //   // comercial
    //   filter.propertyloja !== undefined ||
    //   filter.propertysalao !== undefined ||
    //   filter.propertysala !== undefined ||
    //   filter.propertygalpao !== undefined ||
    //   filter.propertyconjuntocomercial !== undefined ||
    //   filter.propertycasacomercial !== undefined ||
    //   filter.propertypousada !== undefined ||
    //   filter.propertyhotel !== undefined ||
    //   filter.propertymotel !== undefined ||
    //   filter.propertylajecorporativa !== undefined ||
    //   filter.propertyprediointeiro !== undefined
    // ) {
    //   for (let i = 0; i < announcementGoalGroup.length; i++) {
    //     if (
    //       // residencial
    //       announcementGoalGroup[i].propertyType === filter.propertyapartamento ||
    //       announcementGoalGroup[i].propertyType === filter.propertystudio ||
    //       announcementGoalGroup[i].propertyType === filter.propertykitnet ||
    //       announcementGoalGroup[i].propertyType === filter.propertycasa ||
    //       announcementGoalGroup[i].propertyType === filter.propertycasacondominio ||
    //       announcementGoalGroup[i].propertyType === filter.propertycasadevila ||
    //       announcementGoalGroup[i].propertyType === filter.propertycobertura ||
    //       announcementGoalGroup[i].propertyType === filter.propertyloft ||
    //       announcementGoalGroup[i].propertyType === filter.propertyflat ||
    //       announcementGoalGroup[i].propertyType === filter.propertyterreno ||
    //       announcementGoalGroup[i].propertyType === filter.propertychacara ||
    //       // comercial
    //       announcementGoalGroup[i].propertyType === filter.propertyloja ||
    //       announcementGoalGroup[i].propertyType === filter.propertysalao ||
    //       announcementGoalGroup[i].propertyType === filter.propertysala ||
    //       announcementGoalGroup[i].propertyType === filter.propertygalpao ||
    //       announcementGoalGroup[i].propertyType === filter.propertyconjuntocomercial ||
    //       announcementGoalGroup[i].propertyType === filter.propertycasacomercial ||
    //       announcementGoalGroup[i].propertyType === filter.propertypousada ||
    //       announcementGoalGroup[i].propertyType === filter.propertyhotel ||
    //       announcementGoalGroup[i].propertyType === filter.propertymotel ||
    //       announcementGoalGroup[i].propertyType === filter.propertylajecorporativa ||
    //       announcementGoalGroup[i].propertyType === filter.propertyprediointeiro
    //     ) {
    //       announcementTypeofPropertyGroup.push(announcementGoalGroup[i]);
    //     }
    //   }
    // } else {
    //   announcementTypeofPropertyGroup = announcementGoalGroup
    // }
    // // ---------------------------

    // let announcementStylePropertyGroup: AnnouncementGetResponseDto[] = [];
    // if (filter.styleProperty !== undefined) {
    //   for (let i = 0; i < announcementTypeofPropertyGroup.length; i++) {
    //     if (announcementTypeofPropertyGroup[i].propertyCharacteristics === filter.styleProperty) {
    //       announcementStylePropertyGroup.push(announcementTypeofPropertyGroup[i]);
    //     }
    //   }
    // } else {
    //   announcementStylePropertyGroup = announcementTypeofPropertyGroup
    // }
    // // ---------------------------

    // let announcementBadRoomsGroup: AnnouncementGetResponseDto[] = [];
    // if (filter.badRoomsQnt !== '') {
    //   for (let i = 0; i < announcementStylePropertyGroup.length; i++) {
    //     if (announcementStylePropertyGroup[i].bedrooms >= filter.badRoomsQnt) {
    //       announcementBadRoomsGroup.push(announcementStylePropertyGroup[i]);
    //     }
    //   }
    // } else {
    //   announcementBadRoomsGroup = announcementStylePropertyGroup
    // }
    // // ---------------------------

    // let announcementValueUntilSaleGroup: AnnouncementGetResponseDto[] = [];
    // if (filter.untilValueSale !== '') {
    //   for (let i = 0; i < announcementBadRoomsGroup.length; i++) {
    //     if (announcementBadRoomsGroup[i].saleValue >= filter.untilValueSale) {
    //       announcementValueUntilSaleGroup.push(announcementBadRoomsGroup[i]);
    //     }
    //   }
    // } else {
    //   announcementValueUntilSaleGroup = announcementBadRoomsGroup
    // }
    // // ---------------------------

    // let announcementValueUntilRentGroup: AnnouncementGetResponseDto[] = [];
    // if (filter.untilValueRent !== '') {
    //   for (let i = 0; i < announcementValueUntilSaleGroup.length; i++) {
    //     if (announcementValueUntilSaleGroup[i].leaseValue >= filter.untilValueRent) {
    //       announcementValueUntilRentGroup.push(announcementValueUntilSaleGroup[i]);
    //     }
    //   }
    // } else {
    //   announcementValueUntilRentGroup = announcementValueUntilSaleGroup
    // }



    // this.resultType = announcementValueUntilRentGroup;


    // localStorage.setItem('filtro', JSON.stringify(filter))
    // localStorage.setItem('resultSearch', JSON.stringify(this.resultType));
    // this.router.navigate(['/search']);
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
        }
      }
    }
  }
}