import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserRegisterRequestDto } from '../dtos/user-register-request.dto';
import { UserRegisterResponseDto } from '../dtos/user-register-response.dto';
import { UserGetResponseDto } from '../dtos/user-get-response.dtos';
import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService {

    url: string = `${environment.apis.imoveistock}/user`;

    constructor(
        private httpClient: HttpClient,
    ) {
        super();
    }
    register(dto: UserRegisterRequestDto): Observable<UserRegisterResponseDto> {
        return this.httpClient
            .post(`${this.url}`, dto, this.authorizedHeader())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }
    getUser(): Observable<UserGetResponseDto> {
        return this.httpClient
            .get(`${this.url}/authenticated`, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }
}