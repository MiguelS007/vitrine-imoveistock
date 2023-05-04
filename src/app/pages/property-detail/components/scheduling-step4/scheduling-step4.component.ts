import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SchedulingStep5Component } from '../scheduling-step5/scheduling-step5.component';

@Component({
  selector: 'app-scheduling-step4',
  templateUrl: './scheduling-step4.component.html',
  styleUrls: ['./scheduling-step4.component.scss']
})
export class SchedulingStep4Component implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  exit() {
    this.modalService.dismissAll();
  }

  confirm() {
    this.modalService.dismissAll()
    this.modalService.open(SchedulingStep5Component, { centered: true, backdrop: 'static', keyboard: false});
  }

}
