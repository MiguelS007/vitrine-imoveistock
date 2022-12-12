import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { UserRegisterRequestDto } from '../dtos/user-register-request.dto';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  userApi: string = `${this.api}/user`;

  constructor(
      private httpClient: HttpClient,
  ) {
      super();
  }

  getUser(): Observable<any> {
      return this.httpClient
          .get(`${this.userApi}`, this.authorizedHeader())
          .pipe(
              map(this.extractData),
              catchError(this.serviceError)
          );
  }

  register(dto: UserRegisterRequestDto): Observable<any> {
      return this.httpClient
          .post(`${this.userApi}/register`, dto, this.authorizedHeader())
          .pipe(
              map(this.extractData),
              catchError(this.serviceError)
          );
  }
}