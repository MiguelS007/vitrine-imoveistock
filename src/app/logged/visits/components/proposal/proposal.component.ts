import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  response: ProposalGetResponseDto[] = [];

  selectedProposal: ProposalGetResponseDto;
  recentlySeenList: any = [];

  location = false;


  constructor(
    private proposalService: ProposalService,
    private announcementService: AnnouncementService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.listProposal();
    if(localStorage.getItem('poposalCancel') !== null) {
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
    this.proposalService.list().subscribe({
      next: data => {
        this.response = data;
        console.log(this.response)
        if (data.length > 0) {
          this.selectedProposal = data[0];
          setTimeout(() => {
            let teste = document.getElementById(data[0]._id);
            teste.classList.add('scheduling-visit-selected');
            localStorage.setItem('proposalChecked', data[0]._id)
          }, 200);
        }
        this.verifyLike()
      },
      error: error => {
        console.log(error)
      }
    })
  }

  selectProposal(item) {
    this.selectedProposal = item;
    this.verifyLike();
    let checkOld;

    let teste: any = localStorage.getItem('proposalChecked');

    if (window.screen.width < 992) {
      localStorage.setItem('proposalChecked', JSON.stringify(this.selectedProposal))
      const modalRef = this.modalService.open(ProposalSelectedModalComponent, { centered: true });
      modalRef.result.then(data => {
      }, error => {
        localStorage.removeItem('proposalChecked')
      });
    } else if (teste === item._id) {
      return
    } else {
      setTimeout(() => {
        checkOld = localStorage.getItem('proposalChecked');
      }, 100);
      let teste = document.getElementById(item._id);
      teste.classList.add('scheduling-visit-selected');
      setTimeout(() => {
        localStorage.setItem('proposalChecked', item._id)
        let removeOld = document.getElementById(checkOld);
        removeOld.classList.remove('scheduling-visit-selected')
      }, 110);
    }
  }

  verifyLike() {
    this.announcementService.listLikes().subscribe(
      success => {
        if (this.selectedProposal !== undefined) {
          for (let i = 0; i < success.length; i++) {
            if (success[i].announcement._id === this.selectedProposal.announcement._id) {
              Object.assign(this.selectedProposal.announcement, { liked: true });
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

    if (this.selectedProposal.announcement.liked === true) {
      this.announcementService.registerUnlike(request).subscribe(
        success => {
          this.selectedProposal.announcement.liked = false
        },
        error => {
          console.error(error)
        }
      )
    } else if (this.selectedProposal.announcement.liked === false || this.selectedProposal.announcement.liked === undefined) {
      this.announcementService.registerLike(request).subscribe(
        success => {
          this.selectedProposal.announcement.liked = true
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
    this.router.navigate([`logged/express/${item.announcement._id}`]);
  }

}
