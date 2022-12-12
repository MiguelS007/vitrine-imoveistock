import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthenticateRequestDto } from '../dtos/authenticate-request.dto';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { BaseService } from './base.service';
import { AuthenticateResponseDto } from '../dtos/authenticate-response.dto';
import { AuthetincatedUserDto } from '../dtos/authenticated-user.dto';
import { LocalStorageKeys } from '../utils/localStorage.util';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService {

  url: string = `${this.api}/authentication`;
  jwtPayload: JwtPayload;

  token = {
    phone: '',
    accessToken: ''
  }

  constructor(
    private httpClient: HttpClient
  ) {
    super()
  }


  authenticate(dto: AuthenticateRequestDto): Observable<AuthenticateResponseDto> {
    return this.httpClient
      .post(`${this.url}/authenticate`, dto, this.anonymousHeader())
      .pipe(
        map(this.extractData),
        catchError(this.serviceError)
      );
  }


  getPayLoadFromLocalStorage(): JwtPayload {
    const token = this.getAuthenticatedUser();
    return jwtDecode(token.accessToken);
  }

  setAuthenticatedUser(dto: AuthetincatedUserDto) {
    localStorage.set(LocalStorageKeys.user, dto);
    this.getPayLoadFromJWT();
  }

  getAuthenticatedUser(): AuthetincatedUserDto {
    return localStorage.get(LocalStorageKeys.user);
  }

  getPayLoadFromJWT() {
    this.token = this.getAuthenticatedUser();
    return this.jwtPayload = jwtDecode(this.token.accessToken);
  }

}