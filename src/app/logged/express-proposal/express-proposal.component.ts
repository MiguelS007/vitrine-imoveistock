import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatamokService } from 'src/app/service/datamok.service';
import { AnnouncementGetResponseDto } from '../../dtos/announcement-get-response.dto';
import { AnnouncementService } from '../../service/announcement.service';

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
  modalvalue = false;
  cardproduct = true;
  titleexpress = true;
  modalpropertychange = false;
  modalremoveitem = false;
  products: any = [];
  paginationProduct: number = 1;

  response: AnnouncementGetResponseDto;

  listLikes: AnnouncementGetResponseDto[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private datamokservice: DatamokService,
    private router: Router,
    private route: ActivatedRoute,
    private announcementService: AnnouncementService
  ) {
    this.form = this.formBuilder.group({
      faqremove: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.products = this.datamokservice.resultSearch;

    this.response = this.route.snapshot.data['resolve'];
    console.log(this.response)

    this.listLike()
  }

  listLike() {
    this.announcementService.listLikes().subscribe(
      success => {
        for (let i = 0; i < success.length; i++) {
          if (success[i].announcement._id === this.response._id) {
            Object.assign(this.response, { liked: true });
          }
          this.listLikes.push(success[i].announcement)
        }
      }
    )
  }

  likeHeart(value) {

    let request = {
      announcementId: value
    }


    if (this.listLikes.length === 0) {
      this.announcementService.registerLike(request).subscribe(
        success => {
          this.listLike()
          return
        },
        error => {
          console.log(error)
        }
      )
    }

    if (this.response.liked === true) {
      this.announcementService.registerUnlike(request).subscribe(
        success => {
          this.response.liked = false
        },
        error => {
          console.error(error)
        }
      )
    } else if (this.response.liked === false) {
      this.announcementService.registerLike(request).subscribe(
        success => {
          this.response.liked = true
        },
        error => {
          console.error(error)
        }
      )
    }
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
  proposeValue(value: string) {
    if (value === 'open') {
      this.modalvalue = true;
    } else if (value === 'close') {
      this.modalvalue = false;
    }
  }

}
