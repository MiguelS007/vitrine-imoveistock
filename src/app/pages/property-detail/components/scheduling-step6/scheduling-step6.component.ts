import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SchedulingStep7Component } from '../scheduling-step7/scheduling-step7.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-scheduling-step6',
  templateUrl: './scheduling-step6.component.html',
  styleUrls: ['./scheduling-step6.component.scss']
})
export class SchedulingStep6Component implements OnInit {

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
      window.open(`facebook://send?text=${this.link}`)
    }
    if(platform === 'copy') {
      this.copy()
    }
  }

  copy() {
    navigator.clipboard.writeText(this.link);

    this.toastrService.success('Sucesso', 'Código para compartilhamento copiado!', {
      progressBar: true,
    });
  }

  goToStep7() {
    this.modalService.dismissAll()
    this.modalService.open(SchedulingStep7Component, { centered: true, backdrop: 'static', keyboard: false });
    localStorage.removeItem('companionLink');
  }


}
