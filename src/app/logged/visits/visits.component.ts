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

  segment = false;
  spaceScheduling = false;
  spaceFavorites = true;


  constructor(
  ) {

  }

  ngOnInit(): void {
  }

  changePage(value: string) {
    if (value === 'favorites') {
      this.segment = !this.segment;
      this.spaceFavorites = true;
      this.spaceScheduling = false;
    } else if (value === 'scheduling') {
      this.segment = !this.segment;
      this.spaceFavorites = false;
      this.spaceScheduling = true;
    }
  }

}
