import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthenticateRequestDto } from '../dtos/authenticate-request.dto';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { BaseService } from './base.service';
import { AuthenticateResponseDto } from '../dtos/authenticate-response.dto';
import { AuthetincatedUserDto } from '../dtos/authenticated-user.dto';
import LocalStorageUtil, { LocalStorageKeys } from "../utils/localStorage.util";
import jwtDecode from 'jwt-decode';
import { AuthenticateCodeConfirmationRequestDto } from '../dtos/authentication-code-confirmation.dtos';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService {

  url: string = `${environment.apis.imoveistock}/authentication`;

  token = {
    userId: '',
    phone: '',
    token: '',
    profileId: '',
    apiFunctionsId: [],
  }

  jwtPayload: JwtPayload;


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
  authenticateCodeConfirmation(dto: AuthenticateCodeConfirmationRequestDto): Observable<AuthetincatedUserDto> {
    return this.httpClient
      .post(`${this.url}/authenticate-code-confirmation`, dto, this.anonymousHeader())
      .pipe(
        map(this.extractData),
        catchError(this.serviceError)
      );
  }



  getPayLoadFromLocalStorage(): JwtPayload {
    const token = this.getAuthenticatedUser();
    return jwtDecode(token.token);
  }

  setAuthenticatedUser(dto: AuthetincatedUserDto) {
    LocalStorageUtil.set(LocalStorageKeys.user, dto);
    this.getPayLoadFromJWT();
  }

  getAuthenticatedUser(): AuthetincatedUserDto {
    return LocalStorageUtil.get(LocalStorageKeys.user);
  }

  getPayLoadFromJWT() {
    this.token = this.getAuthenticatedUser();
    return this.jwtPayload = jwtDecode(this.token.token);
  }


}