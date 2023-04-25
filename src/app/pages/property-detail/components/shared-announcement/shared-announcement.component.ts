import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shared-announcement',
  templateUrl: './shared-announcement.component.html',
  styleUrls: ['./shared-announcement.component.scss']
})
export class SharedAnnouncementComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
  }

  exit() {
    this.modalService.dismissAll()
  }

  sharedIn(platform) {
    if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?Olha este anuncio que encontrei na imoveistock ${window.location.href}=`, '_blank')
    }
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=Olha este anuncio que encontrei na imoveistock ${window.location.href}`, '_blank')
    }
    if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=Olha este anuncio que encontrei na imoveistock ${window.location.href}`, '_blank')
    }
    if (platform === 'linkedin') {
      window.open('http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(window.location.href) + '&title=' + encodeURIComponent('teste'), '_blank')
    }

    if(platform === 'copy') {
      this.copyToClipboard()
    }

    this.exit()
  }

  copyToClipboard() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = window.location.href;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.toastrService.success('Sucesso', 'Código para compartilhamento copiado!', {
      progressBar: true,
    });
  }

}
