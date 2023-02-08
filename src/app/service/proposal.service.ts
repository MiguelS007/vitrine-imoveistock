import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "./base.service";
import { HttpClient } from '@angular/common/http';
import { ProposalRequestDto } from "../dtos/proposal-request-dto";
import { Observable, map, catchError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProposalService extends BaseService {

    url: string = `${environment.apis.imoveistock}app/proposal`;

    constructor(
        private httpClient: HttpClient,
    ) {
        super();
    }

    register(dto: ProposalRequestDto): Observable<any> {
        return this.httpClient
            .post(`${this.url}`, dto, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

}