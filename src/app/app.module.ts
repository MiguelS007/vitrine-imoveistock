import { forwardRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';

import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { HomeComponent } from './home/home.component';
import { HomeProductsComponent } from './home/home-products/home-products.component';
import { HomeGalleryComponent } from './home/home-gallery/home-gallery.component';
import { HomeCardsComponent } from './home/home-cards/home-cards.component';
import { HomeHeaderComponent } from './home/home-header/home-header.component';
import { LoggedModule } from './logged/logged.module';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';

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
    ContactComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SwiperModule,
    FormsModule,
    LoggedModule,
    ReactiveFormsModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    NgxPageScrollCoreModule,
  ],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => HomeHeaderComponent)
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
