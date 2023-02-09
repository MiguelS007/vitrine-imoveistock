import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-proposal-cancel-modal',
  templateUrl: './proposal-cancel-modal.component.html',
  styleUrls: ['./proposal-cancel-modal.component.scss']
})
export class ProposalCancelModalComponent implements OnInit {


  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    this.form = this.formBuilder.group({
      cancelvisit: ['', [Validators.required]],
    });
   }

  ngOnInit(): void {
  }

  confirmCancelVisitModal() {

    // let request: VisitCancelRequestDto = {
    //   cancelationReason: this.form.controls['cancelvisit'].value
    // }

    // this.scheduleService.cancelVisit(this.itemSelectedForCancel._id, request).subscribe({
    //   next: data => {
    //     this.schedulesList()
    //   },
    //   error: error => {
    //     console.log(error)
    //   }
    // })
    this.exit();
  }

  exit() {
    this.modalService.dismissAll()
  }
  

}
