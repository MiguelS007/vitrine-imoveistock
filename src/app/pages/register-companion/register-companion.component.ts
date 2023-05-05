import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScheduleRegisterResponseDto } from 'src/app/dtos/schedule-register-response.dto';

@Component({
  selector: 'app-register-companion',
  templateUrl: './register-companion.component.html',
  styleUrls: ['./register-companion.component.scss']
})
export class RegisterCompanionComponent implements OnInit {

  form: FormGroup;

  selectedScheduling: ScheduleRegisterResponseDto;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      kinship: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    })
   }

  ngOnInit(): void {
  }

}
