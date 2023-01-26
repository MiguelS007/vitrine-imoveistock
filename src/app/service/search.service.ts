import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AnnouncementGetResponseDto } from '../dtos/announcement-get-response.dto';
import { BaseService } from './base.service';

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
      .get(`${this.url}profile`, this.anonymousHeader())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }
  getPropertyHome(): Observable<AnnouncementGetResponseDto[]> {
    return this.httpClient
      .get(`${this.url}announcement/list`, this.anonymousHeader())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }
  getPropertyList(): Observable<AnnouncementGetResponseDto[]> {
    return this.httpClient
      .get(`${this.url}announcement`, this.anonymousHeader())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }
  listByAdvertizer(): Observable<AnnouncementGetResponseDto[]> {
    return this.httpClient
        .get(`${this.url}announcement/list-by-advertizer`, this.authorizedHeader())
        .pipe(map(this.extractData), catchError(this.serviceError));
}


}