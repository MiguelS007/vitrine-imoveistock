import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProposalGetResponseDto } from '../../../../../dtos/proposal-get-response.dto';
import { AnnouncementService } from '../../../../../service/announcement.service';
import { ProposalCancelModalComponent } from '../proposal-cancel-modal/proposal-cancel-modal.component';

@Component({
  selector: 'app-proposal-selected-modal',
  templateUrl: './proposal-selected-modal.component.html',
  styleUrls: ['./proposal-selected-modal.component.scss']
})
export class ProposalSelectedModalComponent implements OnInit {

  selectedProposal: ProposalGetResponseDto;
  recentlySeenList: any = [];

  location = false;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private announcementService: AnnouncementService
  ) { }

  ngOnInit(): void {
    let selectedProposal = localStorage.getItem('proposalChecked');
    this.selectedProposal = JSON.parse(selectedProposal)
  }

  public toNumber(paremetro1: string) {
    return Number(paremetro1)
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

    this.modalService.dismissAll();

    this.router.navigate([`announcement/detail/${value}`]);

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
    } else if (this.selectedProposal.announcement.liked === false) {
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

  cancelVisits(value: string) {
    // if (value === 'cancelmodal') {
    //   this.confirmcancel = !this.confirmcancel;
    // } else if (value === 'cancel') {
    //   this.location = true;
    // }
    this.exit()
  }

  exit() {
    this.modalService.dismissAll()
  }
  

  goExpress(item) {
    this.router.navigate([`logged/express/${item.announcement._id}`]);
    this.exit();
  }

  cancelProposal(item) {
    localStorage.setItem('poposalCancel', JSON.stringify(item));
    this.exit()

    const modalRef = this.modalService.open(ProposalCancelModalComponent, { centered: true });
      modalRef.result.then(data => {
      }, error => {
        localStorage.removeItem('poposalCancel')
      });
  }


}
