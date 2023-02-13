<<<<<<< HEAD
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgcCookieConsentService, NgcInitializingEvent, NgcInitializationErrorEvent, NgcStatusChangeEvent, NgcNoCookieLawEvent } from 'ngx-cookieconsent';
=======
import { Component} from '@angular/core';
import {  NgcCookieConsentService,
  NgcInitializationErrorEvent,
  NgcInitializingEvent, NgcNoCookieLawEvent,
  NgcStatusChangeEvent} from "ngx-cookieconsent";
>>>>>>> 0471646b8be812b336a05b2b5569f6c8bcd7c720
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
<<<<<<< HEAD
export class AppComponent implements OnInit, OnDestroy {

  title = 'vitrine-imoveistock';
    private popupOpenSubscription!: Subscription;
    private popupCloseSubscription!: Subscription;
    private initializingSubscription!: Subscription;
    private initializedSubscription!: Subscription;
    private initializationErrorSubscription!: Subscription;
    private statusChangeSubscription!: Subscription;
    private revokeChoiceSubscription!: Subscription;
    private noCookieLawSubscription!: Subscription;
    constructor(
      private ngCookieService: NgcCookieConsentService,
    ) {}
    ngOnInit(){
      this.popupOpenSubscription = this.ngCookieService.popupOpen$.subscribe(
        () => {
          this.ngCookieService.init(this.ngCookieService.getConfig())
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
=======
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
  constructor(private ngCookieService: NgcCookieConsentService,
  ) {
  }
  ngOnInit(){
    // subscribe to cookieconsent observables to react to main events
    this.popupOpenSubscription = this.ngCookieService.popupOpen$.subscribe(
      () => {
        this.ngCookieService.init(this.ngCookieService.getConfig())
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
>>>>>>> 0471646b8be812b336a05b2b5569f6c8bcd7c720
