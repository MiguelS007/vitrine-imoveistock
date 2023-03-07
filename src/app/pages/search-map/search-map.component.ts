import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AnnouncementGetResponseDto } from 'src/app/dtos/announcement-get-response.dto';
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
export class SearchMapComponent implements OnInit, AfterViewInit {

  @ViewChild(GoogleMap) public map: GoogleMap | undefined;

  geolib: any;
  geocoder: google.maps.Geocoder = new google.maps.Geocoder();

  center: google.maps.LatLngLiteral | undefined;
  zoom: number = 15;

  mapOptions: google.maps.MapOptions = {
    disableDoubleClickZoom: true,
    fullscreenControl: false,
    keyboardShortcuts: false,
    streetViewControl: false,
    maxZoom: 15,
    minZoom: 1,
  };

  markers: google.maps.Marker[] | undefined;

  response: AnnouncementGetResponseDto[] = [];
  selectedAnouncements: AnnouncementGetResponseDto[] = [];

  pagination: number = 1;

  orderBy: string = 'Selecione'

  filtroResultDisplay: AnnouncementFilterListResponseDto;

  constructor(
    private ngxSpinnerService: NgxSpinnerService,
    private router: Router,
    private _geocodeService: GeocodeService,
  ) {

    this.geolib = require('geolib');
  }

  ngAfterViewInit(): void {
    this._updateMarkers();
  }

  ngOnInit(): void {

    this.ngxSpinnerService.show();

    this.response = JSON.parse(localStorage.getItem('resultSearch'));

    this.filtroResultDisplay = JSON.parse(localStorage.getItem('filtro'));

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
      });

      marker.addListener('click', () => {
        this.announcementSelected(anouncement._id);
      });

      this.markers?.push(marker);
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

      this.response.map((item) => {
        const distanceInKm = this._geocodeService.getDistanceInKm(
          { lat: this.center?.lat!, lng: this.center?.lng! },
          {
            lat: +(item.latitude),
            lng: +(item.longitude),
          }
        );

        if (distanceInKm <= 0.1)
          this.selectedAnouncements.push(item);
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


  }

  changeZoom() {

  }
}
