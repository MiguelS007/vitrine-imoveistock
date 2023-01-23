import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { BaseService } from 'src/app/service/base.service';
import { environment } from 'src/environments/environment';

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


}