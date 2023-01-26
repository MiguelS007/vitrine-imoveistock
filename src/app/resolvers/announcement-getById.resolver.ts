import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { SearchService } from "../service/search.service"

@Injectable()
export class AnnouncementGetByIdResolve implements Resolve<any> {

    constructor(
        private searchService: SearchService,
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.searchService.getPropertyDetails(route.params['_id']);
    }
}