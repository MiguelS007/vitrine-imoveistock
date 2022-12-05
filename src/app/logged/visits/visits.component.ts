import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatamokService } from 'src/app/service/datamok.service';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss']
})
export class VisitsComponent implements OnInit {
  form: FormGroup;

  segment = false;
  tourvirtual = false;
  confirmcancel = false;
  propertyvideo =  true;
  products: any = [];
  paginationProduct: number = 1;
  iconlikeheart = false;

  constructor(
    private formBuilder: FormBuilder,
    private datamokservice: DatamokService,
  ) { 
    this.form = this.formBuilder.group({
      cancelvisit: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.products = this.datamokservice.resultSearch;

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
  likeHeart() {
    this.iconlikeheart = !this.iconlikeheart;
  }

  cancelVisits() {
    this.confirmcancel = !this.confirmcancel;
  }
}
