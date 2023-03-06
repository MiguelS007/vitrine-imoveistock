import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalLoginComponent } from 'src/app/auth/modal-login/modal-login.component';
import { AnnouncementGetResponseDto } from 'src/app/dtos/announcement-get-response.dto';
import { UserGetResponseDto } from 'src/app/dtos/user-get-response.dtos';
import { AnnouncementService } from 'src/app/service/announcement.service';
import estados from '../../../assets/json/estados-cidades.json';
import { Loader } from "@googlemaps/js-api-loader";
import { environment } from '../../../environments/environment';
import { GoogleMap } from '@angular/google-maps';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { GeocodeService } from '../../service/geocode.service';
import { AnnouncementFilterListResponseDto } from '../../dtos/announcement-filter-list-response.dto';

@Component({
  selector: 'app-search-map',
  templateUrl: './search-map.component.html',
  styleUrls: ['./search-map.component.scss']
})
export class SearchMapComponent implements OnInit {

  loaderApi: Loader = new Loader({
    apiKey: environment.google.apiKey,
  });

  @ViewChild(GoogleMap) public map: GoogleMap | undefined;

  geolib: any;
  geocoder: google.maps.Geocoder = new google.maps.Geocoder();

  center: google.maps.LatLngLiteral | undefined;
  zoom: number = 15;

  selectedCity: string | undefined;
  selectedNeighborhood: string | undefined;

  mapOptions: google.maps.MapOptions = {
    disableDoubleClickZoom: true,
    fullscreenControl: false,
    keyboardShortcuts: false,
    streetViewControl: false,
    maxZoom: 15,
    minZoom: 1,
  };

  markers: google.maps.Marker[] | undefined;

  list: AnnouncementGetResponseDto[] = [];
  filteredList: AnnouncementGetResponseDto[] = [];
  selectedAnouncements: AnnouncementGetResponseDto[] = [];

  pagination: number = 1;

  orderBy: string = 'Selecione'

  filtroResultDisplay: AnnouncementFilterListResponseDto;

  constructor(
    private formBuilder: FormBuilder,
    private ngxSpinnerService: NgxSpinnerService,
    private announcementService: AnnouncementService,
    private router: Router,
    private modalService: NgbModal,
    private _geocodeService: GeocodeService,
  ) {

    this.geolib = require('geolib');
  }

  ngOnInit(): void {

    this.ngxSpinnerService.show();

    this.list = JSON.parse(localStorage.getItem('resultSearch'));
    this.filteredList = this.list;

    this.filtroResultDisplay = JSON.parse(localStorage.getItem('filtro'));

    this._updateMarkers();

    this.center = {
      lat: environment.google.map.center.lat,
      lng: environment.google.map.center.lng,
    };

    this.mapOptions.center = this.center;

    this.ngxSpinnerService.hide();
  }

  onChangeSearch(search: string) {
  }


  announcementSelected(_id: string) {

    this.router.navigate([`announcement/detail/${_id}`])
  }

  likeHeart(value, condition) {

    // let request = {
    //   announcementId: value
    // }

    // if (localStorage.getItem('user') === null) {
    //   this.modalService.open(ModalLoginComponent, { centered: true });
    //   return
    // }

    // if (this.listLikes.length === 0) {
    //   this.announcementService.registerLike(request).subscribe(
    //     success => {
    //       this.ngOnInit()
    //       return
    //     },
    //     error => {
    //       console.log(error)
    //     }
    //   )
    // } else {
    //   if (condition === true) {
    //     this.announcementService.registerUnlike(request).subscribe(
    //       success => {
    //         this.ngOnInit()
    //       },
    //       error => {
    //         console.log(error)
    //       }
    //     )
    //   } else if (condition === undefined) {
    //     this.announcementService.registerLike(request).subscribe(
    //       success => {
    //         this.ngOnInit()
    //       },
    //       error => {
    //         console.log(error)
    //       }
    //     )
    //   }
    // }
  }

  changeOderBy(value) {
    this.orderBy = value
  }

