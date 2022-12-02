import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatamokService } from 'src/app/service/datamok.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {

  form: FormGroup;
  iconlikeheart = false;
  iconshare = false;
  iconprint = false;
  segment = false;
  step1scheduling = true;
  step2scheduling = false;
  step3scheduling = false;
  onlyimg: any = [];
  previewimg: any = [];
  products: any = [];
  propertyproducts: any = [];
  paginationProduct: number = 1;

  constructor(
    private router: Router,
    private datamokservice: DatamokService,
    private formBuilder: FormBuilder,

  ) {
    this.form = this.formBuilder.group({
      day: ['', [Validators.required]],
      time: ['', [Validators.required]],
    });

  }
  ngOnInit(): void {
    this.onlyimg = this.datamokservice.onlypreview;
    this.previewimg = this.datamokservice.imagespreview;
    this.propertyproducts = this.datamokservice.exclusiveProperties;
    this.products = this.datamokservice.resultSearch;

  }
  btninteractionimg(value: string) {
    if (value === 'like') {
      this.iconlikeheart = !this.iconlikeheart;
    } else if (value === 'share') {
      this.iconshare = !this.iconshare;
    } else if (value === 'print') {
      this.iconprint = !this.iconprint;
      window.print();
    }
  }
  likeHeart() {
    this.iconlikeheart = !this.iconlikeheart;
  }
  segmentvideo() {
    this.segment = !this.segment;
  }
  nextScheduling(value: string) {
    if (value === 'step1') {
      this.step1scheduling = false;
      this.step2scheduling = true;
    }else if (value === 'step'){
      this.step2scheduling = false;
      this.step3scheduling = true;
    }else if (value === 'close'){
      this.step1scheduling = false;
      this.step2scheduling = false;
      this.step3scheduling = false;
    }
    else if (value === 'open'){
      this.step1scheduling = true;
      this.step2scheduling = false;
      this.step3scheduling = false;
    }
  }
}