import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SchedulingStep7Component } from '../scheduling-step7/scheduling-step7.component';
import { ToastrService } from 'ngx-toastr';
import { UserGetResponseDto } from 'src/app/dtos/user-get-response.dtos';

@Component({
  selector: 'app-scheduling-step6',
  templateUrl: './scheduling-step6.component.html',
  styleUrls: ['./scheduling-step6.component.scss']
})
export class SchedulingStep6Component implements OnInit {
  @Input() user: UserGetResponseDto
  @Input() user_broker: UserGetResponseDto

  link = localStorage.getItem('companionLink');

  constructor(
    private modalService: NgbModal,
    private toastrService: ToastrService
    ) { }

  ngOnInit(): void {
  }

  exit() {
    this.modalService.dismissAll();
  }

  sharedIn(platform) {
    if(platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text= Gostaria de me acompanhar em uma visita a um imóvel? ${this.link}`)
    }
    if(platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?Gostaria de me acompanhar em uma visita a um imóvel?${this.link}`)
    }
    if(platform === 'copy') {
      this.copy()
    }
  }

  copy() {
    navigator.clipboard.writeText(this.link);

    this.toastrService.success('Sucesso', 'Link copiado!', {
      progressBar: true,
    });
  }

  goToStep7() {
    this.modalService.dismissAll()
    const modalRef = this.modalService.open(SchedulingStep7Component, { centered: true, backdrop: 'static', keyboard: false });
    modalRef.componentInstance.user = this.user
    modalRef.componentInstance.user_broker = this.user_broker
    localStorage.removeItem('companionLink');
  }
}
