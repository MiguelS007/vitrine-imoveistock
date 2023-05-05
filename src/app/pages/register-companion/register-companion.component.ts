import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AnnouncementVisitGetResponseDto } from 'src/app/dtos/announcement-visit-get-response.dto';
import { ScheduleService } from 'src/app/service/schedule.service';

@Component({
  selector: 'app-register-companion',
  templateUrl: './register-companion.component.html',
  styleUrls: ['./register-companion.component.scss']
})
export class RegisterCompanionComponent implements OnInit {

  form: FormGroup;

  _id: string = '';

  response: AnnouncementVisitGetResponseDto

  constructor(
    private formBuilder: FormBuilder,
    private scheduleService: ScheduleService,
    private route: ActivatedRoute,
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      kinship: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    })
   }

  ngOnInit(): void {
    this.response = this.route.snapshot.data['resolve'];
    console.log(this.response);
  }

}
