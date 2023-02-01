import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ScheduleRegisterResponseDto } from 'src/app/dtos/schedule-register-response.dto';
import { UserGetResponseDto } from 'src/app/dtos/user-get-response.dtos';
import { AnnouncementService } from 'src/app/service/announcement.service';
import { ScheduleService } from 'src/app/service/schedule.service';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss']
})
export class VisitsComponent implements OnInit {
  form: FormGroup;
  response: any[] = [];
  responseSchedules:ScheduleRegisterResponseDto[];
  user: UserGetResponseDto;


  segment = false;
  tourvirtual = false;
  confirmcancel = false;
  location = false;
  propertyvideo = true;
  iconlikeheart = false;
  noregisteredvisit = false;
  listofvisits = true;
  historiclist: any[] = [];
  namemounth: string;
  week: string;
  nameweek: string;

  products: any;
  paginationProduct: number = 1;

  recentlySeenList: any = [];


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private searchService: SearchService,
    private scheduleService: ScheduleService,
    private announcementService: AnnouncementService,
    private ngxSpinnerService: NgxSpinnerService
  ) {
    this.form = this.formBuilder.group({
      cancelvisit: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.list();
    this.schedulesList();
  }

  schedulesList(){
    this.scheduleService.getListVisists().subscribe(
      success => {
        this.responseSchedules = success
        console.log('listsss', this.responseSchedules);
      },
      error => {
        console.log(error);
      }
    )
  }

  list() {
    this.ngxSpinnerService.show();

    this.response = []


    this.announcementService.listLikes().subscribe(
      success => {
        console.log('list', success);
        for (let i = 0; i < success.length; i++) {
          this.response.push(success[i].announcement);
          Object.assign(this.response[i], { liked: true });
        }
        this.ngxSpinnerService.hide()
      },
      error => {
        console.log(error);
        this.ngxSpinnerService.hide()
      }
    )
  }

  segmentvideo(value: string) {
    if (value === 'video') {
      this.segment = !this.segment;
      this.propertyvideo = true;
      this.tourvirtual = false;
    } else if (value === 'tour') {
      this.segment = !this.segment;
      this.propertyvideo = false;
      this.tourvirtual = true;
    }
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
            console.log(error)
          }
        )
      }
    }

  }

  cancelVisits(value: string) {
    if (value === 'cancelmodal') {
      this.confirmcancel = !this.confirmcancel;
    } else if (value === 'cancel') {
      this.location = true;
    }
  }

  goExpress() {
    this.router.navigate(['logged/express']);
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
}
