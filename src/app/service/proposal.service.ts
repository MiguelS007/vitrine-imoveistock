import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "./base.service";
import { HttpClient } from '@angular/common/http';
import { ProposalRequestDto } from "../dtos/proposal-request-dto";
import { Observable, map, catchError } from 'rxjs';
import { ProposalGetResponseDto } from "../dtos/proposal-get-response.dto";
import { ProposalCancelRequestDto } from "../dtos/proposal-cancel-request.dto";

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

    counterProposal(dto: ProposalRequestDto): Observable<any> {
        return this.httpClient
            .patch(`${this.url}/counter-proposal`, dto, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    cancelProposal(visitId: string, dto: ProposalCancelRequestDto): Observable<any> {
        return this.httpClient
            .patch(`${this.url}/update-status/${visitId}`, dto, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    list(): Observable<any> {
        return this.httpClient
            .get(`${this.url}/user`, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

}