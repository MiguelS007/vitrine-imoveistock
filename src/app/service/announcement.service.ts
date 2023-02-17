import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AnnouncementGetResponseDto } from '../dtos/announcement-get-response.dto';
import { AnnouncementLikeRequestDto } from '../dtos/announcement-like-request.dto';
import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root'
})
export class AnnouncementService extends BaseService {

    url: string = `${environment.apis.imoveistock}app/announcement`;

    constructor(
        private httpClient: HttpClient,
    ) {
        super();
    }

    registerLike(dto: AnnouncementLikeRequestDto): Observable<any> {
        return this.httpClient
            .post(`${this.url}/like`, dto, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    registerUnlike(dto: AnnouncementLikeRequestDto): Observable<any> {
        return this.httpClient
            .post(`${this.url}/unlike`, dto, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    listLikes(): Observable<any> {
        return this.httpClient
            .get(`${this.url}/like/list-by-user`, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    listAnnouncement(): Observable<AnnouncementGetResponseDto[]> {
        return this.httpClient
            .get(`${this.url}/list-all-showcase`, this.anonymousHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    announcementGetById(_id: string): Observable<AnnouncementGetResponseDto> {
        return this.httpClient
            .get(`${this.url}detail/${_id}`, this.anonymousHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

}