import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduleRegisterResponseDto } from 'src/app/dtos/schedule-register-response.dto';
import { AnnouncementService } from 'src/app/service/announcement.service';
import { ScheduleService } from 'src/app/service/schedule.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.scss']
})
export class SchedulingComponent implements OnInit {

  response: any[] = [];
  responseSchedules: ScheduleRegisterResponseDto[] = [];
  nameweek: string;
  confirmcancel = false;
  location = false;
  namemounth: string;
  products: any;
  paginationProduct: number = 1;


  form: FormGroup;

  constructor(
    private scheduleService: ScheduleService,
    private router: Router,
    private announcementService: AnnouncementService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      cancelvisit: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.schedulesList()
  }

  schedulesList() {
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

  likeHeart(value) {

    let request = {
      announcementId: value
    }

    for (let i = 0; i < this.response.length; i++) {
      if (this.response[i]._id === value) {
        this.announcementService.registerUnlike(request).subscribe(
          success => {
            setTimeout(() => {
              this.schedulesList()
            }, 1000);
          },
          error => {
            console.log(error)
          }
        )
      }
    }

  }


}
