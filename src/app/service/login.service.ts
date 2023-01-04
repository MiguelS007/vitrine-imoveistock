import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  login =
    {
      phone: '00000000000',
      code: '400289'
    }

  async loginFunction() {
    return this.login
  }

}
