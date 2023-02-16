import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProposalCancelRequestDto } from '../../../../../dtos/proposal-cancel-request.dto';
import { ProposalGetResponseDto } from '../../../../../dtos/proposal-get-response.dto';
import { VisitCancelRequestDto } from '../../../../../dtos/visit-cancel-request.dto';
import { ProposalService } from '../../../../../service/proposal.service';
import { ScheduleService } from '../../../../../service/schedule.service';

@Component({
  selector: 'app-proposal-cancel-modal',
  templateUrl: './proposal-cancel-modal.component.html',
  styleUrls: ['./proposal-cancel-modal.component.scss']
})
export class ProposalCancelModalComponent implements OnInit {


  form: FormGroup;

  itemSelectedForCancel: ProposalGetResponseDto;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private scheduleService: ScheduleService,
    private toastrService: ToastrService,
    private proposalService: ProposalService
  ) {
    this.form = this.formBuilder.group({
      cancelvisit: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    let cancelResponse = localStorage.getItem('poposalCancel');
    this.itemSelectedForCancel = JSON.parse(cancelResponse)
  }

  confirmCancelVisitModal() {

    let request: ProposalCancelRequestDto = {
      status: 'canceled'
    }

    this.proposalService.cancelProposal(this.itemSelectedForCancel._id, request).subscribe({
      next: data => {
        this.toastrService.success('Proposta cancelada com sucesso!', '', { progressBar: true })
        this.exit();
      },
      error: error => {
        console.log(error)
      }
    })
    this.exit();
  }

  exit() {
    this.modalService.dismissAll()
  }


}
