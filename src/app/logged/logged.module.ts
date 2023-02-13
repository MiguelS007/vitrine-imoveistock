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
import { ProposalComponent } from './visits/components/proposal/proposal.component';
import { ProposalSelectedModalComponent } from './visits/components/proposal/proposal-selected-modal/proposal-selected-modal.component';
import { ProposalCancelModalComponent } from './visits/components/proposal/proposal-cancel-modal/proposal-cancel-modal.component';
import { EditSchedulingModalComponent } from './visits/components/scheduling/edit-scheduling-modal/edit-scheduling-modal.component';
import { EditScheduling2ModalComponent } from './visits/components/scheduling/edit-scheduling2-modal/edit-scheduling2-modal.component';
import { EditScheduling3ModalComponent } from './visits/components/scheduling/edit-scheduling3-modal/edit-scheduling3-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    LoggedComponent,
    VisitsComponent,
    ExpressProposalComponent,
    FavoritesComponent,
    SchedulingComponent,
    SchedulingSelectedModalComponent,
    ProposalComponent,
    ProposalSelectedModalComponent,
    ProposalCancelModalComponent,
    EditSchedulingModalComponent,
    EditScheduling2ModalComponent,
    EditScheduling3ModalComponent,
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
    NgbModule
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