  // searchByTypeAd(item) {
  //   if (item === 'sale') {
  //     this.selectTypeAd = 'Comprar'
  //   } else if (item === 'rent') {
  //     this.selectTypeAd = 'Alugar'
  //   }
  // }

  // filterTypeProperty(value) {
  //   this.TypeProperty = value
  // }


  // searchByBadRoom(item) {
  //   // SELECT BADROOMS
  //   if (item === '1') {
  //     this.selectBadRooms = '+1 Quarto'
  //   } else if (item === '2') {
  //     this.selectBadRooms = '+2  Quartos'
  //   } else if (item === '3') {
  //     this.selectBadRooms = '+3  Quartos'
  //   } else if (item === '4') {
  //     this.selectBadRooms = '+4  Quartos'
  //   } else if (item === '5') {
  //     this.selectBadRooms = '+5  Quartos'
  //   }
  // }
  // searchByBathRoom(item) {
  //   // SELECT BATHROOMS
  //   if (item === '1') {
  //     this.selectBathrooms = '+1  Banheiro'
  //   } else if (item === '2') {
  //     this.selectBathrooms = '+2  Banheiros'
  //   } else if (item === '3') {
  //     this.selectBathrooms = '+3  Banheiros'
  //   } else if (item === '4') {
  //     this.selectBathrooms = '+4  Banheiros'
  //   } else if (item === '5') {
  //     this.selectBathrooms = '+5  Banheiros'
  //   }
  // }
  // searchByVacancies(item) {
  //   // SELECT VACANCES
  //   if (item === '0') {
  //     this.selectVacancies = 'Tanto faz'
  //   } else if (item === '1') {
  //     this.selectVacancies = '+1  Vagas'
  //   } else if (item === '2') {
  //     this.selectVacancies = '+2  Vagas'
  //   } else if (item === '3') {
  //     this.selectVacancies = '+3  Vagas'
  //   } else if (item === '4') {
  //     this.selectVacancies = '+4  Vagas'
  //   } else if (item === '5') {
  //     this.selectVacancies = '+5  Vagas'
  //   }
  // }

  // filtrar() {

  //   this.ngxSpinnerService.show();

  //   if (this.stateSelected === 'Escolha o Estado')
  //     this.form.controls['typePropertyState'].setValue('');

  //   if (this.stateSelected === 'Acre')
  //     this.form.controls['typePropertyState'].setValue('AC')
  //   else if (this.stateSelected === 'Alagoas')
  //     this.form.controls['typePropertyState'].setValue('AL')
  //   else if (this.stateSelected === 'Amapá') { this.form.controls['typePropertyState'].setValue('AP') }
  //   else if (this.stateSelected === 'Amazonas') { this.form.controls['typePropertyState'].setValue('AM') }
  //   else if (this.stateSelected === 'Bahia') { this.form.controls['typePropertyState'].setValue('BA') }
  //   else if (this.stateSelected === 'Ceara') { this.form.controls['typePropertyState'].setValue('CE') }
  //   else if (this.stateSelected === 'Distrito Federal') { this.form.controls['typePropertyState'].setValue('DF') }
  //   else if (this.stateSelected === 'Espírito Santo') { this.form.controls['typePropertyState'].setValue('ES') }
  //   else if (this.stateSelected === 'Goiás') { this.form.controls['typePropertyState'].setValue('GO') }
  //   else if (this.stateSelected === 'Maranhão') { this.form.controls['typePropertyState'].setValue('MA') }
  //   else if (this.stateSelected === 'Mato Grosso') { this.form.controls['typePropertyState'].setValue('MT') }
  //   else if (this.stateSelected === 'Mato Grosso do Sul') { this.form.controls['typePropertyState'].setValue('MS') }
  //   else if (this.stateSelected === 'Minas Gerais') { this.form.controls['typePropertyState'].setValue('MG') }
  //   else if (this.stateSelected === 'Pará') { this.form.controls['typePropertyState'].setValue('PA') }
  //   else if (this.stateSelected === 'Paraíba') { this.form.controls['typePropertyState'].setValue('PB') }
  //   else if (this.stateSelected === 'Paraná') { this.form.controls['typePropertyState'].setValue('PR') }
  //   else if (this.stateSelected === 'Pernambuco') { this.form.controls['typePropertyState'].setValue('PE') }
  //   else if (this.stateSelected === 'Piauí') { this.form.controls['typePropertyState'].setValue('PI') }
  //   else if (this.stateSelected === 'Rio de Janeiro') { this.form.controls['typePropertyState'].setValue('RJ') }
  //   else if (this.stateSelected === 'Rio Grande do Norte') { this.form.controls['typePropertyState'].setValue('RN') }
  //   else if (this.stateSelected === 'Rio Grande do Sul') { this.form.controls['typePropertyState'].setValue('RS') }
  //   else if (this.stateSelected === 'Rondônia') { this.form.controls['typePropertyState'].setValue('RO') }
  //   else if (this.stateSelected === 'Roraima') { this.form.controls['typePropertyState'].setValue('RR') }
  //   else if (this.stateSelected === 'Santa Catarina') { this.form.controls['typePropertyState'].setValue('SC') }
  //   else if (this.stateSelected === 'São Paulo') { this.form.controls['typePropertyState'].setValue('SP') }
  //   else if (this.stateSelected === 'Sergipe') { this.form.controls['typePropertyState'].setValue('SE') }
  //   else if (this.stateSelected === 'Tocantins') { this.form.controls['typePropertyState'].setValue('TO') }

