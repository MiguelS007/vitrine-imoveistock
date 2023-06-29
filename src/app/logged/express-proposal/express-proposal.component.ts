import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProposalGetByIdResponseDto } from 'src/app/dtos/proposal-get-by-id-response.dto';
import { ProposalRequestDto } from 'src/app/dtos/proposal-request-dto';
import { DatamokService } from 'src/app/service/datamok.service';
import { ProposalService } from 'src/app/service/proposal.service';
import { AnnouncementGetResponseDto } from '../../dtos/announcement-get-response.dto';
import { ProposalGetResponseDto } from '../../dtos/proposal-get-response.dto';
import { AnnouncementService } from '../../service/announcement.service';

@Component({
  selector: 'app-express-proposal',
  templateUrl: './express-proposal.component.html',
  styleUrls: ['./express-proposal.component.scss']
})
export class ExpressProposalComponent implements OnInit {
  @ViewChild("inputRemove", { read: ElementRef }) inputRemove: ElementRef;
  @ViewChild("inputChange", { read: ElementRef }) inputChange: ElementRef;
  @ViewChild("inputAdd", { read: ElementRef }) inputAdd: ElementRef;

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

  proposalResponse: ProposalGetByIdResponseDto;

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

  formCustomizeProposal: FormGroup;

  acceptVehicle: boolean = false;
  valueVehicle: number = 0;

  acceptProperty: boolean = false;
  valueProperty: number = 0;

  acceptFinancing: boolean = false;
  valueFinancing: number = 0;

  acceptInstallment: boolean = false;
  valueInstallment: number = 0;

  changesRequest: any = [];

  sendRescheduling: boolean = false;

  bothSelectType: string;

  requireRent: number;

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

