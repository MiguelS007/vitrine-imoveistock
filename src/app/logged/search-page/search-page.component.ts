import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatamokService } from 'src/app/service/datamok.service';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  currentRoute: string | undefined;
  form: FormGroup;
  iconlikeheart = false;
  products: any = [];
  paginationProduct: number = 1;

  constructor(
    private router: Router,
    private datamokservice: DatamokService,
    private formBuilder: FormBuilder,

  ) { 
    this.form = this.formBuilder.group({
      searchwords: ['', [Validators.required]],
      localproperty: ['', [Validators.required]],
      typeproperty: ['', [Validators.required]],
      typeprice: ['', [Validators.required]],
      typebathroom: ['', [Validators.required]],
      typerooms: ['', [Validators.required]],
      typevacancies: ['', [Validators.required]],
      typeconstruction: ['', [Validators.required]],
    });
    
    }

  ngOnInit(): void {
    this.products = this.datamokservice.resultSearch;
  }
  likeHeart(){
    this.iconlikeheart = !this.iconlikeheart;
  }
}
