import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatamokService } from 'src/app/service/datamok.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {

  form: FormGroup;
  formproperty: FormGroup;

  changeSubscription: Subscription;

  iconlikeheart = false;
  iconshare = false;
  iconprint = false;
  segment = false;
  modallogin = false;
  modalscheduling = false;
  step1scheduling = true;
  step2scheduling = false;
  step3scheduling = false;
  onlyimg: any = [];
  previewimg: any = [];
  products: any = [];
  propertyproducts: any = [];
  paginationProduct: number = 1;
  tourvirtual = false;
  propertyvideo = true;
  constructor(
    private router: Router,
    private datamokservice: DatamokService,
    private formBuilder: FormBuilder,

  ) {
    this.form = this.formBuilder.group({
      day: ['', [Validators.required]],
      time: ['', [Validators.required]],
    });
    this.formproperty = this.formBuilder.group({
      searchwords: ['', [Validators.required]],
      localproperty: ['', [Validators.required]],
      typeproperty: ['', [Validators.required]],
      typeprice: ['', [Validators.required]],
      typebathroom: ['', [Validators.required]],
      typerooms: ['', [Validators.required]],
      typevacancies: ['', [Validators.required]],
      component: ['', [Validators.required]],
      typeconstruction: ['', [Validators.required]],
      typefootagemax: ['', [Validators.required]],
      typefootagemin: ['', [Validators.required]],
    });
    this.changeSubscription = this.datamokservice.getopModalLogin().subscribe(() => {
      this.modallogin = false;
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
  segmentvideo(value: string) {
    if (value === 'video') {
      this.segment = !this.segment;
      this.propertyvideo = true;
      this.tourvirtual = false;
    } else if (value === 'tour') {
      this.segment = !this.segment;
      this.propertyvideo = false;
      this.tourvirtual = true;
    }
  }
  goExpress() {
    this.router.navigate(['logged/express']);
  }
  nextScheduling(value: string) {
    if (value === 'step1') {
      this.step1scheduling = false;
      this.step2scheduling = true;
    } else if (value === 'step2') {
      this.step2scheduling = false;
      this.step3scheduling = true;
    } else if (value === 'close') {
      this.modalscheduling = false;
      this.step1scheduling = false;
      this.step2scheduling = false;
      this.step3scheduling = false;
    } else if (value === 'viewvisits') {
      this.modalscheduling = false;
      this.step1scheduling = false;
      this.step2scheduling = false;
      this.step3scheduling = false;
      setTimeout(() => {
        this.router.navigate(['logged/visits']);
      }, 100);
    }
    // undefined
    else if (value === 'modal-logged') {
      this.modallogin = true;
    } else if (value === 'modal-scheduling') {
      this.modalscheduling = true;
      this.step1scheduling = true;
    }
  }
}