    this.formCustomizeProposal = this.formBuilder.group({
      suggestedRentAmount: [''],
      suggestedSaleAmount: [''],
      saleCarAsPaymentAmount: [''],
      salePropertyAsPaymentAmount: [''],
      saleDirectInstallmentAsPaymentAmount: [''],
      saleFinancingAsPaymentAmount: [''],
      comment: ['']
    })
  }

  ngOnInit(): void {
    this.products = this.datamokservice.resultSearch;

    this.response = this.route.snapshot.data['resolve'];

    this.listLike();

    this.formCustomizeProposal.patchValue({
      suggestedRentAmount: this.response.leaseValue,
      suggestedSaleAmount: this.response.saleValue
    });

    for (let i = 0; i < this.response.paymentMethods.length; i++) {
      if (this.response.paymentMethods[i].type === 'property') {
        this.acceptProperty = true;
        this.formCustomizeProposal.patchValue({
          salePropertyAsPaymentAmount: 0
        })
      }

      if (this.response.paymentMethods[i].type === 'vehicle') {
        this.acceptVehicle = true;
        this.formCustomizeProposal.patchValue({
          saleCarAsPaymentAmount: 0
        })
      }

      if (this.response.paymentMethods[i].type === 'financing') {
        this.acceptFinancing = true;
        this.formCustomizeProposal.patchValue({
          saleFinancingAsPaymentAmount: 0
        })
      }

      if (this.response.paymentMethods[i].type === 'installment') {
        this.acceptInstallment = true
        this.formCustomizeProposal.patchValue({
          saleDirectInstallmentAsPaymentAmount: 0
        })
      }
    }

    // this.proposalService.getByAnnouncement(this.response._id).subscribe({
    //   next: data => {
    //     if (data.length > 0) {
    //       console.log(data[0], 'teste teste 6')
    //       this.proposalResponse = data[0];

    //       console.log(this.proposalResponse)
    //       // for (let i = 0; i < data.length; i++) {
    //       //   if (data[i].announcement._id === this.response._id) {
    //       //     this.sendRescheduling = true;
    //       //     this.proposalResponse = data[i];
    //       //     console.log(this.proposalResponse, 'proposal response')
    //       //   }
    //       // }
    //     }
    //   }
    // })

    if (localStorage.getItem('counterProposalInProposal') !== null) {
      this.proposalService.getById(localStorage.getItem('counterProposalInProposal')).subscribe({
        next: data => {
          this.sendRescheduling = true;
          this.proposalResponse = data;
        }
      })
    }

    if (this.response.typeOfAd === 'both' && localStorage.getItem('bothProposalType') !== null) {
      this.bothSelectType = localStorage.getItem('bothProposalType');
    } else if (this.response.typeOfAd === 'both' && localStorage.getItem('bothProposalType') === null) {
      this.bothSelectType = 'sale'
    }

    this.calcValue()

  }

  ngOnDestroy() {
    if (localStorage.getItem('bothProposalType') !== null) {
      localStorage.removeItem('bothProposalType')
    }

    if (localStorage.getItem('counterProposalInProposal') !== null) {
      localStorage.removeItem('counterProposalInProposal')
    }
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
          console.error(error)
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
      window.scrollTo(0, 1000);
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
      } else if (this.response.typeOfAd === 'sale') {
        this.request = {
          type: this.response.typeOfAd,
          saleAmount: parseFloat(this.toNumber(this.response.saleValue).toFixed(2)),
          suggestedSaleAmount: this.toNumber(this.response.saleValue),
          saleAmountTotal: parseFloat(this.toNumber(this.response.saleValue).toFixed(2)),
          announcementId: this.response._id
        }
      } else if (this.response.typeOfAd === 'both') {
        if (this.bothSelectType === 'sale') {
          this.request = {
            type: this.bothSelectType,
            saleAmount: parseFloat(this.toNumber(this.response.saleValue).toFixed(2)),
            suggestedSaleAmount: this.toNumber(this.response.saleValue),
            saleAmountTotal: parseFloat(this.toNumber(this.response.saleValue).toFixed(2)),
            announcementId: this.response._id
          }
        } else {
          let valueTotal = this.toNumber(this.response.valueOfIptu) / 12 + this.toNumber(this.response.condominiumValue) + this.toNumber(this.response.leaseValue)

          this.request = {
            type: this.bothSelectType,
            rentAmount: parseFloat(this.toNumber(this.response.leaseValue).toFixed(2)),
            suggestedRentAmount: this.toNumber(this.response.leaseValue),
            iptuAmount: this.toNumber(this.response.valueOfIptu),
            condominiumAmount: this.toNumber(this.response.condominiumValue),
            rentAmountTotal: parseFloat(valueTotal.toFixed(2)),
            announcementId: this.response._id
          }
        }
      }
      
      if (this.proposalResponse?.proposal) {
        this.sendCounterProposal(this.request)
      } else {
        this.sendProposal(this.request)
      }
      // this.proposalService.register(this.request).subscribe({
      //   next: data => {
      //     this.toastrService.success('Proposta enviada!', '', { progressBar: true })
      //     this.modalsendproposalexpress = false;
      //   },
      //   error: error => {
      //     this.toastrService.error('Erro ao enviar proposta!', '', { progressBar: true })
      //   }
      // })
    } else if (value === 'cancelar') {
      this.modalsendproposalexpress = false;
    }
  }

  calcValue() {
    let calcRent = this.toNumber(this.response.leaseValue) + this.toNumber(this.response.condominiumValue) + (this.toNumber(this.response.valueOfIptu) / 12)

    this.requireRent = calcRent * 4

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

  removeMudanca(tipo: string) {
    this.changesRequest.forEach((value, index) => {
      if (value.type == tipo) {
        this.changesRequest.splice(index, 1);
        if (tipo == 'addItem') {
          this.addedItem('close')
          setTimeout(() => {
            this.titleexpress = false;
            this.cardproduct = false;
            this.cardinfotwo = false;
            this.cardinfoone = false;
            this.btnsend = false;
            this.detailfinalvalueAdd = false;
          }, 100);
          this.spaceCustomizeProposalChangesOptions = true
          this.spaceCustomizeProposalChanges = false
          this.spaceAddedItem = false;
        }
        if (tipo == 'removeItem') {
          this.removeItem('close');
          setTimeout(() => {
            this.titleexpress = false;
            this.cardproduct = false;
            this.cardinfotwo = false;
            this.cardinfoone = false;
            this.btnsend = false;
            this.detailfinalvalue = false;
          }, 100);
          this.spaceCustomizeProposalChangesOptions = true
          this.spaceCustomizeProposalChanges = false
          this.spaceRemoveitem = false;
        }
        if (tipo == 'modifyOrReplaceItem') {
          this.changeItem('close');
          setTimeout(() => {
            this.titleexpress = false;
            this.cardproduct = false;
            this.cardinfotwo = false;
            this.cardinfoone = false;
            this.btnsend = false;
            this.detailfinalvalueChange = false;
          }, 100);
          this.spaceCustomizeProposalChangesOptions = true
          this.spaceCustomizeProposalChanges = false
          this.spaceChangeItem = false;

        }
      };
    });
  }

  removeItem(value: string) {
    if (value === 'open') {
      this.spaceCustomizeProposalChangesOptions = false
      this.spaceCustomizeProposalChanges = false
      this.spaceRemoveitem = true;
      setTimeout(() => {
        this.inputRemove.nativeElement.focus()
      }, 100);
    } else if (value === 'close') {
      this.spaceCustomizeProposalChangesOptions = true
      this.spaceCustomizeProposalChanges = false
      this.spaceRemoveitem = false;
    } else if (value === 'submit') {

      let requestRemove = {
        type: 'removeItem',
        description: this.form.controls['faqremove'].value
      };

      this.changesRequest.push(requestRemove)

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
      this.spaceCustomizeProposalChanges = false;
      setTimeout(() => {
        this.inputAdd.nativeElement.focus()
      }, 100);
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

      this.changesRequest.push(requestAdded)

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
      this.spaceCustomizeProposalChanges = false;

      setTimeout(() => {
        this.inputChange.nativeElement.focus()
      }, 100);
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

      this.changesRequest.push(requestChange)

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
    } else if (value === 'submit') {
      if (this.acceptProperty) {
        this.valueProperty = this.formCustomizeProposal.controls['salePropertyAsPaymentAmount'].value
      }

      if (this.acceptVehicle) {
        this.valueVehicle = this.formCustomizeProposal.controls['saleCarAsPaymentAmount'].value
      }

      if (this.acceptFinancing) {
        this.valueFinancing = this.formCustomizeProposal.controls['saleFinancingAsPaymentAmount'].value
      }

      if (this.acceptInstallment) {
        this.valueInstallment = this.formCustomizeProposal.controls['saleDirectInstallmentAsPaymentAmount'].value
      }
      this.modalvalue = false;
    }
  }

  send() {
    if (this.response.typeOfAd === 'sale') {

      this.request = {
        type: 'sale',
        iptuAmount: this.toNumber(this.response.valueOfIptu),
        condominiumAmount: this.toNumber(this.response.condominiumValue),
        saleAmount: this.toNumber(this.response.saleValue),
        suggestedSaleAmount: this.formCustomizeProposal.controls['suggestedSaleAmount'].value,
        saleAmountTotal: this.toNumber(this.formCustomizeProposal.controls['suggestedSaleAmount'].value) + this.valueProperty + this.valueVehicle + this.valueFinancing + this.valueInstallment,
        saleCarAsPaymentAmount: this.valueVehicle,
        salePropertyAsPaymentAmount: this.valueProperty,
        saleDirectInstallmentAsPaymentAmount: this.valueInstallment,
        saleFinancingAsPaymentAmount: this.valueFinancing,
        changes: this.changesRequest,
        comment: this.formCustomizeProposal.controls['comment'].value,
        announcementId: this.response._id
      }

      if (this.sendRescheduling) {
        this.sendCounterProposal(this.request)
      } else {
        this.sendProposal(this.request)
      }
    } else if (this.response.typeOfAd === 'rent') {

      let valueTotal = this.toNumber(this.response.valueOfIptu) / 12 + this.toNumber(this.response.condominiumValue) + this.toNumber(this.response.leaseValue)

      this.request = {
        type: 'rent',
        iptuAmount: this.toNumber(this.response.valueOfIptu),
        condominiumAmount: this.toNumber(this.response.condominiumValue),
        rentAmount: parseFloat(this.toNumber(this.response.leaseValue).toFixed(2)),
        suggestedRentAmount: this.toNumber(this.formCustomizeProposal.controls['suggestedRentAmount'].value),
        rentAmountTotal: parseFloat(valueTotal.toFixed(2)),
        changes: this.changesRequest,
        comment: this.formCustomizeProposal.controls['comment'].value,
        announcementId: this.response._id
      }


      if (this.proposalResponse?.proposal) {
        this.sendCounterProposal(this.request)
      } else {
        this.sendProposal(this.request)
      }
    } else if (this.response.typeOfAd === 'both') {
      if (this.bothSelectType === 'sale') {
        this.request = {
          type: 'sale',
          iptuAmount: this.toNumber(this.response.valueOfIptu),
          condominiumAmount: this.toNumber(this.response.condominiumValue),
          saleAmount: this.toNumber(this.response.saleValue),
          suggestedSaleAmount: this.formCustomizeProposal.controls['suggestedSaleAmount'].value,
          saleAmountTotal: this.toNumber(this.formCustomizeProposal.controls['suggestedSaleAmount'].value) + this.valueProperty + this.valueVehicle + this.valueFinancing + this.valueInstallment,
          saleCarAsPaymentAmount: this.valueVehicle,
          salePropertyAsPaymentAmount: this.valueProperty,
          saleDirectInstallmentAsPaymentAmount: this.valueInstallment,
          saleFinancingAsPaymentAmount: this.valueFinancing,
          changes: this.changesRequest,
          comment: this.formCustomizeProposal.controls['comment'].value,
          announcementId: this.response._id
        }

        if (this.sendRescheduling) {
          this.sendCounterProposal(this.request)
        } else {
          this.sendProposal(this.request)
        }
      } else if (this.bothSelectType === 'rent') {
        let valueTotal = this.toNumber(this.response.valueOfIptu) / 12 + this.toNumber(this.response.condominiumValue) + this.toNumber(this.response.leaseValue)

        this.request = {
          type: 'rent',
          iptuAmount: this.toNumber(this.response.valueOfIptu),
          condominiumAmount: this.toNumber(this.response.condominiumValue),
          rentAmount: parseFloat(this.toNumber(this.response.leaseValue).toFixed(2)),
          suggestedRentAmount: this.toNumber(this.formCustomizeProposal.controls['suggestedRentAmount'].value),
          rentAmountTotal: parseFloat(valueTotal.toFixed(2)),
          changes: this.changesRequest,
          comment: this.formCustomizeProposal.controls['comment'].value,
          announcementId: this.response._id
        }

        if (this.proposalResponse?.proposal) {
          this.sendCounterProposal(this.request)
        } else {
          this.sendProposal(this.request)
        }
      }
    }
    this.router.navigate(['logged/visits']);
  }


  sendProposal(request) {
    console.log('request sendProposal', request);

    this.modalsendproposalexpress = false;
    this.modalcustomizedproposal = false;
    
    this.proposalService.register(request).subscribe({
      next: data => {
        this.toastrService.success('Proposta enviada!', '', { progressBar: true });
        this.ngOnInit()
      },
      error: error => {
        this.toastrService.error('Erro ao enviar proposta!', '', { progressBar: true });
      }
    })
  }

  sendCounterProposal(request) {
    console.log('request sendCounterProposal', request);

    this.modalsendproposalexpress = false;
    this.modalcustomizedproposal = false;

    Object.assign(this.request, { parentProposalId: this.proposalResponse?.counterProposal?._id  || this.proposalResponse?.proposal?._id })
    this.proposalService.counterProposal(this.request).subscribe({
      next: data => {
        this.toastrService.success('Contra proposta enviada!', '', { progressBar: true });
        this.ngOnInit();
        localStorage.removeItem('counterProposalInProposal')
      },
      error: error => {
        if (error?.error?.errors === 'there is no proposal denied') {
          this.toastrService.error('Ja existe uma proposta em negociação neste anúncio!', '', { progressBar: true });
        } else {
          this.toastrService.error('Erro ao enviar contra proposta!', '', { progressBar: true });
        }
      }
    })
  }

  announcementSelected(value) {
    this.router.navigate([`announcement/detail/${value}`]);
  }

}
