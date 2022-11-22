import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {
  form: FormGroup;
  public maskCpf: Array<any> = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  collapsed = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      typeProperty: ['', [Validators.required]],
      propertyPaidOff: ['', [Validators.required]],
      debitBalance: ['', [Validators.required]],
      relationshipWithTheProperty: ['', [Validators.required]],
      ownerName: ['', [Validators.required]],
      ownerCpf: ['', [Validators.required]],
    });
  }

  ngOnInit() {

  }

  buyOption(value: string) {
    if (value === 'buy') {
      this.collapsed = false;
    } else if (value === 'rent') {
      this.collapsed = true;
    }
  }
}
