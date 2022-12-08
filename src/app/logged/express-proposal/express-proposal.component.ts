import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatamokService } from 'src/app/service/datamok.service';

@Component({
  selector: 'app-express-proposal',
  templateUrl: './express-proposal.component.html',
  styleUrls: ['./express-proposal.component.scss']
})
export class ExpressProposalComponent implements OnInit {
  form: FormGroup;
  iconlikeheart = false;
  modalcustomizedproposal = false;
  modalsendproposalexpress = false;
  qtdcomments: number = 0;
  modalwarning = true;
  btnsend = true;
  cardinfotwo = true;
  cardinfoone = true;
  detailfinalvalue = false;
  cardproduct = true;
  titleexpress = true;
  modalpropertychange = false;
  modalremoveitem = false;
  products: any = [];
  paginationProduct: number = 1;
  constructor(
    private formBuilder: FormBuilder,
    private datamokservice: DatamokService,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      faqremove: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.products = this.datamokservice.resultSearch;

  }

  likeHeart() {
    this.iconlikeheart = !this.iconlikeheart;
  }

  customizedProposal(value: string) {
    if (value === 'open') {
      this.modalcustomizedproposal = true;
      this.modalwarning = true;
    } else if (value === 'close') {
      this.modalcustomizedproposal = false;
      this.modalsendproposalexpress = false;
      this.modalpropertychange = false;
      this.modalremoveitem = false;
    }
  }
  sendProposalExpress(value: string) {
    if (value === 'open') {
      this.modalsendproposalexpress = true;
    } else if (value === 'close') {
      this.modalsendproposalexpress = false;
    } else if (value === 'confirm') {
      this.modalsendproposalexpress = false;
    } else if (value === 'cancelar') {
      this.modalsendproposalexpress = false;
    }
  }
  propertyChange(value: string) {
    if (value === 'open') {
      this.modalpropertychange = true;
      this.modalwarning = false;
    } else if (value === 'close') {
      this.modalpropertychange = false;
      this.modalwarning = true;
    }
  }
  removeItem(value: string) {
    if (value === 'open') {
      this.modalwarning = false;
      this.modalpropertychange = false;
      this.modalremoveitem = true;
    } else if (value === 'close') {
      this.modalwarning = true;
      this.modalremoveitem = false;
    } else if (value === 'submit') {
      setTimeout(() => {
        this.titleexpress = false;
        this.cardproduct = false;
        this.cardinfotwo = false;
        this.cardinfoone = false;
        this.btnsend = false;
        this.detailfinalvalue = true;
      }, 100);
      this.modalcustomizedproposal = false;
    }
  }

}
