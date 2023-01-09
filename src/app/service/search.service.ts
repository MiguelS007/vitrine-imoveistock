import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService extends BaseService {

  url: string = `${environment.apis.imoveistock}/profile`

  constructor(
      private httpClient: HttpClient
  ) {
      super();
  }

  getSearch(): Observable<any> {
      return this.httpClient
          .get(`${this.url}`, this.anonymousHeader())
          .pipe(map(this.extractData), catchError(this.serviceError));
  }
}