import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AnnouncementService } from 'src/app/service/announcement.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  noregisteredvisit = false;
  listofvisits = true;
  response: any[] = [];
  recentlySeenList: any = [];


  constructor(
    private router: Router,
    private announcementService: AnnouncementService,
    private ngxSpinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.list()
  }

  list() {
    this.ngxSpinnerService.show();

    this.response = []


    this.announcementService.listLikes().subscribe(
      success => {
        for (let i = 0; i < success.length; i++) {
          this.response.push(success[i].announcement);
          Object.assign(this.response[i], { liked: true });
        }
        this.ngxSpinnerService.hide()
      },
      error => {
        console.error(error);
        this.ngxSpinnerService.hide()
      }
    )
  }

  announcementSelected(value) {
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


    localStorage.setItem('recentlySeen', JSON.stringify(this.recentlySeenList));
    this.router.navigate([`announcement/detail/${value}`])

  }

  likeHeart(value) {

    let request = {
      announcementId: value
    }

    for (let i = 0; i < this.response.length; i++) {
      if (this.response[i]._id === value) {
        this.announcementService.registerUnlike(request).subscribe(
          success => {
            setTimeout(() => {
              this.list()
            }, 1000);
          },
          error => {
            console.error(error)
          }
        )
      }
    }

  }

}
