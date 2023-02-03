import { DOCUMENT } from '@angular/common';
import { Component,  Inject, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'vitrine-imoveistock';

  public selected = false;

  public div = 1;

  public scroll;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: any,
    public router: Router
    ) {}

  ngOnInit(): void {
    this.renderer.listen(window, 'scroll', ($event) => {
      this.scroll = (window.scrollY / this.div);
   })
  }

}
