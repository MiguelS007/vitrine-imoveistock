import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import CryptoUtil from '../utils/crypto.util';
import LocalStorageUtil, { LocalStorageKeys } from '../utils/localStorage.util';

export abstract class BaseService {
    protected anonymousHeader() {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
    }
    protected authorizedHeader() {
      const user = LocalStorageUtil.get(LocalStorageKeys.user);
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        })
      };
    }
    protected extractData(response: any) {
      return response.data || {};
    }
    protected resp(response: any) {
      return response || {};
    }
    protected serviceError(response: Response | any) {
      let customError: string[] = [];
      let customResponse = new Error();
      if (response instanceof HttpErrorResponse) {
        if (response.statusText === 'Unknown Error') {
          customError.push('Unknown Error');
          response.error.errors = customError;
        }
      }
      if (response.status === 500) {
        customError.push('Error processing request');
        customResponse.error.errors = customError;
        return throwError(customResponse);
      }
      return throwError(response);
    }
    protected extractCryptoData(response: any) {
      const decryptedData = CryptoUtil.decrypt(environment.payloadKey, response.data.payload);
      return JSON.parse(decryptedData);
    }
    protected encrypt(request: any) {
      const encryptedData = CryptoUtil.encrypt(environment.payloadKey, JSON.stringify(request));
      return { payload: encryptedData };
    }
  }
  class Error {
    error: ErrorResponse = new ErrorResponse();
  }
  class ErrorResponse {
    errors: string[] = [];
  }
  