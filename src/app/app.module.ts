import { forwardRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { NgxMaskModule } from "ngx-mask";
import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeProductsComponent } from './pages/home/home-products/home-products.component';
import { HomeGalleryComponent } from './pages/home/home-gallery/home-gallery.component';
import { HomeCardsComponent } from './pages/home/home-cards/home-cards.component';
import { HomeHeaderComponent } from './pages/home/home-header/home-header.component';
import { LoggedModule } from './logged/logged.module';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { PropertyDetailComponent } from './pages/property-detail/property-detail.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { ModalLoginComponent } from './auth/modal-login/modal-login.component';
import { ModalTelComponent } from './auth/modal-tel/modal-tel.component';
import { ModalCodeComponent } from './auth/modal-code/modal-code.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalSignupComponent } from './auth/modal-signup/modal-signup.component';

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
    AboutComponent,
    SearchPageComponent,
    PropertyDetailComponent,
    ModalLoginComponent,
    ModalTelComponent,
    ModalCodeComponent,
    ModalSignupComponent
  ],

  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    SwiperModule,
    FormsModule,
    LoggedModule,
    ToastrModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    NgxMaskModule.forRoot(),
    VgBufferingModule,
    NgxPageScrollModule,
    ToastrModule.forRoot(),
    NgxPageScrollCoreModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => HomeHeaderComponent)
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
