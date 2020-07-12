import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";


const router = {
  whoiam: `/whoiam`
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
}
