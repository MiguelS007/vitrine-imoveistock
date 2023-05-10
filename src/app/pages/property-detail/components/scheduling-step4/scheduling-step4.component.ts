import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserGetResponseDto } from '../../../../dtos/user-get-response.dtos';
import { SchedulingStep5Component } from '../scheduling-step5/scheduling-step5.component';

@Component({
  selector: 'app-scheduling-step4',
  templateUrl: './scheduling-step4.component.html',
  styleUrls: ['./scheduling-step4.component.scss']
})
export class SchedulingStep4Component implements OnInit {
  @Input() user: UserGetResponseDto

  urls: string[] = [];

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    if (this.user?.photo?.location)
      this.urls = [this.user.photo.location]
  }

  exit() {
    this.modalService.dismissAll();
  }

  confirm() {
    localStorage.setItem('user-broker', this.user.name)
    this.modalService.dismissAll()
    this.modalService.open(SchedulingStep5Component, { centered: true, backdrop: 'static', keyboard: false });
  }

}
