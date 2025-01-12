import { Component} from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import {  NgcCookieConsentService,
  NgcInitializationErrorEvent,
  NgcInitializingEvent, NgcNoCookieLawEvent,
  NgcStatusChangeEvent} from "ngx-cookieconsent";
import { Subscription } from 'rxjs';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'imoveistock Indicação';
  
  
  private popupOpenSubscription!: Subscription;
  private popupCloseSubscription!: Subscription;
  private initializingSubscription!: Subscription;
  private initializedSubscription!: Subscription;
  private initializationErrorSubscription!: Subscription;
  private statusChangeSubscription!: Subscription;
  private revokeChoiceSubscription!: Subscription;
  private noCookieLawSubscription!: Subscription;
  
  loaderApi: Loader = new Loader({
    apiKey: environment.google.apiKey,
  });
  
  constructor(private ngCookieService: NgcCookieConsentService,
  ) {
    localStorage.setItem('googleMapsLoaded', 'false');
    this.loaderApi.load().then((google) => {
      localStorage.setItem('googleMapsLoaded', 'true');
     /*  console.log('google maps loaded!'); */
    });
  }


  ngOnInit(){
    // subscribe to cookieconsent observables to react to main events
    
    this.popupOpenSubscription = this.ngCookieService.popupOpen$.subscribe(
      () => {
        this.ngCookieService.init(this.ngCookieService.getConfig());
      });

    this.popupCloseSubscription = this.ngCookieService.popupClose$.subscribe(
      () => {
      });

    this.initializingSubscription = this.ngCookieService.initializing$.subscribe(
      (event: NgcInitializingEvent) => {
        console.log(`initializing: ${JSON.stringify(event)}`);
      });

    this.initializedSubscription = this.ngCookieService.initialized$.subscribe(
      () => {
        console.log(`initialized: ${JSON.stringify(event)}`);
      });

    this.initializationErrorSubscription = this.ngCookieService.initializationError$.subscribe(
      (event: NgcInitializationErrorEvent) => {

        console.log(`initializationError: ${JSON.stringify(event.error?.message)}`);
      });

    this.statusChangeSubscription = this.ngCookieService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        localStorage.setItem('CookieConsentStatus','accept')

      });

    this.revokeChoiceSubscription = this.ngCookieService.revokeChoice$.subscribe(
      () => {

      });

    this.noCookieLawSubscription = this.ngCookieService.noCookieLaw$.subscribe(
      (event: NgcNoCookieLawEvent) => {
      });
  }
  ngOnDestroy() {
    localStorage.removeItem('googleMapsLoaded')
    this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription.unsubscribe();
    this.initializingSubscription.unsubscribe();
    this.initializedSubscription.unsubscribe();
    this.initializationErrorSubscription.unsubscribe();
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
    this.noCookieLawSubscription.unsubscribe();
  }

}