  //   let filter: any = {
  //     state: this.form.controls['typePropertyState'].value,
  //     city: this.getSelectedCity,
  //     goal: this.TypeProperty, //residencial , comercial
  //     styleProperty: this.removerAcento(this.stylePropertyTitle), // EDIFICIL, TERRENO
  //   };

  //   //TO DO
  //   this.announcementService.listAnnouncement().subscribe(
  //     success => {
  //       this.list = success;
  //       // console.log(this.listAllForFilter)
  //       // if (localStorage.getItem('user') !== null) {
  //       //   this.announcementService.listLikes().subscribe(
  //       //     success => {
  //       //       for (let i = 0; i < success.length; i++) {
  //       //         for (let x = 0; x < this.listAllForFilter.length; x++) {
  //       //           if (success[i].announcement._id === this.listAllForFilter[x]._id) {
  //       //             Object.assign(this.listAllForFilter[x], { liked: true });
  //       //           }
  //       //         }
  //       //         this.listLikesForFilter.push(success[i].announcement)
  //       //       }
  //       //     }
  //       //   )
  //       // }

  //       // // 1° filtro
  //       // let filter1: AnnouncementGetResponseDto[] = [];
  //       // if (this.stylePropertyTitle !== 'O que está buscando') {
  //       //   console.log('filtro um é', this.stylePropertyTitle)
  //       //   filter1 = this.listAllForFilter.filter(elemento => elemento.propertyCharacteristics === filter?.styleProperty)
  //       // } else {
  //       //   filter1 = this.listAllForFilter;
  //       // }

  //       // // 2° filtro
  //       // let filter2: AnnouncementGetResponseDto[] = [];
  //       // if (this.selectTypeAd !== 'Selecione') {
  //       //   if (filter1.length !== 0) {
  //       //     let type = ''
  //       //     if (this.selectTypeAd === 'Comprar') {
  //       //       type = 'sale'
  //       //     } else if (this.selectTypeAd === 'Alugar') {
  //       //       type = 'rent'
  //       //     }
  //       //     filter2 = filter1.filter(elemento => elemento.typeOfAd === type)
  //       //   }
  //       // } else {
  //       //   filter2 = filter1
  //       // }

