import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AnnouncementGetResponseDto } from 'src/app/dtos/announcement-get-response.dto';
import { ScheduleRegisterRequestDto } from 'src/app/dtos/schedule-register-request.dto';
import { UserGetResponseDto } from 'src/app/dtos/user-get-response.dtos';
import { DatamokService } from 'src/app/service/datamok.service';
import { ProfileService } from 'src/app/service/profile.service';
import { ScheduleService } from 'src/app/service/schedule.service';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {

  form: FormGroup;
  formproperty: FormGroup;

  changeSubscription: Subscription;

  response: AnnouncementGetResponseDto;
  user: UserGetResponseDto;

  request: ScheduleRegisterRequestDto;

  detailprofile = false;
  arrow1: boolean = false;
  arrow2: boolean = false;
  arrow3: boolean = false;

  arrayDeDatas: any = [];

  dataSelecionada: any;
  horasSelecionada: string;

  iconlikeheart = false;
  iconshare = false;
  iconprint = false;
  segment = false;
  modallogin = false;
  modalscheduling = false;
  step1scheduling = true;
  step2scheduling = false;
  step3scheduling = false;
  onlyimg: any = [];
  previewimg: any = [];
  products: any = [];
  propertyproducts: any = [];
  paginationProduct: number = 1;
  tourvirtual = false;
  propertyvideo = true;
  finalValue: number;
  constructor(
    private router: Router,
    private datamokservice: DatamokService,
    private formBuilder: FormBuilder,
    private scheduleService: ScheduleService,
    private route: ActivatedRoute

  ) {
    this.form = this.formBuilder.group({
      day: ['', [Validators.required]],
      time: ['', [Validators.required]],
    });
    this.formproperty = this.formBuilder.group({
      searchwords: ['', [Validators.required]],
      localproperty: ['', [Validators.required]],
      typeproperty: ['', [Validators.required]],
      typeprice: ['', [Validators.required]],
      typebathroom: ['', [Validators.required]],
      typerooms: ['', [Validators.required]],
      typevacancies: ['', [Validators.required]],
      component: ['', [Validators.required]],
      typeconstruction: ['', [Validators.required]],
      typefootagemax: ['', [Validators.required]],
      typefootagemin: ['', [Validators.required]],
    });
    this.changeSubscription = this.datamokservice.getopModalLogin().subscribe(() => {
      this.modallogin = false;
    });
  }

  ngAfterViewInit(): void {
    for (let i = 1; i < 6; i++) {
      let hoje = new Date();
      hoje.setDate(hoje.getDate() + i);
      this.arrayDeDatas.push(hoje)
    }
  }

  ngOnInit(): void {
    this.onlyimg = this.datamokservice.onlypreview;
    this.previewimg = this.datamokservice.imagespreview;
    this.propertyproducts = this.datamokservice.exclusiveProperties;
    this.products = this.datamokservice.resultSearch;
    this.user = JSON.parse(localStorage.getItem('userDto'));

    this.response = this.route.snapshot.data['resolve'];
    console.log(this.response._id);
  }











  btninteractionimg(value: string) {
    if (value === 'like') {
      this.iconlikeheart = !this.iconlikeheart;
    } else if (value === 'share') {
      this.iconshare = !this.iconshare;
    } else if (value === 'print') {
      this.iconprint = !this.iconprint;
      window.print();
    }
  }

  likeHeart() {
    this.iconlikeheart = !this.iconlikeheart;
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


  selectDate(value) {
    this.dataSelecionada = value
  }

  selectTime(value) {
    console.log(value)
    this.horasSelecionada = value
  }

  goExpress() {
    this.router.navigate(['logged/express']);
  }
  hideDetailProperty() {
    this.detailprofile = !this.detailprofile;
  }
  openarrow(value: number) {
    if (value === 1 && this.arrow1 === false) {
      this.arrow1 = true;
    } else {
      this.arrow1 = false;
    }
    if (value === 2 && this.arrow2 === false) {
      this.arrow2 = true;
    } else {
      this.arrow2 = false;
    }

    if (value === 3 && this.arrow3 === false) {
      this.arrow3 = true;
    } else {
      this.arrow3 = false;
    }
  }

  nextScheduling(value: string) {
    if (value === 'step1') {
     
      if(this.user === null){
        this.datamokservice.opModalLogin();
      }else{
        this.step1scheduling = false;
        this.step2scheduling = true;
      }
    } else if (value === 'close') {
      this.modalscheduling = false;
      this.step1scheduling = false;
      this.step2scheduling = false;
      this.step3scheduling = false;
    } else if (value === 'viewvisits') {
      this.modalscheduling = false;
      this.step1scheduling = false;
      this.step2scheduling = false;
      this.step3scheduling = false;
      setTimeout(() => {
        this.router.navigate(['logged/visits']);
      }, 100);
    }
    // undefined
    else if (value === 'modal-logged') {
      this.modallogin = true;
    } else if (value === 'modal-scheduling') {
      this.modalscheduling = true;
      this.step1scheduling = true;
    }
  }








  confirmSchedule(value: string) {
    if (value === 'step2') {
      this.step2scheduling = false;
      this.step3scheduling = true;
    }
    let dayweek = this.form.controls['day'].value.toLocaleString("en-us", { weekday: "long" });
    this.request = {
      status: 'scheduled',
      day: this.form.controls['day'].value,
      time: this.horasSelecionada,
      days: dayweek,
      cancelUser: 'scheduled',
    };
    console.log(this.request);


    // this.scheduleService.registerSchedule(this.response._id, this.request).subscribe(
    //   success => {
    //     console.log(success)
    //   },
    //   error => {
    //     console.error(error)
    //   }
    // )


  }

}