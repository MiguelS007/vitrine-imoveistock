import { Component, OnInit } from '@angular/core';
import {AnnouncementService} from '../../../service/announcement.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-gallery',
  templateUrl: './home-gallery.component.html',
  styleUrls: ['./home-gallery.component.scss']
})
export class HomeGalleryComponent implements OnInit {

  constructor(private announcementService:AnnouncementService,private router: Router) { }

  ngOnInit(): void {
  }

  searchByDistrict(district: string){
    this.announcementService.listByDistrict(district).subscribe({
      next: (data) => {
        localStorage.setItem('resultSearch', JSON.stringify(data));
        this.router.navigate(['/search']);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
