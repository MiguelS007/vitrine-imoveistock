import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { AnnouncementService } from "../service/announcement.service";
import { ScheduleService } from "../service/schedule.service";

@Injectable()
export class VisitGetByIdResolve implements Resolve<any> {

    constructor(
        private scheduleService: ScheduleService,
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        const result = this.scheduleService.getById(route.params['_id']);
        return result;
    }
}