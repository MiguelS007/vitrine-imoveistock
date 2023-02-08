import { DOCUMENT } from '@angular/common';
import { Component,  Inject, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vitrine-imoveistock';

  constructor() {}

}
