import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpressProposalComponent } from './express-proposal/express-proposal.component';

import { LoggedComponent } from './logged.component';
import { VisitsComponent } from './visits/visits.component';

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
        path: 'express',
        component: ExpressProposalComponent, 
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoggedRouteModule {}
