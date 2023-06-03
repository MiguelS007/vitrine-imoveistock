import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AnnouncementFilterListResponseDto } from '../dtos/announcement-filter-list-response.dto';
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

    listAnnouncement(limit?:number): Observable<AnnouncementGetResponseDto[]> {
        return this.httpClient
            .get(`${this.url}/list-all-showcase/${limit || ''}`, this.anonymousHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    announcementGetById(_id: string): Observable<AnnouncementGetResponseDto> {
        return this.httpClient
            .get(`${this.url}/detail/${_id}`, this.anonymousHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    listExclusive(limit?:number): Observable<AnnouncementGetResponseDto[]> {
        return this.httpClient
            .get(`${this.url}/list-exclusive-showcase/${limit || ''}`, this.anonymousHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    listFilter(dto: AnnouncementFilterListResponseDto): Observable<{data:AnnouncementGetResponseDto[], total: number}> {
        let queryParams = `typeOfAdd=${dto.typeOfAdd}`;
        
        if(dto.propertyType && dto.propertyType.length > 0) {
            dto.propertyType.forEach(element => {
                queryParams += `&propertyType=${element}`;       
            });
        }

        if(dto.ufAddress) {
            queryParams += `&ufAddress=${dto.ufAddress}`
        }

        if(dto.cityAddress) {
            queryParams += `&cityAddress=${dto.cityAddress}`
        }

        if(dto.districtAddress) {
            queryParams += `&districtAddress=${dto.districtAddress}`
        }

        if(dto.initialValue && dto.initialValue > 1) {
            queryParams += `&initialValue=${dto.initialValue}`
        }

        if(dto.finalValue && dto.finalValue > 0 ) {
            queryParams += `&finalValue=${dto.finalValue}`
        }

        if(dto.bedrooms) {
            queryParams += `&bedrooms=${dto.bedrooms}`
        }

        if(dto.goal) {
            queryParams += `&goal=${dto.goal}`
        }

        if(dto.bathrooms) {
            queryParams += `&bathrooms=${dto.bathrooms}`
        }

        if(dto.parkingSpaces) {
            queryParams += `&parkingSpaces=${dto.parkingSpaces}`
        }

        if(dto.yearOfConstruction) {
            queryParams += `&yearOfConstruction=${dto.yearOfConstruction}`
        }

        if(dto.initialUsefulArea) {
            queryParams += `&initialUsefulArea=${dto.initialUsefulArea}`
        }

        if(dto.finalUsefulArea) {
            queryParams += `&finalUsefulArea=${dto.finalUsefulArea}`
        }

        if(dto.page) {
            queryParams += `&page=${dto.page}`
        }

        return this.httpClient
            .get(`${this.url}/list-filter?${queryParams}`, this.anonymousHeader())
            .pipe(map((d: any) => {
                return { data: d.data as AnnouncementGetResponseDto[], total: d.total }
            }), catchError(this.serviceError));
    }

    listByDistrict(district: string): Observable<AnnouncementGetResponseDto[]> {
        return this.httpClient
          .get(`${this.url}/list-by-district?district=${district}`, this.anonymousHeader())
          .pipe(map(this.extractData), catchError(this.serviceError));
      }
      

    countDistrict():Observable<{district:string, count:number}[]>{
        return this.httpClient
        .get(`${this.url}/district-count`, this.anonymousHeader())
        .pipe(map(this.extractData), catchError(this.serviceError));
    }

    listDistrictsByCity(city:string):Observable<{district: string}[]>{
        return this.httpClient
        .get(`${this.url}/list-districts-city/${city}`, this.anonymousHeader())
        .pipe(map(this.extractData), catchError(this.serviceError));
    }
}