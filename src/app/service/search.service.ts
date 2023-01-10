import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';
import { HomeGetResponsetDto } from '../dtos/home-get-response.dto';

@Injectable({
  providedIn: 'root'
})
export class SearchService extends BaseService {

  url: string = `${environment.apis.imoveistock}`

  constructor(
    private httpClient: HttpClient
  ) {
    super();
  }

  getSearch(): Observable<any> {
    return this.httpClient
      .get(`${this.url}/profile`, this.anonymousHeader())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }
  getPropertyHome(): Observable<HomeGetResponsetDto[]> {
    return this.httpClient
      .get(`${this.url}/announcement`, this.authorizedHeader())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

}