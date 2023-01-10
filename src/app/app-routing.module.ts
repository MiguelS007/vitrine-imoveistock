import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { PropertyDetailComponent } from './pages/property-detail/property-detail.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { NgModule } from '@angular/core';
import { ModalLoginComponent } from './auth/modal-login/modal-login.component';

export const routes: Routes = [

  { path: '', 
    component: ModalLoginComponent 
  },
  { 
    path: 'home',
    component: HomeComponent 
  },
  {
    path: 'contact',
    component: ContactComponent,
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
    path: 'property-detail',
    component: PropertyDetailComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
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