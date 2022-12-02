import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoggedComponent } from './logged.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { SearchPageComponent } from './search-page/search-page.component';

const routes: Routes = [
  {
    path: '',
    component: LoggedComponent,
    children: [
      {
        path: 'search',
        component: SearchPageComponent, 
      },
      {
        path: 'property-detail',
        component: PropertyDetailComponent, 
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoggedRouteModule {}
