import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AnnouncementGetResponseDto } from 'src/app/dtos/announcement-get-response.dto';
import { environment } from '../../../environments/environment';
import { GoogleMap } from '@angular/google-maps';
import {
  Cluster,
  MarkerClusterer,
  SuperClusterAlgorithm,
} from '@googlemaps/markerclusterer';
import { GeocodeService } from '../../service/geocode.service';
import { AnnouncementFilterListResponseDto } from '../../dtos/announcement-filter-list-response.dto';
import { propertyTypesConst } from 'src/app/utils/propertyTypes';
import { AnnouncementService } from 'src/app/service/announcement.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalLoginComponent } from 'src/app/auth/modal-login/modal-login.component';
import { ViewAnnouncementModalComponent } from './view-announcement-modal/view-announcement-modal.component';

@Component({
  selector: 'app-search-map',
  templateUrl: './search-map.component.html',
  styleUrls: ['./search-map.component.scss'],
})
export class SearchMapComponent implements OnInit, AfterViewInit {
  @ViewChild(GoogleMap) public map: GoogleMap | undefined;

  geolib: any;
  geocoder: google.maps.Geocoder;

  center: google.maps.LatLngLiteral | undefined;
  zoom: number = 12;

  mapOptions: google.maps.MapOptions = {
    disableDoubleClickZoom: true,
    fullscreenControl: false,
    keyboardShortcuts: false,
    streetViewControl: false,
    maxZoom: 18,
    minZoom: 5,
  };

  markers: google.maps.Marker[] | undefined;

  cluster: MarkerClusterer;

  response: AnnouncementGetResponseDto[] =
    JSON.parse(localStorage.getItem('resultSearch')) || [];
  selectedAnouncements: AnnouncementGetResponseDto[] = [];

  pagination: number = 1;

  orderBy: string = 'Selecione';

  filtroResultDisplay: AnnouncementFilterListResponseDto;

  mapCustom: google.maps.Map; // referência para o objeto Map
  markerCustom: google.maps.Marker; // referência para o objeto Marker

  constructor(
    private ngxSpinnerService: NgxSpinnerService,
    private router: Router,
    private _geocodeService: GeocodeService,
    private changeDetectorRef: ChangeDetectorRef,
    private announcementService: AnnouncementService,
    private modalService: NgbModal
  ) {
    this.geolib = require('geolib');
  }

  ngAfterViewInit(): void {
    this._updateMarkers();
  }

  scrollUp() {
    window.scrollTo({behavior:'smooth', top:0});
  }

  ngOnInit(): void {
    this.ngxSpinnerService.show();

    this.geocoder = new google.maps.Geocoder();

    this.response = JSON.parse(localStorage.getItem('resultSearch'));
    this.selectedAnouncements = this.response;

    this.filtroResultDisplay = JSON.parse(localStorage.getItem('filtro'));

    this.geocoder.geocode(
      {
        address: `${this.filtroResultDisplay.cityAddress}, ${this.filtroResultDisplay.ufAddress}`,
      },
      (results, status) => {
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
      }
    );

    this.mapOptions.center = this.center;

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.ngxSpinnerService.hide();
  }

  onChangeSearch(search: string) {}

  selectAnnouncement(_id: string) {
    this.router.navigate([`announcement/detail`, _id]);
  }

  likeHeart(value, condition) {
    let request = {
      announcementId: value,
    };

    if (localStorage.getItem('user') === null) {
      this.modalService.open(ModalLoginComponent, { centered: true });
      return;
    }

    if (condition === true) {
      this.announcementService.registerUnlike(request).subscribe({
        next: (success) => {
          this.listLikes();
        },
        error: (error) => {
          console.error(error);
        },
      });
    } else if (condition === undefined) {
      this.announcementService.registerLike(request).subscribe({
        next: (success) => {
          this.listLikes();
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }

  changeOderBy(value) {
    this.orderBy = value;
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
      this.response.sort((a, b) => (a.saleValue < b.saleValue ? -1 : 0));
    else if (value === 'major>minor')
      this.response.sort((a, b) => (a.saleValue > b.saleValue ? -1 : 0));
  }

  private _updateMarkers() {
    this.markers = [];

    if (!this.response || !this.response.length) return;

    this.response.map((anouncement) => {
      const marker = new google.maps.Marker({
        draggable: false,
        position: {
          lat: +anouncement.latitude,
          lng: +anouncement.longitude,
        },
        icon: '../../../assets/icon/custom-marker.svg',
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

      if (distance <= 2) idList.push(_id);

      this.center = {
        lat: clusterLat,
        lng: clusterLng,
      };

      if (mapZoom <= 13) {
        this.zoom = mapZoom + 3;
        this.map.googleMap.setZoom(mapZoom + 3);
      } else if (mapZoom < 18) {
        this.zoom = mapZoom + 1;
        this.map.googleMap.setZoom(mapZoom + 1);
      }
    });

    if (this.map.googleMap.getZoom() === 18)
      this._filterAnnouncementLst(idList);
  }

  _filterAnnouncementLst(_ids?: string[]) {
    if (!_ids) this.selectedAnouncements = this.response;
    else {
      this.selectedAnouncements = [];

      this.response.map((an) => {
        if (_ids.includes(an._id)) this.selectedAnouncements.push(an);
      });

      this.changeDetectorRef.detectChanges();
    }

    if (window.screen.width <= 998) {
      let responseView: any = [];
      this.response.map((an) => {
        if (_ids.includes(an._id)) responseView.push(an);
      });

      if (responseView.length === 1) {
        this.openAnnouncement(responseView);
      } else if (this.map.getZoom() >= 17) {
        this.openAnnouncement(responseView);
      }
    }
  }

  moveMap() {}

  changeZoom() {}

  resolveProperty(text: string): string {
    return (
      propertyTypesConst.find((x) => x.value === text)?.name || text || '-'
    );
  }

  listLikes() {
    if (localStorage.getItem('user') !== null) {
      this.announcementService.listLikes().subscribe({
        next: (data) => {
          data.forEach((element) => {
            for (let x = 0; x < this.response.length; x++)
              if (this.response[x]._id === element.announcement._id) {
                Object.assign(this.response[x], { liked: true });
              }
          });
        },
      });
    }
  }

  openAnnouncement(content) {
    localStorage.setItem('announcementView', JSON.stringify(content));
    this.modalService.open(ViewAnnouncementModalComponent, { centered: true });
  }
}