  //       // // 2° filtro
  //       // let filter3: AnnouncementGetResponseDto[] = [];
  //       // if (this.citySelected !== 'Selecione uma ciadade') {
  //       //   filter3 = filter2.filter(elemento => elemento.cityAddress === filter?.city)
  //       //   console.log('cidade selecionada', filter?.city)
  //       //   if (filter3.length === 0) {
  //       //     console.log(filter?.city, 'filtro 3 zerado')
  //       //   }
  //       // } else {
  //       //   filter3 = filter2;
  //       // }
  //       // // 2° filtro
  //       // let filterestado: AnnouncementGetResponseDto[] = [];
  //       // if (this.stateSelected !== 'Escolha o Estado') {
  //       //   filterestado = filter3.filter(elemento => elemento.ufAddress === filter.state)
  //       //   console.log('estados selecionado', filter.state)
  //       //   if (filterestado.length === 0) {
  //       //     console.log(filter.state, 'filtro estado zerado')
  //       //   }
  //       // } else {
  //       //   filterestado = filter3;
  //       // }

  //       // // 3-4° filtro
  //       // let filter4: AnnouncementGetResponseDto[] = [];
  //       // if (this.TypeProperty !== 'Tipo do Imóvel') {

  //       //   filter4 = filterestado.filter(elemento => elemento.goal === filter.goal)
  //       //   if (filter4.length === 0) {
  //       //     console.log(filter4,)
  //       //     console.log('caiu no filtro 4, zerado')
  //       //   }
  //       // } else {
  //       //   filter4 = filterestado
  //       // }

  //       // // 4-5° filtro
  //       // let filter5: AnnouncementGetResponseDto[] = [];
  //       // let valueMin: number = 0;
  //       // let maxValue: number = 0;

  //       // if (this.form.controls['typeMinPrice'].value !== '') {
  //       //   valueMin = this.form.controls['typeMinPrice'].value;
  //       // }

  //       // if (this.form.controls['typeMaxPrice'].value !== '') {
  //       //   maxValue = this.form.controls['typeMaxPrice'].value;
  //       // }


  //       // if (valueMin !== 0 && maxValue !== 0) {
  //       //   if (this.selectTypeAd === 'Comprar') {
  //       //     filter5 = filter4.filter(elemento => parseInt(elemento.saleValue) <= maxValue && parseInt(elemento.saleValue) >= valueMin)
  //       //   } else if (this.selectTypeAd === 'Alugar') {
  //       //     filter5 = filter4.filter(elemento => parseInt(elemento.leaseValue) <= maxValue && parseInt(elemento.leaseValue) >= valueMin)
  //       //   }
  //       // } else {
  //       //   filter5 = filter4;
  //       // }

  //       // // 6° filtro

  //       // let filter6: AnnouncementGetResponseDto[] = [];

  //       // if (this.selectBadRooms !== 'Dormitórios') {
  //       //   let quartos = this.selectBadRooms.replace(/\D/gim, '')
  //       //   filter6 = filter5.filter(elemento => elemento.bedrooms >= parseInt(quartos))
  //       // } else {
  //       //   filter6 = filter5
  //       // }

  //       // // 7° filtro
  //       // let filter7: AnnouncementGetResponseDto[] = [];

  //       // if (this.selectBathrooms !== 'Banheiros') {
  //       //   let banheiros = this.selectBathrooms.replace(/\D/gim, '')
  //       //   filter7 = filter6.filter(elemento => elemento.bathrooms >= parseInt(banheiros))
  //       // } else {
  //       //   filter7 = filter6
  //       // }

  //       // // 8° filtro
  //       // let filter8: AnnouncementGetResponseDto[] = [];

  //       // if (this.selectVacancies !== 'Vagas' && this.selectVacancies !== 'Tanto faz') {
  //       //   let vagas = this.selectVacancies.replace(/\D/gim, '')
  //       //   filter8 = filter7.filter(elemento => elemento.parkingSpaces >= parseInt(vagas))
  //       // } else {
  //       //   filter8 = filter7
  //       // }


  //       // // 9° filtro
  //       // let filter9: AnnouncementGetResponseDto[] = [];

