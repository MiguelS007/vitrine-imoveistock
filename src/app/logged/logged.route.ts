import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnnouncementGetByIdResolve } from '../resolvers/announcement-getById.resolver';
import { ExpressProposalComponent } from './express-proposal/express-proposal.component';

import { LoggedComponent } from './logged.component';
import { VisitsComponent } from './visits/visits.component';
import { RegisterCompanionComponent } from '../pages/register-companion/register-companion.component';
import { MyAccountComponent } from './my-account/my-account.component';

const routes: Routes = [
  {
    path: '',
    component: LoggedComponent,
    children: [
      {
        path: 'visits',
        component: VisitsComponent,
      },
      {
        path: 'express/:_id',
        component: ExpressProposalComponent, resolve: { resolve: AnnouncementGetByIdResolve }
      },
      {
        path: 'my-account',
        component: MyAccountComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoggedRouteModule {}
