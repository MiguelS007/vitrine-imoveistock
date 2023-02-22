import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { AnnouncementService } from "../service/announcement.service";

@Injectable()
export class AnnouncementGetByIdResolve implements Resolve<any> {

    constructor(
        private announcementService: AnnouncementService,
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.announcementService.announcementGetById(route.params['_id']);
    }
}