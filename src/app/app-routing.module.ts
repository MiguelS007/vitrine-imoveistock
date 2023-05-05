import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { PropertyDetailComponent } from './pages/property-detail/property-detail.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { NgModule } from '@angular/core';
import { SearchMapComponent } from './pages/search-map/search-map.component';
import { AnnouncementGetByIdResolve } from './resolvers/announcement-getById.resolver';
import { CookiePolicyComponent } from './shared/cookie-policy/cookie-policy.component';
import { RegisterCompanionComponent } from './pages/register-companion/register-companion.component';

export const routes: Routes = [

  { path: '', 
    component: HomeComponent 
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'cookie-policy',
    component: CookiePolicyComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'search',
    component: SearchPageComponent,
  },
  {
    path: 'search-map',
    component: SearchMapComponent,
  },
  {
    path: 'announcement/detail/:_id',
    component: PropertyDetailComponent, resolve: { resolve: AnnouncementGetByIdResolve }
  },
  {
    path: 'register-companion',
    component: RegisterCompanionComponent,
  },
  {
    path: 'logged',
    loadChildren: () =>
      import('./logged/logged.module')
        .then(m => m.LoggedModule)
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}