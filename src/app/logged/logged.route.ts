import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoggedComponent } from './logged.component';
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoggedRouteModule {}
