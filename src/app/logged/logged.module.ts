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
@NgModule({
  declarations: [
    LoggedComponent,
    VisitsComponent,
    ExpressProposalComponent,
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
  bootstrap: [AppComponent]

})
export class LoggedModule { }
