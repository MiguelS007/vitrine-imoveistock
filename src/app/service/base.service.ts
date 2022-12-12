import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserAuthenticatedDto } from '../dtos/user-authenticated.dto';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  protected api: string = `${environment.api.path}`;

  response: UserAuthenticatedDto;

  protected anonymousHeader() {
      return {
          headers: new HttpHeaders({
              'Content-Type': 'application/json'
          })
      };
  }

  protected authorizedHeader() {

      const userJson = JSON.parse(localStorage.getItem('user'));
      let accessToken = userJson.accessToken
      let phone = userJson.phone
      
      this.response = {
          accesstoken: accessToken,
          phone: phone
      };
      
      return {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.response?.accesstoken}`
          })
      };
  }

  protected extractData(response: any) {
      return response.data || {};
  }

  protected serviceError(response: Response | any) {
      let customError: string[] = [];
      let customResponse = { error: { erros: [] } }

      if (response instanceof HttpErrorResponse) {

          if (response.statusText === 'Unknown Error') {
              customError.push('Unknown Error');
              response.error.errors = customError;
          }
      }

      if (response.status === 500) {
          customError.push('Error processing request');

          customResponse.error.erros = customError;
          return throwError(customResponse);
      }

      return throwError(response);
  }
}