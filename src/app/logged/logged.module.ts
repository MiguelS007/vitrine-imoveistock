import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoggedRouteModule } from "./logged.route";
import { LoggedComponent } from './logged.component';
import { SwiperModule } from 'swiper/angular';
import { AppComponent } from '../app.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { VisitsComponent } from './visits/visits.component';
import { NgxMaskModule } from 'ngx-mask';
import { ExpressProposalComponent } from './express-proposal/express-proposal.component';
import { AnnouncementService } from '../service/announcement.service';
import { FavoritesComponent } from './visits/components/favorites/favorites.component';
import { SchedulingComponent } from './visits/components/scheduling/scheduling.component';
import { SchedulingSelectedModalComponent } from './visits/components/scheduling/scheduling-selected-modal/scheduling-selected-modal.component';
import { AnnouncementGetByIdResolve } from '../resolvers/announcement-getById.resolver';
import { ProposalService } from '../service/proposal.service';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ScheduleService } from '../service/schedule.service';
@NgModule({
  declarations: [
    LoggedComponent,
    VisitsComponent,
    ExpressProposalComponent,
    FavoritesComponent,
    SchedulingComponent,
    SchedulingSelectedModalComponent,
  ],
  imports: [
    CommonModule,
    LoggedRouteModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    SwiperModule,
    CurrencyMaskModule,
   
  ],
  schemas: [],
  providers: [
    AnnouncementService,
    AnnouncementGetByIdResolve,
    ProposalService,
    ScheduleService
  ],
  bootstrap: [AppComponent]

})
export class LoggedModule { }