  //       // let constructionYear = this.form.controls['typeconstruction'].value
  //       // if (constructionYear !== 0 && constructionYear !== '') {
  //       //   filter9 = filter8.filter(elemento => parseInt(elemento.yearOfConstruction) >= constructionYear)
  //       // } else {
  //       //   filter9 = filter8
  //       // }

  //       // // 10° filtro
  //       // let filter10: AnnouncementGetResponseDto[] = [];


  //       // let areaMax: number = 0;
  //       // let minArea: number = 0;

  //       // if (this.form.controls['typefootagemin'].value !== '') {
  //       //   minArea = this.form.controls['typefootagemin'].value;
  //       // }

  //       // if (this.form.controls['typefootagemax'].value !== '') {
  //       //   areaMax = this.form.controls['typefootagemax'].value;
  //       // }



  //       // if (minArea !== 0 && areaMax !== 0) {
  //       //   filter10 = filter9.filter(elemento => parseInt(elemento.usefulArea) <= areaMax && parseInt(elemento.usefulArea) >= minArea)
  //       // } else {
  //       //   filter10 = filter9;
  //       // }

  //       // this.list = filter10;


  //       // if (this.list.length === 0) {
  //       //   this.messageNotSearch = true;
  //       //   this.list = this.listAllForFilter;
  //       // } else {
  //       //   this.messageNotSearch = false;
  //       // }
  //       // this.filtroResultDisplay = {
  //       //   typeOfAdd: ''
  //       // }
  //       // this.ngxSpinnerService.hide();
  //     },
  //   );

  // }

  // searchByStyleProperty(value) {
  //   this.stylePropertyTitle = value
  // }
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
  // getEstados(value) {
  //   let valor = value.target.value;
  //   this.listAllCity = [];
  //   for (let i = 0; i < estados.estados.length; i++) {
  //     if (valor === estados.estados[i].nome) {
  //       for (let x = 0; x < estados.estados[i].cidades.length; x++) {
  //         this.listAllCity.push({ name: estados.estados[i].cidades[x] })
  //         this.stateSelected = estados.estados[i].nome
  //       }
  //     }
  //   }
  // }
  sortPriceList(value: string) {
    if (value === 'minor>major')
      this.filteredList.sort((a, b) => a.saleValue < b.saleValue ? -1 : 0);
    else if (value === 'major>minor')
      this.filteredList.sort((a, b) => a.saleValue > b.saleValue ? -1 : 0);
  }

  private _updateMarkers() {

    this.markers = [];

    this.filteredList.map((anouncement) => {

      const marker = new google.maps.Marker({
        draggable: false,
        position: {
          lat: +(anouncement.latitude),
          lng: +(anouncement.longitude),
        },
      });

      marker.addListener('click', () => {
        this.announcementSelected(anouncement._id);
      });

      this.markers.push(marker);
    });

    if (this.markers && this.markers.length > 0) {
      new MarkerClusterer({
        map: this.map?.googleMap,
        markers: this.markers,
        onClusterClick: (cluster) => {
          this._clickCluster(cluster);
        }
      });
    }
  }

  _clickCluster(cluster: any) {

    if (this.map?.getZoom() === 15) {

      this.selectedAnouncements = [];

      this.center = {
        lat: cluster.latLng?.lat()!,
        lng: cluster.latLng?.lng()!,
      };

      this.filteredList.forEach((item) => {
        const distanceInKm = this._geocodeService.getDistanceInKm(
          { lat: this.center?.lat!, lng: this.center?.lng! },
          {
            lat: +(item.latitude),
            lng: +(item.longitude),
          }
        );

        if (distanceInKm <= 0.1)
          this.selectedAnouncements.push(item);

        this.filteredList = this.selectedAnouncements;

        this._updateMarkers();
      });

    } else {

      this.center = {
        lat: cluster.latLng?.lat()!,
        lng: cluster.latLng?.lng()!,
      };

      this.zoom++;
    }
  }

  moveMap() {

    const center = this.map?.getCenter();

    if (center) {

      this.center = {
        lat: center.lat(),
        lng: center.lng(),
      };
    }

  }

  changeZoom() {

  }
}
