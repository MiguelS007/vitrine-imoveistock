import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from '../pages/about/about.component';
import { ContactComponent } from '../pages/contact/contact.component';
import { ExpressProposalComponent } from './express-proposal/express-proposal.component';

import { LoggedComponent } from './logged.component';
import { PropertyDetailComponent } from '../pages/property-detail/property-detail.component';
import { SearchPageComponent } from '../pages/search-page/search-page.component';
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
