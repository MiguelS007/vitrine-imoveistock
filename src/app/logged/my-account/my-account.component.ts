import { Component, OnInit } from '@angular/core';
import { UserGetResponseDto } from 'src/app/dtos/user-get-response.dtos';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  editInfos: boolean = true;

  user: UserGetResponseDto;

  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userDto'));
  }

  goToEditInfo() {
    this.editInfos = false
  }

  updateUserInfo() {
    this.editInfos = true
  }

}
