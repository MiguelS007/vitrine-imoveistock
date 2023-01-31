import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends BaseService {
  

  url: string = `${environment.apis.imoveistock}`

  constructor(
      private httpClient: HttpClient
  ) {
      super();
  }

  list(): Observable<any> {
      return this.httpClient
          .get(`${this.url}app/profile-client`, this.anonymousHeader())
          .pipe(map(this.extractData), catchError(this.serviceError));
  }
  
}