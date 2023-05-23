import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProposalGetByIdResponseDto } from 'src/app/dtos/proposal-get-by-id-response.dto';
import { ProposalGetResponseDto } from '../../../../dtos/proposal-get-response.dto';
import { AnnouncementService } from '../../../../service/announcement.service';
import { ProposalService } from '../../../../service/proposal.service';
import { ProposalCancelModalComponent } from './proposal-cancel-modal/proposal-cancel-modal.component';
import { ProposalSelectedModalComponent } from './proposal-selected-modal/proposal-selected-modal.component';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss']
})
export class ProposalComponent implements OnInit {

  @ViewChildren('proposals') proposalsList: QueryList<any>;


  response: ProposalGetResponseDto[] = [];

  selectedProposal: ProposalGetByIdResponseDto;

  recentlySeenList: any = [];

  location = false;

  contador: number = 0;

  constructor(
    private proposalService: ProposalService,
    private announcementService: AnnouncementService,
    private router: Router,
    private modalService: NgbModal,
    private ngxSpinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.listProposal();
    if (localStorage.getItem('poposalCancel') !== null) {
      localStorage.removeItem('poposalCancel')
    }
  }

  public toNumber(paremetro1: string) {
    return Number(paremetro1)
  }

  cancelProposal(item) {
    localStorage.setItem('poposalCancel', JSON.stringify(item));

    console.log()

    const modalRef = this.modalService.open(ProposalCancelModalComponent, { centered: true });
    modalRef.result.then(data => {
    }, error => {
      localStorage.removeItem('poposalCancel');
      this.listProposal()
    });
  }

  listProposal() {
    this.contador = 0;
    this.ngxSpinnerService.show();
    this.proposalService.list().subscribe({
      next: data => {
        this.response = data;
        if (data.length > 0) {
          this.proposalService.getById(data[0]._id).subscribe({
            next: success => {
              setTimeout(() => {
                this.selectedProposal = success;
                this.selecionarProposta(data[0])
              }, 100);
            },
            error: error => {
              console.error(error)
            }
          })

        }
        this.verifyLike()
        this.ngxSpinnerService.hide();

      },
      error: error => {
        console.error(error)
        this.ngxSpinnerService.hide();

      }
    })
  }

  // selectProposal(item) {
  //   this.selectedProposal = item;
  //   this.verifyLike();
  //   let checkOld;

  //   let teste: any = localStorage.getItem('proposalChecked');

  //   if (window.screen.width < 992) {
  //     localStorage.setItem('proposalChecked', JSON.stringify(this.selectedProposal))
  //     const modalRef = this.modalService.open(ProposalSelectedModalComponent, { centered: true });
  //     modalRef.result.then(data => {
  //     }, error => {
  //       localStorage.removeItem('proposalChecked')
  //     });
  //   } else if (teste === item.proposal._id) {
  //     return
  //   } else {
  //     setTimeout(() => {
  //       checkOld = localStorage.getItem('proposalChecked');
  //     }, 100);
  //     let teste = document.getElementById(item.proposal._id);
  //     teste.classList.add('scheduling-visit-selected');
  //     setTimeout(() => {
  //       localStorage.setItem('proposalChecked', item.proposal._id)
  //       let removeOld = document.getElementById(checkOld);
  //       removeOld.classList.remove('scheduling-visit-selected')
  //     }, 110);
  //   }
  // }

  verifyLike() {
    this.announcementService.listLikes().subscribe(
      success => {
        if (this.selectedProposal !== undefined) {
          for (let i = 0; i < success.length; i++) {
            if (success[i].announcement._id === this.selectedProposal.proposal.announcement._id) {
              Object.assign(this.selectedProposal.proposal.announcement, { liked: true });
            }
          }
        }
      }
    )
  }

  likeHeart(value) {

    let request = {
      announcementId: value
    }

    if (this.selectedProposal.proposal.announcement.liked === true) {
      this.announcementService.registerUnlike(request).subscribe(
        success => {
          this.selectedProposal.proposal.announcement.liked = false
        },
        error => {
          console.error(error)
        }
      )
    } else if (this.selectedProposal.proposal.announcement.liked === false || this.selectedProposal.proposal.announcement.liked === undefined) {
      this.announcementService.registerLike(request).subscribe(
        success => {
          this.selectedProposal.proposal.announcement.liked = true
        },
        error => {
          console.error(error)
        }
      )
    }


  }

  announcementSelected(value) {
    localStorage.setItem('recentlySeen', JSON.stringify(this.recentlySeenList));
    let teste: any = localStorage.getItem('recentlySeen');
    this.recentlySeenList = JSON.parse(teste);


    let verify = { _id: value };

    let list: any = this.recentlySeenList;

    if (list === null) {
      list = [];
    }

    if (this.recentlySeenList !== null) {
      for (let i = 0; i < list.length; i++) {
        if (list[i]._id === value) {
          return
        }
      }
    }

    list.push(verify);

    this.recentlySeenList = list;

    this.router.navigate([`announcement/detail/${value}`]);



  }

  goExpress(item) {
    localStorage.setItem('counterProposalInProposal', item._id)
    this.router.navigate([`logged/express/${item.announcement._id}`]);
    
  }

  selecionarProposta(item) {
    this.proposalsList.map(results => {
      if (results.nativeElement?.id === item._id) {
        results.nativeElement.className = 'scheduling-visit-selected w-100 h-auto bg-white box-shadow border-radius-10 mb-4 p-4';
        
        if (window.screen.width < 992) {
          this.contador++;
          if (this.contador > 1) {
            const modalRef = this.modalService.open(ProposalSelectedModalComponent, { centered: true });
            modalRef.componentInstance.selectedProposal = item;
            modalRef.result.then(data => {
            }, error => {
              this.listProposal()
            });
          }
        }
        this.ngxSpinnerService.show()

        this.proposalService.getById(item._id).subscribe({
          next: success => {
            this.selectedProposal = success;
            this.ngxSpinnerService.hide()
          },
          error: error => {
            console.error(error)
            this.ngxSpinnerService.hide()
          }
        })

      } else {
        results.nativeElement.className = 'w-100 h-auto bg-white box-shadow border-radius-10 mb-4 p-4';
      }
    });
  }

}
