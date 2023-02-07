import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProposalRequestDto } from 'src/app/dtos/proposal-request-dto';
import { DatamokService } from 'src/app/service/datamok.service';
import { ProposalService } from 'src/app/service/proposal.service';
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

  request: ProposalRequestDto;

  spaceCustomizeProposal: boolean = false;

  spaceCustomizeProposalChanges: boolean = true;

  spaceRemoveitem: boolean = false;

  spaceAddedItem: boolean = false;

  spaceChangeItem: boolean = false;

  spaceCustomizeProposalChangesOptions: boolean = false;

  detailfinalvalueAdd: boolean = false;

  detailfinalvalueChange: boolean = false;



  constructor(
    private formBuilder: FormBuilder,
    private datamokservice: DatamokService,
    private router: Router,
    private route: ActivatedRoute,
    private announcementService: AnnouncementService,
    private proposalService: ProposalService,
    private toastrService: ToastrService
  ) {
    this.form = this.formBuilder.group({
      faqremove: [''],
      faqAdded: [''],
      faqChange: ['']
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

  public toNumber(paremetro1: string) {
    return Number(paremetro1)
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

      this.spaceCustomizeProposal = true;
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
      if (this.response.typeOfAd === 'rent') {

        let valueTotal = this.toNumber(this.response.valueOfIptu) / 12 + this.toNumber(this.response.condominiumValue) + this.toNumber(this.response.leaseValue)

        this.request = {
          type: this.response.typeOfAd,
          rentAmount: parseFloat(this.toNumber(this.response.leaseValue).toFixed(2)),
          suggestedRentAmount: this.toNumber(this.response.leaseValue),
          iptuAmount: this.toNumber(this.response.valueOfIptu),
          condominiumAmount: this.toNumber(this.response.condominiumValue),
          rentAmountTotal: parseFloat(valueTotal.toFixed(2)),
          announcementId: this.response._id
        }
      } else {
        this.request = {
          type: this.response.typeOfAd,
          saleAmount: parseFloat(this.toNumber(this.response.saleValue).toFixed(2)),
          suggestedSaleAmount: this.toNumber(this.response.saleValue),
          saleAmountTotal: parseFloat(this.toNumber(this.response.saleValue).toFixed(2)),
          announcementId: this.response._id
        }
      }
      this.proposalService.register(this.request).subscribe({
        next: data => {
          this.toastrService.success('Proposta enviada!', '', { progressBar: true })
          this.modalsendproposalexpress = false;
        },
        error: error => {
          this.toastrService.error('Erro ao enviar proposta!', '', { progressBar: true })
        }
      })
    } else if (value === 'cancelar') {
      this.modalsendproposalexpress = false;
    }
  }

  propertyChange(value: string) {
    if (value === 'open') {
      this.spaceCustomizeProposalChanges = false;
      this.spaceCustomizeProposalChangesOptions = true;
    } else if (value === 'close') {
      this.spaceCustomizeProposalChanges = true
      this.spaceCustomizeProposalChangesOptions = false;

    }
  }

  removeItem(value: string) {
    if (value === 'open') {
      this.spaceCustomizeProposalChangesOptions = false
      this.spaceCustomizeProposalChanges = false
      this.spaceRemoveitem = true;
    } else if (value === 'close') {
      this.spaceCustomizeProposalChangesOptions = true
      this.spaceCustomizeProposalChanges = false
      this.spaceRemoveitem = false;
    } else if (value === 'submit') {

      let requestRemove = {
        type: 'removeItem',
        description: this.form.controls['faqremove'].value
      };

      sessionStorage.setItem('removeItem', JSON.stringify(requestRemove));

      setTimeout(() => {
        this.titleexpress = false;
        this.cardproduct = false;
        this.cardinfotwo = false;
        this.cardinfoone = false;
        this.btnsend = false;
        this.detailfinalvalue = true;
      }, 100);
      this.spaceCustomizeProposalChangesOptions = true
      this.spaceCustomizeProposalChanges = false
      this.spaceRemoveitem = false;
    }
  }

  addedItem(value: string) { 
    if (value === 'open') {
      this.spaceCustomizeProposalChangesOptions = false
      this.spaceCustomizeProposalChanges = false
      this.spaceAddedItem = true;
    } else if (value === 'close') {
      this.spaceCustomizeProposalChangesOptions = true
      this.spaceCustomizeProposalChanges = false
      this.spaceAddedItem = false;
    } else if (value === 'submit') {

      let requestAdded = {
        type: 'addItem',
        description: this.form.controls['faqAdded'].value
      };

      sessionStorage.setItem('addItem', JSON.stringify(requestAdded));

      setTimeout(() => {
        this.titleexpress = false;
        this.cardproduct = false;
        this.cardinfotwo = false;
        this.cardinfoone = false;
        this.btnsend = false;
        this.detailfinalvalueAdd = true;
      }, 100);
      this.spaceCustomizeProposalChangesOptions = true
      this.spaceCustomizeProposalChanges = false
      this.spaceAddedItem = false;
    }
  }

  changeItem(value) {
    if (value === 'open') {
      this.spaceCustomizeProposalChangesOptions = false
      this.spaceCustomizeProposalChanges = false
      this.spaceChangeItem = true;
    } else if (value === 'close') {
      this.spaceCustomizeProposalChangesOptions = true
      this.spaceCustomizeProposalChanges = false
      this.spaceChangeItem = false;
    } else if (value === 'submit') {

      let requestChange = {
        type: 'modifyOrReplaceItem',
        description: this.form.controls['faqChange'].value
      };

      sessionStorage.setItem('addItem', JSON.stringify(requestChange));

      setTimeout(() => {
        this.titleexpress = false;
        this.cardproduct = false;
        this.cardinfotwo = false;
        this.cardinfoone = false;
        this.btnsend = false;
        this.detailfinalvalueChange = true;
      }, 100);
      this.spaceCustomizeProposalChangesOptions = true
      this.spaceCustomizeProposalChanges = false
      this.spaceChangeItem = false;
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
