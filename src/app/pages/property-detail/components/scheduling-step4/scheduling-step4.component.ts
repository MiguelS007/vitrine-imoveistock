import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-scheduling-step4',
  templateUrl: './scheduling-step4.component.html',
  styleUrls: ['./scheduling-step4.component.css']
})
export class SchedulingStep4Component implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  exit() {
    this.modalService.dismissAll()
  }

}
