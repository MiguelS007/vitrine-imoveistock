import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "./base.service";
import { HttpClient } from '@angular/common/http';
import { ProposalRequestDto } from "../dtos/proposal-request-dto";
import { Observable, map, catchError } from 'rxjs';
import { ProposalGetResponseDto } from "../dtos/proposal-get-response.dto";
import { ProposalCancelRequestDto } from "../dtos/proposal-cancel-request.dto";
import { ProposalGetByIdResponseDto } from "../dtos/proposal-get-by-id-response.dto";

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
            .post(`${this.url}/proposal`, dto, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    counterProposal(dto: ProposalRequestDto): Observable<any> {
        return this.httpClient
            .post(`${this.url}/counter-proposal`, dto, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    cancelProposal(visitId: string, dto: ProposalCancelRequestDto): Observable<any> {
        return this.httpClient
            .patch(`${this.url}/update-status/${visitId}`, dto, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    list(): Observable<any> {
        return this.httpClient
            .get(`${this.url}/proposal/user`, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    getById(proposalId): Observable<ProposalGetByIdResponseDto> {
        return this.httpClient
            .get(`${this.url}/id/${proposalId}`, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    getByAnnouncement(announcementId): Observable<ProposalGetResponseDto[]> {
        return this.httpClient
            .get(`${this.url}/annoucement/${announcementId}`, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

}