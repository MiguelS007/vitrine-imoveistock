import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { AnnouncementService } from "../service/announcement.service";

@Injectable()
export class AnnouncementGetByIdResolve implements Resolve<any> {

    constructor(
        private announcementService: AnnouncementService,
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        const result = this.announcementService.announcementGetById(route.params['_id']);
        return result;
    }
}