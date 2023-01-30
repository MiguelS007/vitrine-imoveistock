import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ScheduleRegisterResponseDto } from 'src/app/dtos/schedule-register-response.dto';
import { UserGetResponseDto } from 'src/app/dtos/user-get-response.dtos';
import { ScheduleService } from 'src/app/service/schedule.service';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss']
})
export class VisitsComponent implements OnInit {
  form: FormGroup;
  response: ScheduleRegisterResponseDto[];
  user: UserGetResponseDto;


  segment = false;
  tourvirtual = false;
  confirmcancel = false;
  location = false;
  propertyvideo = true;
  iconlikeheart = false;
  noregisteredvisit = false;
  listofvisits = true;
  historiclist: any[]=[];
  namemounth: string;
  week: string;
  nameweek: string;

  products: any;
  paginationProduct: number = 1;
 

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private searchService: SearchService,
    private scheduleService: ScheduleService
  ) {
    this.form = this.formBuilder.group({
      cancelvisit: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // this.searchService.getPropertyHome().subscribe(
    //   success => {
    //     this.response = success;
    //     console.log(this.response);
    //     this.listofvisits = true;
    //     this.noregisteredvisit = false;
    //   },
    //   error => {
    //     this.listofvisits = false;
    //     this.noregisteredvisit = true;
    //     console.log(error, 'data not collected')
    //   }
    // );
    this.scheduleService.getListVisists().subscribe(
      success => {
        this.response = success
        for (let i = 0; i < this.response.length; i++) {
          this.response[i];
          this.week = this.response[i].day;
          this.namemounth = new Date(this.week).toLocaleString('pt-br', { month: 'long' })
          this.nameweek = new Date(this.week).toLocaleString('pt-br', { weekday: 'long' })
          console.log(this.response[i], '1okokoko1')
          this.week = this.response[i].day;
        }
      },
      error => {
        console.log(error);
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
  likeHeart() {
    this.iconlikeheart = !this.iconlikeheart;
  }

  cancelVisits(value: string) {
    if (value === 'cancelmodal') {
      this.confirmcancel = !this.confirmcancel;
    } else if (value === 'cancel') {
      this.location = true;
    }
  }
  announcementSelected(value) {
    this.router.navigate([`announcement/detail/${value}`])
  }
  goExpress() {
    this.router.navigate(['logged/express']);
  }
}
