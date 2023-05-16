import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AnnouncementRatingRegisterRequestDto } from '../dtos/announcement-rating-register-request.dto';
import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root'
})
export class AnnouncementRatingService extends BaseService {

    url: string = `${environment.apis.imoveistock}`;

    constructor(
        private httpClient: HttpClient,
    ) {
        super();
    }

    registerAnnouncementRating(dto: AnnouncementRatingRegisterRequestDto) {
        return this.httpClient
            .post(`${this.url}app/announcement-rating/register`, dto, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

}