import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AnnouncementGetResponseDto } from 'src/app/dtos/announcement-get-response.dto';
import { environment } from '../../../environments/environment';
import { GoogleMap } from '@angular/google-maps';
import { MarkerClusterer, SuperClusterAlgorithm } from '@googlemaps/markerclusterer';
import { GeocodeService } from '../../service/geocode.service';
import { AnnouncementFilterListResponseDto } from '../../dtos/announcement-filter-list-response.dto';
import { propertyTypesConst } from 'src/app/utils/propertyTypes';

@Component({
  selector: 'app-search-map',
  templateUrl: './search-map.component.html',
  styleUrls: ['./search-map.component.scss']
})
export class SearchMapComponent implements OnInit, AfterViewInit {

  @ViewChild(GoogleMap) public map: GoogleMap | undefined;

  geolib: any;
  geocoder: google.maps.Geocoder = new google.maps.Geocoder();

  center: google.maps.LatLngLiteral | undefined;
  zoom: number = 12;

  mapOptions: google.maps.MapOptions = {
    disableDoubleClickZoom: true,
    fullscreenControl: false,
    keyboardShortcuts: false,
    streetViewControl: false,
    maxZoom: 16,
    minZoom: 5,
  };

  markers: google.maps.Marker[] | undefined;

  cluster: MarkerClusterer;

  response: AnnouncementGetResponseDto[] = [];
  selectedAnouncements: AnnouncementGetResponseDto[] = [];

  pagination: number = 1;

  orderBy: string = 'Selecione'

  filtroResultDisplay: AnnouncementFilterListResponseDto;

  constructor(
    private ngxSpinnerService: NgxSpinnerService,
    private router: Router,
    private _geocodeService: GeocodeService,
    private changeDetectorRef: ChangeDetectorRef
  ) {

    this.geolib = require('geolib');
  }

  ngAfterViewInit(): void {
    this._updateMarkers();
  }

  ngOnInit(): void {

    this.ngxSpinnerService.show();

    this.response = JSON.parse(localStorage.getItem('resultSearch'));
    this.selectedAnouncements = this.response;

    this.filtroResultDisplay = JSON.parse(localStorage.getItem('filtro'));

    this.geocoder.geocode({ address: `${this.filtroResultDisplay.cityAddress}, ${this.filtroResultDisplay.ufAddress}` }, (results, status) => {

      if (status == google.maps.GeocoderStatus.OK) {
        var lat = results[0].geometry.location.lat();
        var lng = results[0].geometry.location.lng();

        this.center = {
          lat,
          lng,
        };
      } else {
        this.center = {
          lat: environment.google.map.center.lat,
          lng: environment.google.map.center.lng,
        };
      }
    });

    this.mapOptions.center = this.center;

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.ngxSpinnerService.hide();
  }

  onChangeSearch(search: string) {
  }


  selectAnnouncement(_id: string) {

    this.router.navigate([`announcement/detail`, _id]);
  }

  likeHeart(value, condition) {
  }

  changeOderBy(value) {
    this.orderBy = value
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
    if (value === 'minor>major')
      this.response.sort((a, b) => a.saleValue < b.saleValue ? -1 : 0);
    else if (value === 'major>minor')
      this.response.sort((a, b) => a.saleValue > b.saleValue ? -1 : 0);
  }

  private _updateMarkers() {

    this.markers = [];

    this.response.map((anouncement) => {

      const marker = new google.maps.Marker({
        draggable: false,
        position: {
          lat: +(anouncement.latitude),
          lng: +(anouncement.longitude),
        },
        icon: '../../../assets/icon/custom-marker.svg'
      });

      marker.set('_id', anouncement._id);

      marker.addListener('click', () => {
        this._filterAnnouncementLst([anouncement._id]);
      });

      this.markers?.push(marker);
    });

    if (this.markers && this.markers.length > 0) {
      this.cluster = new MarkerClusterer({
        map: this.map?.googleMap,
        markers: this.markers,
        algorithm: new SuperClusterAlgorithm({ radius: 100 }),
        onClusterClick: (cluster) => {
          this._clickCluster(cluster);
        },
      });
    }
  }

  _clickCluster(cluster: any) {

    const mapZoom = this.map.getZoom();

    const clusterLat: number = cluster.latLng.lat();
    const clusterLng: number = cluster.latLng.lng();

    const idList: string[] = [];

    this.markers.map((marker) => {

      const _id = marker.get('_id');
      const markerLat = marker.getPosition().lat();
      const markerLng = marker.getPosition().lng();

      const distance = this._geocodeService.getDistanceInKm(
        { lat: clusterLat, lng: clusterLng },
        { lat: markerLat, lng: markerLng }
      );

      if (distance <= 100)
        idList.push(_id);

      this.center = {
        lat: clusterLat,
        lng: clusterLng,
      };

      if (mapZoom <= 12) {
        this.zoom = mapZoom + 3;
        this.map.googleMap.setZoom(mapZoom + 3);
      }
      else if (mapZoom < 16) {
        this.zoom = mapZoom + 1;
        this.map.googleMap.setZoom(mapZoom + 1);
      }
    });

    this._filterAnnouncementLst(idList);
  }

  _filterAnnouncementLst(_ids?: string[]) {

    if (!_ids)
      this.selectedAnouncements = this.response;
    else {

      this.selectedAnouncements = [];

      this.response.map((an) => {
        if (_ids.includes(an._id))
          this.selectedAnouncements.push(an);
      });

      this.changeDetectorRef.detectChanges();
    }
  }

  moveMap() {


  }

  changeZoom() {
    console.log(this.map.getZoom());
  }

  resolveProperty(text:string):string{
    return propertyTypesConst.find(x => x.value === text).name || text || '-';
  }
}
