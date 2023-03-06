import { forwardRef, NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
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
import { SearchMapComponent } from './pages/search-map/search-map.component';
import { AnnouncementGetByIdResolve } from './resolvers/announcement-getById.resolver';
import { NgxSpinnerModule } from "ngx-spinner";
import { AnnouncementService } from './service/announcement.service';
import { SchedulingStep1Component } from './pages/property-detail/components/scheduling-step1/scheduling-step1.component';
import { SchedulingStep2Component } from './pages/property-detail/components/scheduling-step2/scheduling-step2.component';
import { SchedulingStep3Component } from './pages/property-detail/components/scheduling-step3/scheduling-step3.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { TermsComponent } from './shared/terms/terms.component';
import { CookiePolicyComponent } from './shared/cookie-policy/cookie-policy.component';
import {NgcCookieConsentConfig, NgcCookieConsentModule} from "ngx-cookieconsent";
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { TermsSignupComponent } from './shared/terms-signup/terms-signup.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

registerLocaleData(ptBr);

const cookieConfig:NgcCookieConsentConfig = {
  cookie: {
    domain: window.location.hostname
  },
  palette: {
    popup: {
      background: '#000000'
    },
    button: {
      background: '#01FF5F',
      border: `#000000`,
      text: `#000000`,
    }
  },
  theme: 'classic',
  type: 'info',
  content:{
    message: 'Nossa plataforma utiliza cookies para otimizar e personalizar sua experiência. Ao continuar navegando, você automaticamente concorda com a nossa',
    link: 'Política de cookies',
    href: 'cookie-policy',
    dismiss:'Aceitar cookies',
  },
};

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
    ModalSignupComponent,
    SearchMapComponent,
    SchedulingStep1Component,
    SchedulingStep2Component,
    SchedulingStep3Component,
    TermsComponent,
    CookiePolicyComponent,
    TermsSignupComponent,
  ],

  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    AppRoutingModule,
    RouterModule,
    GoogleMapsModule,
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
    NgxPageScrollCoreModule,
    NgxSpinnerModule,
    CurrencyMaskModule,
    AutocompleteLibModule,
    NgcCookieConsentModule.forRoot(cookieConfig),
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => HomeHeaderComponent)
    },
    AnnouncementGetByIdResolve,
    { provide: LOCALE_ID, useValue: 'pt' },
    AnnouncementService
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule { }
