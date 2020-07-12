import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";


const router = {
  whoiam: `/whoiam`,
  register: `/user/register`,
}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: BaseService
  ) { }

  loadCurrentUser() {
    return this.httpClient.get(router.whoiam);
  }

  register(
    body: {
      userName: string,
      password: string,
      address: string,
      phone: string,
      fullName: string
    }
  ) {
    return this.httpClient.post(router.register, body);
  }
}
