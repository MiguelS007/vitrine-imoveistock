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
   
  ],
  schemas: [],
  providers: [
    AnnouncementService
  ],
  bootstrap: [AppComponent]

})
export class LoggedModule { }
