import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';
import { ScheduleRegisterRequestDto } from '../dtos/schedule-register-request.dto';
import { ScheduleRegisterResponseDto } from '../dtos/schedule-register-response.dto';

@Injectable({
    providedIn: 'root'
})
export class ScheduleService extends BaseService {

    url: string = `${environment.apis.imoveistock}`;

    constructor(
        private httpClient: HttpClient,
    ) {
        super();
    }

    registerSchedule(_id: string, dto: ScheduleRegisterRequestDto): Observable<ScheduleRegisterResponseDto> {
        return this.httpClient
            .post(`${this.url}app/announcement-visit/register/${_id}`, dto, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    getListVisists(): Observable<ScheduleRegisterResponseDto[]> {
        return this.httpClient
            .get(`${this.url}app/announcement-visit/list`, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

}