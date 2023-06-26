import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserRegisterRequestDto } from '../dtos/user-register-request.dto';
import { UserRegisterResponseDto } from '../dtos/user-register-response.dto';
import { UserGetResponseDto } from '../dtos/user-get-response.dtos';
import { BaseService } from './base.service';
import { UserSendMessageRequestDto } from '../dtos/user-send-message-request.dto';
import { UserUpdateDto } from '../dtos/user-update.dto';
import { UserEditPhotoRequestDto } from '../dtos/user-edit-photo-request.dto';

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService {

    url: string = `${environment.apis.imoveistock}app/`;
    termsOrPolitic?: string ;
    termsOrPoliticSignUp?: string ;

    modalRegisterForm: UserRegisterRequestDto;

    constructor(
        private httpClient: HttpClient,
    ) {
        super();
    }
    register(dto: UserRegisterRequestDto): Observable<UserRegisterResponseDto> {
        return this.httpClient
            .post(`${this.url}user-client`, dto, this.anonymousHeader())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

    sendMessage(dto: UserSendMessageRequestDto): Observable<boolean> {
        return this.httpClient
            .post(`${this.url}user-client/send-message`, dto, this.anonymousHeader())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

    getUser(): Observable<UserGetResponseDto> {
        return this.httpClient
            .get(`${this.url}user-client/authenticated`, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    getBrokerByPhone(phone: string): Observable<UserGetResponseDto> {
        return this.httpClient
            .get(`${this.url}user-client/broker/${phone}`, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    userUpdate(dto: UserUpdateDto): Observable<UserUpdateDto> {
        return this.httpClient
            .patch(`${this.url}user-client/update-user-info`, dto, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    editPhoto(dto: UserEditPhotoRequestDto): Observable<UserGetResponseDto> {
        return this.httpClient
          .patch(`${this.url}user-client/photo`, dto, this.authorizedHeader())
          .pipe(map(this.extractData), catchError(this.serviceError));
      }
}
