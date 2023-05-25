import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../../service/announcement.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-gallery',
  templateUrl: './home-gallery.component.html',
  styleUrls: ['./home-gallery.component.scss'],
})
export class HomeGalleryComponent implements OnInit {
  response: { district: string; count: number }[] = [];

  constructor(
    private announcementService: AnnouncementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.announcementService.countDistrict().subscribe({
      next: (data) => (this.response = data),
      error: (err) => console.log(err),
    });
  }

  searchByDistrict(district: string) {
    let requestList = {
      cityAddress: 'Curitiba',
      ufAddress: 'PR',
    };

    this.announcementService.listByDistrict(district).subscribe({
      next: (data) => {
        localStorage.setItem('resultSearch', JSON.stringify(data));
        localStorage.setItem('filtro', JSON.stringify(requestList));
        this.router.navigate(['/search']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getCountByDistrict(district: string) {
    return (
      this.response.find(
        (x) => x.district.toLowerCase() === district.toLowerCase()
      )?.count || 0
    );
  }
}
