import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { HomeComponent } from './home/home.component';
import { HomeProductsComponent } from './home/home-products/home-products.component';
import { HomeGalleryComponent } from './home/home-gallery/home-gallery.component';
import { HomeCardsComponent } from './home/home-cards/home-cards.component';
import { HomeHeaderComponent } from './home/home-header/home-header.component';
import { LoggedComponent } from './logged/logged.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent,
    HomeProductsComponent,
    HomeGalleryComponent,
    HomeCardsComponent,
    HomeHeaderComponent,
    LoggedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPageScrollCoreModule,
    NgxPageScrollCoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
