import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SchedulingStep7Component } from '../scheduling-step7/scheduling-step7.component';

@Component({
  selector: 'app-scheduling-step6',
  templateUrl: './scheduling-step6.component.html',
  styleUrls: ['./scheduling-step6.component.scss']
})
export class SchedulingStep6Component implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  exit() {
    this.modalService.dismissAll();
  }

  goToStep7() {
    this.modalService.dismissAll()
    this.modalService.open(SchedulingStep7Component, { centered: true, backdrop: 'static', keyboard: false});
  }

}
