import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { AnnouncementGetResponseDto } from 'src/app/dtos/announcement-get-response.dto';
import { UserGetResponseDto } from 'src/app/dtos/user-get-response.dtos';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-search-map',
  templateUrl: './search-map.component.html',
  styleUrls: ['./search-map.component.scss']
})
export class SearchMapComponent implements OnInit {
  response: AnnouncementGetResponseDto[] = [];
  user: UserGetResponseDto;
  form: FormGroup;

  iconlikeheart: boolean;
  paginationProduct: number = 1;
  countApartment: number;
  countCondominium: number;
  countHouse: number;
  countLoft: number;
  countKitnet: number;
  


  constructor(
    private searchService: SearchService,
    private formBuilder: FormBuilder,
  ) { 
    this.form = this.formBuilder.group({
      orderby: ['', [Validators.required]],

    });
  }

  ngOnInit(): void {

    this.searchService.getPropertyList().subscribe(
      success => {
        this.response = success;
        // console.log( this.response[3].advertiser?.photo?.location ,'numero');
      },
      error => { console.log(error, 'data not collected') }
    );
  }

  goDetailProperty(){

  }
  likeHeart(){

  }
}
